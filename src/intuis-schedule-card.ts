import { LitElement, html, css, PropertyValues, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  IntuisScheduleCardConfig,
  HomeAssistant,
  ScheduleSummaryAttributes,
  Zone,
  DAYS_OF_WEEK,
  DayOfWeek,
  DAY_INDEX,
  ZoneSelectorState,
} from './types/types';
import { generateTimeSlots, isCurrentTimeSlot, getShortDayName } from './utils/time';
import { getZoneColor, getContrastTextColor, createZoneColorStyles } from './utils/colors';

// Default configuration values
const DEFAULT_CONFIG: Partial<IntuisScheduleCardConfig> = {
  time_step: 60,
  start_hour: 0,
  end_hour: 23,
  show_temperatures: true,
  compact: false,
};

@customElement('intuis-schedule-card')
export class IntuisScheduleCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: IntuisScheduleCardConfig;
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _zoneSelector: ZoneSelectorState = {
    open: false,
    day: null,
    dayIndex: 0,
    time: '',
  };

  /**
   * Set card configuration
   */
  public setConfig(config: IntuisScheduleCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Get card size for layout purposes
   */
  public getCardSize(): number {
    const config = this._config;
    if (!config) return 6;

    const timeSlots = generateTimeSlots(
      config.start_hour ?? 0,
      config.end_hour ?? 23,
      config.time_step ?? 60
    );
    // Base size + rows
    return Math.ceil(timeSlots.length / 2) + 2;
  }

  /**
   * Performance optimization: only update when entity changes
   */
  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return true;

    if (changedProps.has('hass') && this.hass) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (!oldHass) return true;

      const entityId = this._config.entity;
      return oldHass.states[entityId] !== this.hass.states[entityId];
    }

    return true;
  }

  /**
   * Get schedule attributes from entity
   */
  private _getScheduleAttributes(): ScheduleSummaryAttributes | null {
    if (!this.hass || !this._config) return null;

    const entityState = this.hass.states[this._config.entity];
    if (!entityState) {
      this._error = `Entity ${this._config.entity} not found`;
      return null;
    }

    return entityState.attributes as unknown as ScheduleSummaryAttributes;
  }

  /**
   * Get zone for a specific day and time
   */
  private _getZoneForSlot(
    attrs: ScheduleSummaryAttributes,
    day: DayOfWeek,
    time: string
  ): Zone | null {
    const dayTimetable = attrs.weekly_timetable[day];
    if (!dayTimetable || dayTimetable.length === 0) return null;

    // Find the zone active at this time
    // The timetable entries mark zone starts, so we need to find
    // the most recent entry before or at this time
    let activeZoneName: string | null = null;

    const timeMinutes = this._parseTime(time);

    for (const entry of dayTimetable) {
      const entryMinutes = this._parseTime(entry.time);
      if (entryMinutes <= timeMinutes) {
        activeZoneName = entry.zone;
      } else {
        break;
      }
    }

    // If no zone found for this time (before first entry of the day),
    // we need to look at the previous day's last entry
    if (!activeZoneName) {
      const dayIndex = DAY_INDEX[day];
      const prevDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      const prevDay = DAYS_OF_WEEK[prevDayIndex];
      const prevDayTimetable = attrs.weekly_timetable[prevDay];

      if (prevDayTimetable && prevDayTimetable.length > 0) {
        activeZoneName = prevDayTimetable[prevDayTimetable.length - 1].zone;
      }
    }

    if (!activeZoneName) return null;

    // Find the zone object by name
    return attrs.zones.find((z) => z.name === activeZoneName) || null;
  }

  /**
   * Parse time string to minutes
   */
  private _parseTime(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Handle cell click - open zone selector
   */
  private _handleCellClick(day: DayOfWeek, time: string): void {
    this._zoneSelector = {
      open: true,
      day,
      dayIndex: DAY_INDEX[day],
      time,
    };
  }

  /**
   * Handle zone selection
   */
  private async _handleZoneSelect(zone: Zone): Promise<void> {
    if (!this.hass || !this._zoneSelector.day) return;

    this._loading = true;
    this._error = undefined;

    try {
      await this.hass.callService('intuis_connect', 'set_schedule_slot', {
        day: this._zoneSelector.dayIndex,
        start_time: this._zoneSelector.time,
        zone_id: zone.id,
      });

      // Close selector
      this._zoneSelector = { open: false, day: null, dayIndex: 0, time: '' };
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to update schedule';
    } finally {
      this._loading = false;
    }
  }

  /**
   * Close zone selector
   */
  private _closeZoneSelector(): void {
    this._zoneSelector = { open: false, day: null, dayIndex: 0, time: '' };
  }

  /**
   * Render the card
   */
  protected render(): TemplateResult {
    if (!this._config) {
      return html`<ha-card><div class="error">Card not configured</div></ha-card>`;
    }

    const attrs = this._getScheduleAttributes();
    if (!attrs) {
      return html`
        <ha-card>
          <div class="error">${this._error || 'Schedule data not available'}</div>
        </ha-card>
      `;
    }

    const timeSlots = generateTimeSlots(
      this._config.start_hour ?? 0,
      this._config.end_hour ?? 23,
      this._config.time_step ?? 60
    );

    const compact = this._config.compact ?? false;

    return html`
      <ha-card>
        <style>
          :host {
            ${createZoneColorStyles(attrs.zones, this._config.zone_colors)}
          }
        </style>

        ${this._renderHeader(attrs)}
        ${this._renderGrid(attrs, timeSlots, compact)}
        ${this._renderLegend(attrs)}
        ${this._zoneSelector.open ? this._renderZoneSelector(attrs) : nothing}
        ${this._loading ? this._renderLoading() : nothing}
        ${this._error ? this._renderError() : nothing}
      </ha-card>
    `;
  }

  /**
   * Render card header
   */
  private _renderHeader(_attrs: ScheduleSummaryAttributes): TemplateResult {
    const title = this._config?.title || 'Heating Schedule';
    const scheduleName = this.hass?.states[this._config!.entity]?.state || 'Unknown';

    return html`
      <div class="card-header">
        <div class="title">${title}</div>
        <div class="schedule-name">${scheduleName}</div>
      </div>
    `;
  }

  /**
   * Render the schedule grid
   */
  private _renderGrid(
    attrs: ScheduleSummaryAttributes,
    timeSlots: string[],
    compact: boolean
  ): TemplateResult {
    const step = this._config?.time_step ?? 60;

    return html`
      <div class="grid-container ${compact ? 'compact' : ''}">
        <div class="grid">
          <!-- Header row -->
          <div class="grid-header">
            <div class="time-label"></div>
            ${DAYS_OF_WEEK.map(
              (day) => html`
                <div class="day-header">${compact ? getShortDayName(day) : day}</div>
              `
            )}
          </div>

          <!-- Time rows -->
          ${timeSlots.map(
            (time) => html`
              <div class="grid-row">
                <div class="time-label">${time}</div>
                ${DAYS_OF_WEEK.map((day) => {
                  const zone = this._getZoneForSlot(attrs, day, time);
                  const isCurrent = isCurrentTimeSlot(day, time, step);
                  const bgColor = zone
                    ? getZoneColor(zone, this._config?.zone_colors, attrs.zones.indexOf(zone))
                    : '#e5e7eb';
                  const textColor = getContrastTextColor(bgColor);

                  return html`
                    <div
                      class="grid-cell ${isCurrent ? 'current' : ''}"
                      style="background-color: ${bgColor}; color: ${textColor}"
                      @click=${() => this._handleCellClick(day, time)}
                      title="${zone?.name || 'Not set'} - Click to change"
                    >
                    </div>
                  `;
                })}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  /**
   * Render zone legend
   */
  private _renderLegend(attrs: ScheduleSummaryAttributes): TemplateResult {
    return html`
      <div class="legend">
        ${attrs.zones.map((zone, index) => {
          const color = getZoneColor(zone, this._config?.zone_colors, index);
          const textColor = getContrastTextColor(color);

          return html`
            <div
              class="legend-item"
              style="background-color: ${color}; color: ${textColor}"
            >
              ${zone.name}
              ${this._config?.show_temperatures
                ? html`<span class="legend-temp">
                    ${this._getAverageTemp(zone)}°
                  </span>`
                : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  /**
   * Get average temperature for a zone
   */
  private _getAverageTemp(zone: Zone): number {
    const temps = Object.values(zone.room_temperatures);
    if (temps.length === 0) return 0;
    return Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
  }

  /**
   * Render zone selector dialog
   */
  private _renderZoneSelector(attrs: ScheduleSummaryAttributes): TemplateResult {
    return html`
      <div class="zone-selector-overlay" @click=${this._closeZoneSelector}>
        <div class="zone-selector" @click=${(e: Event) => e.stopPropagation()}>
          <div class="zone-selector-header">
            <span>Select Zone</span>
            <span class="zone-selector-time">
              ${this._zoneSelector.day} ${this._zoneSelector.time}
            </span>
          </div>
          <div class="zone-selector-options">
            ${attrs.zones.map((zone, index) => {
              const color = getZoneColor(zone, this._config?.zone_colors, index);
              const textColor = getContrastTextColor(color);

              return html`
                <button
                  class="zone-option"
                  style="background-color: ${color}; color: ${textColor}"
                  @click=${() => this._handleZoneSelect(zone)}
                >
                  <span class="zone-option-name">${zone.name}</span>
                  <span class="zone-option-temps">
                    ${Object.values(zone.room_temperatures)
                      .map((t) => `${t}°`)
                      .join(' / ')}
                  </span>
                </button>
              `;
            })}
          </div>
          <button class="zone-selector-cancel" @click=${this._closeZoneSelector}>
            Cancel
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render loading overlay
   */
  private _renderLoading(): TemplateResult {
    return html`
      <div class="loading-overlay">
        <ha-circular-progress indeterminate></ha-circular-progress>
      </div>
    `;
  }

  /**
   * Render error message
   */
  private _renderError(): TemplateResult {
    return html`
      <div class="error-toast" @click=${() => (this._error = undefined)}>
        ${this._error}
      </div>
    `;
  }

  /**
   * Card styles
   */
  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      position: relative;
      padding: 16px;
      overflow: hidden;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .title {
      font-size: 1.2em;
      font-weight: 500;
    }

    .schedule-name {
      font-size: 0.9em;
      color: var(--secondary-text-color);
      background: var(--primary-background-color);
      padding: 4px 8px;
      border-radius: 4px;
    }

    .grid-container {
      overflow-x: auto;
    }

    .grid {
      display: grid;
      grid-template-columns: 50px repeat(7, 1fr);
      gap: 2px;
      min-width: 400px;
    }

    .compact .grid {
      grid-template-columns: 40px repeat(7, 1fr);
      min-width: 300px;
    }

    .grid-header {
      display: contents;
    }

    .day-header {
      text-align: center;
      font-weight: 500;
      font-size: 0.85em;
      padding: 8px 4px;
      background: var(--primary-background-color);
    }

    .grid-row {
      display: contents;
    }

    .time-label {
      font-size: 0.75em;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 8px;
    }

    .grid-cell {
      min-height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7em;
      cursor: pointer;
      transition: transform 0.1s, box-shadow 0.1s;
      border-radius: 2px;
    }

    .grid-cell:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }

    .grid-cell.current {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }

    .compact .grid-cell {
      min-height: 20px;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
      justify-content: center;
    }

    .legend-item {
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.85em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .legend-temp {
      opacity: 0.8;
      font-size: 0.9em;
    }

    /* Zone Selector Dialog */
    .zone-selector-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }

    .zone-selector {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 16px;
      min-width: 280px;
      max-width: 90vw;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }

    .zone-selector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      font-weight: 500;
    }

    .zone-selector-time {
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }

    .zone-selector-options {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .zone-option {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
      transition: transform 0.1s;
    }

    .zone-option:hover {
      transform: scale(1.02);
    }

    .zone-option-name {
      font-weight: 500;
    }

    .zone-option-temps {
      font-size: 0.85em;
      opacity: 0.8;
    }

    .zone-selector-cancel {
      width: 100%;
      margin-top: 16px;
      padding: 12px;
      background: var(--primary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      cursor: pointer;
      font-size: 1em;
      color: var(--primary-text-color);
    }

    .zone-selector-cancel:hover {
      background: var(--secondary-background-color);
    }

    /* Loading and Error states */
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(var(--rgb-card-background-color), 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .error {
      padding: 16px;
      text-align: center;
      color: var(--error-color);
    }

    .error-toast {
      position: absolute;
      bottom: 16px;
      left: 16px;
      right: 16px;
      padding: 12px;
      background: var(--error-color);
      color: white;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      z-index: 1001;
    }
  `;
}

// Declare card for HA
declare global {
  interface HTMLElementTagNameMap {
    'intuis-schedule-card': IntuisScheduleCard;
  }
}
