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
} from './types/types';
import { getZoneColor, getContrastTextColor } from './utils/colors';

// Default configuration values
const DEFAULT_CONFIG: Partial<IntuisScheduleCardConfig> = {
  start_hour: 0,
  end_hour: 24,
  show_temperatures: true,
  row_height: 32,
  show_today_only: false,
  temp_mode: 'average',
  current_time_color: '#03a9f4',
  readonly: false,
  show_detailed_tooltips: true,
  show_day_labels: true,
  show_refresh_button: true,
  show_legend: true,
};

// Block represents a continuous time range with the same zone
interface ScheduleBlock {
  zone: Zone;
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  startMinutes: number;
  endMinutes: number;
}

// Editor state for time range editing
interface BlockEditorState {
  open: boolean;
  block: ScheduleBlock | null;
  startDay: DayOfWeek | null;
  startDayIndex: number;
  endDay: DayOfWeek | null;
  endDayIndex: number;
  startTime: string;
  endTime: string;
  selectedZoneId: number | null;
}

@customElement('intuis-schedule-card')
export class IntuisScheduleCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: IntuisScheduleCardConfig;
  @state() private _loading = false;
  @state() private _error?: string;
  @state() private _currentTime = new Date();
  @state() private _editor: BlockEditorState = {
    open: false,
    block: null,
    startDay: null,
    startDayIndex: 0,
    endDay: null,
    endDayIndex: 0,
    startTime: '',
    endTime: '',
    selectedZoneId: null,
  };
  private _timeUpdateInterval?: number;

  public setConfig(config: IntuisScheduleCardConfig): void {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  public getCardSize(): number {
    return 8;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Update current time every minute
    this._updateCurrentTime();
    this._timeUpdateInterval = window.setInterval(() => {
      this._updateCurrentTime();
    }, 60000); // Update every minute
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._timeUpdateInterval) {
      clearInterval(this._timeUpdateInterval);
      this._timeUpdateInterval = undefined;
    }
  }

  private _updateCurrentTime(): void {
    this._currentTime = new Date();
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return true;
    if (changedProps.has('hass') && this.hass) {
      const oldHass = changedProps.get('hass') as HomeAssistant | undefined;
      if (!oldHass) return true;
      const entityId = this._config.entity;
      const scheduleSelectEntity = this._config.schedule_select_entity;
      
      // Update if main entity changed
      if (oldHass.states[entityId] !== this.hass.states[entityId]) {
        return true;
      }
      
      // Update if schedule select entity changed
      if (scheduleSelectEntity && oldHass.states[scheduleSelectEntity] !== this.hass.states[scheduleSelectEntity]) {
        return true;
      }
    }
    return true;
  }

  /**
   * Get translated day name based on browser language
   */
  private _getDayName(day: DayOfWeek, short: boolean = true): string {
    const language = this.hass?.language || navigator.language || 'en';
    const lang = language.split('-')[0].toLowerCase(); // Get base language (e.g., 'fr' from 'fr-FR')
    
    const dayTranslations: Record<string, Record<DayOfWeek, { short: string; long: string }>> = {
      fr: {
        Monday: { short: 'Lun', long: 'Lundi' },
        Tuesday: { short: 'Mar', long: 'Mardi' },
        Wednesday: { short: 'Mer', long: 'Mercredi' },
        Thursday: { short: 'Jeu', long: 'Jeudi' },
        Friday: { short: 'Ven', long: 'Vendredi' },
        Saturday: { short: 'Sam', long: 'Samedi' },
        Sunday: { short: 'Dim', long: 'Dimanche' },
      },
      en: {
        Monday: { short: 'Mon', long: 'Monday' },
        Tuesday: { short: 'Tue', long: 'Tuesday' },
        Wednesday: { short: 'Wed', long: 'Wednesday' },
        Thursday: { short: 'Thu', long: 'Thursday' },
        Friday: { short: 'Fri', long: 'Friday' },
        Saturday: { short: 'Sat', long: 'Saturday' },
        Sunday: { short: 'Sun', long: 'Sunday' },
      },
    };

    const translations = dayTranslations[lang] || dayTranslations.en;
    return short ? translations[day].short : translations[day].long;
  }

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
   * Get the active zone at a specific time for a given day
   */
  private _getActiveZoneAtTime(attrs: ScheduleSummaryAttributes, day: DayOfWeek, timeMinutes: number): Zone | null {
    const blocks = this._getDayBlocks(attrs, day);
    for (const block of blocks) {
      // Handle blocks that span midnight
      if (block.startMinutes > block.endMinutes) {
        // Block spans midnight (e.g., 22:00 to 06:00)
        if (timeMinutes >= block.startMinutes || timeMinutes < block.endMinutes) {
          return block.zone;
        }
      } else {
        // Normal block
        if (timeMinutes >= block.startMinutes && timeMinutes < block.endMinutes) {
          return block.zone;
        }
      }
    }
    return null;
  }

  /**
   * Convert timetable entries for a day into blocks
   */
  private _getDayBlocks(attrs: ScheduleSummaryAttributes, day: DayOfWeek): ScheduleBlock[] {
    const blocks: ScheduleBlock[] = [];
    const dayTimetable = attrs.weekly_timetable[day] || [];
    const dayIndex = DAY_INDEX[day];

    // Get the zone that's active at the start of the day (from previous day's last entry)
    const prevDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
    const prevDay = DAYS_OF_WEEK[prevDayIndex];
    const prevDayTimetable = attrs.weekly_timetable[prevDay] || [];

    let currentZoneName: string | null = null;
    if (prevDayTimetable.length > 0) {
      currentZoneName = prevDayTimetable[prevDayTimetable.length - 1].zone;
    } else if (dayTimetable.length > 0) {
      currentZoneName = dayTimetable[0].zone;
    }

    // Build list of transitions for this day
    const transitions: { time: string; zoneName: string; minutes: number }[] = [];

    // Add start of day if no entry at 00:00
    if (dayTimetable.length === 0 || dayTimetable[0].time !== '00:00') {
      if (currentZoneName) {
        transitions.push({ time: '00:00', zoneName: currentZoneName, minutes: 0 });
      }
    }

    // Add all timetable entries for this day
    for (const entry of dayTimetable) {
      const [h, m] = entry.time.split(':').map(Number);
      transitions.push({ time: entry.time, zoneName: entry.zone, minutes: h * 60 + m });
    }

    // Sort by time
    transitions.sort((a, b) => a.minutes - b.minutes);

    // Convert transitions to blocks
    for (let i = 0; i < transitions.length; i++) {
      const start = transitions[i];
      const end = transitions[i + 1] || { time: '24:00', minutes: 24 * 60 };

      const zone = attrs.zones.find(z => z.name === start.zoneName);
      if (zone) {
        blocks.push({
          zone,
          startTime: start.time,
          endTime: end.time === '24:00' ? '00:00' : end.time,
          startMinutes: start.minutes,
          endMinutes: end.minutes,
        });
      }
    }

    return blocks;
  }

  /**
   * Handle block click - open editor
   * Detects multi-day spans by scanning both backward and forward
   */
  private _handleBlockClick(day: DayOfWeek, block: ScheduleBlock): void {
    const dayIndex = DAY_INDEX[day];
    const attrs = this._getScheduleAttributes();

    let startDay = day;
    let startDayIndex = dayIndex;
    let startTime = block.startTime;
    let endDay = day;
    let endDayIndex = dayIndex;
    let endTime = block.endTime;
    const zoneId = block.zone.id;

    if (attrs) {
      // Scan BACKWARD: If block starts at 00:00, check if previous day ends at midnight with same zone
      if (block.startTime === '00:00') {
        let currentDayIdx = dayIndex;

        for (let i = 0; i < 7; i++) {
          const prevDayIdx = (currentDayIdx - 1 + 7) % 7;
          const prevDay = DAYS_OF_WEEK[prevDayIdx];
          const prevDayBlocks = this._getDayBlocks(attrs, prevDay);

          // Check if previous day ends at midnight with the same zone
          if (prevDayBlocks.length > 0) {
            const lastBlock = prevDayBlocks[prevDayBlocks.length - 1];
            if (lastBlock.endTime === '00:00' && lastBlock.zone.id === zoneId) {
              // Zone continues from previous day
              startDay = prevDay;
              startDayIndex = prevDayIdx;
              startTime = lastBlock.startTime;

              // If this block also starts at 00:00, keep scanning backward
              if (lastBlock.startTime === '00:00') {
                currentDayIdx = prevDayIdx;
                continue;
              }
            }
          }
          // Zone doesn't continue backward, stop scanning
          break;
        }
      }

      // Scan FORWARD: If block ends at midnight (00:00), check if it continues into next day(s)
      if (block.endTime === '00:00') {
        let currentDayIdx = dayIndex;

        for (let i = 0; i < 7; i++) {
          const nextDayIdx = (currentDayIdx + 1) % 7;
          const nextDay = DAYS_OF_WEEK[nextDayIdx];
          const nextDayBlocks = this._getDayBlocks(attrs, nextDay);

          // Check if next day starts at 00:00 with the same zone
          if (nextDayBlocks.length > 0) {
            const firstBlock = nextDayBlocks[0];
            if (firstBlock.startTime === '00:00' && firstBlock.zone.id === zoneId) {
              // Zone continues into this day
              endDay = nextDay;
              endDayIndex = nextDayIdx;
              endTime = firstBlock.endTime;

              // If this block also ends at midnight, keep scanning
              if (firstBlock.endTime === '00:00') {
                currentDayIdx = nextDayIdx;
                continue;
              }
            }
          }
          // Zone doesn't continue forward, stop scanning
          break;
        }
      }
    }

    this._editor = {
      open: true,
      block,
      startDay: startDay,
      startDayIndex: startDayIndex,
      endDay: endDay,
      endDayIndex: endDayIndex,
      startTime: startTime,
      endTime: endTime === '00:00' ? '24:00' : endTime,
      selectedZoneId: zoneId,
    };
  }

  /**
   * Handle zone selection in editor
   */
  private _handleZoneSelect(zoneId: number): void {
    this._editor = { ...this._editor, selectedZoneId: zoneId };
  }

  /**
   * Handle time change in editor
   */
  private _handleTimeChange(field: 'startTime' | 'endTime', value: string): void {
    this._editor = { ...this._editor, [field]: value };
  }

  /**
   * Handle day change in editor
   */
  private _handleDayChange(field: 'start' | 'end', dayIndex: number): void {
    const day = DAYS_OF_WEEK[dayIndex];
    if (field === 'start') {
      this._editor = { ...this._editor, startDay: day, startDayIndex: dayIndex };
    } else {
      this._editor = { ...this._editor, endDay: day, endDayIndex: dayIndex };
    }
  }

  /**
   * Apply the block edit - supports multi-day spans
   */
  private async _applyEdit(): Promise<void> {
    if (!this.hass || !this._editor.startDay || this._editor.selectedZoneId === null) return;

    this._loading = true;
    this._error = undefined;

    try {
      const startDayIdx = this._editor.startDayIndex;
      const endDayIdx = this._editor.endDayIndex;
      const zoneId = this._editor.selectedZoneId;

      // Get zone name for the service call
      const attrs = this._getScheduleAttributes();
      const selectedZone = attrs?.zones.find(z => z.id === zoneId);
      const zoneName = selectedZone?.name || '';

      const startTime = this._editor.startTime;
      let endTime = this._editor.endTime;
      // Normalize end time: "24:00" display → "00:00" for service
      if (endTime === '24:00') {
        endTime = '00:00';
      }

      // Single service call with start/end day support
      await this.hass.callService('intuis_connect', 'set_schedule_slot', {
        start_day: String(startDayIdx),
        end_day: String(endDayIdx),
        start_time: startTime,
        end_time: endTime,
        zone_name: zoneName,
      });

      this._closeEditor();
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to update schedule';
    } finally {
      this._loading = false;
    }
  }

  /**
   * Close editor
   */
  private _closeEditor(): void {
    this._editor = {
      open: false,
      block: null,
      startDay: null,
      startDayIndex: 0,
      endDay: null,
      endDayIndex: 0,
      startTime: '',
      endTime: '',
      selectedZoneId: null,
    };
  }

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

    const showLegend = this._config?.show_legend !== false; // Default to true

    return html`
      <ha-card>
        ${this._renderHeader()}
        ${this._renderSchedule(attrs)}
        ${showLegend ? this._renderLegend(attrs) : nothing}
        ${this._editor.open ? this._renderEditor(attrs) : nothing}
        ${this._loading ? this._renderLoading() : nothing}
        ${this._error && !this._editor.open ? this._renderError() : nothing}
      </ha-card>
    `;
  }

  /**
   * Handle refresh button click - refresh schedules from API
   */
  private async _handleRefresh(): Promise<void> {
    if (!this.hass || this._loading) return;

    this._loading = true;
    try {
      await this.hass.callService('intuis_connect', 'refresh_schedules', {});
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to refresh';
    } finally {
      this._loading = false;
    }
  }

  private _renderHeader(): TemplateResult | typeof nothing {
    const title = this._config?.title;
    const scheduleSelectEntity = this._config?.schedule_select_entity;
    
    // Handle schedule display:
    // - If schedule_select_entity is empty string (""), show nothing
    // - If schedule_select_entity is undefined/null, show schedule name (read-only)
    // - If schedule_select_entity is provided, show select dropdown
    let scheduleDisplay: TemplateResult | typeof nothing = nothing;
    if (scheduleSelectEntity === '') {
      // Empty string means hide schedule display
      scheduleDisplay = nothing;
    } else if (scheduleSelectEntity && this.hass) {
      // Entity provided, show select dropdown
      const selectEntity = this.hass.states[scheduleSelectEntity];
      if (selectEntity) {
        const currentValue = selectEntity.state;
        const options = (selectEntity.attributes.options as string[]) || [];
        scheduleDisplay = html`
          <select 
            class="schedule-select"
            .value=${currentValue}
            @change=${(e: Event) => this._handleScheduleChange((e.target as HTMLSelectElement).value)}
          >
            ${options.map(option => html`
              <option value=${option} ?selected=${option === currentValue}>${option}</option>
            `)}
          </select>
        `;
      } else {
        scheduleDisplay = html`<div class="schedule-name">Entity not found</div>`;
      }
    } else {
      // No entity specified, show schedule name (read-only)
      const scheduleName = this.hass?.states[this._config!.entity]?.state || 'Unknown';
      scheduleDisplay = html`<div class="schedule-name">${scheduleName}</div>`;
    }

    const showRefreshButton = this._config?.show_refresh_button !== false; // Default to true
    
    // Check if header has any content
    const hasTitle = !!title;
    const hasScheduleDisplay = scheduleDisplay !== nothing;
    const hasContent = hasTitle || hasScheduleDisplay || showRefreshButton;
    
    // If no content, don't render the header at all
    if (!hasContent) {
      return nothing;
    }

    return html`
      <div class="card-header ${!hasTitle && !hasScheduleDisplay ? 'compact' : ''}">
        <div class="header-left">
          ${title ? html`<div class="title">${title}</div>` : nothing}
          ${scheduleDisplay}
        </div>
        ${showRefreshButton ? html`
          <button class="refresh-btn" @click=${this._handleRefresh} title="Refresh schedules">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
            </svg>
          </button>
        ` : nothing}
      </div>
    `;
  }

  /**
   * Handle schedule selection change
   */
  private async _handleScheduleChange(option: string): Promise<void> {
    const scheduleSelectEntity = this._config?.schedule_select_entity;
    if (!this.hass || !scheduleSelectEntity) return;

    this._loading = true;
    this._error = undefined;

    try {
      await this.hass.callService('select', 'select_option', {
        option: option,
        entity_id: scheduleSelectEntity,
      });
    } catch (err) {
      this._error = err instanceof Error ? err.message : 'Failed to change schedule';
    } finally {
      this._loading = false;
    }
  }

  private _renderSchedule(attrs: ScheduleSummaryAttributes): TemplateResult {
    const startHour = this._config?.start_hour ?? 0;
    const endHour = this._config?.end_hour ?? 24;
    const totalMinutes = (endHour - startHour) * 60;
    const showTodayOnly = this._config?.show_today_only ?? false;

    // Get days to display
    let daysToDisplay: readonly DayOfWeek[] = DAYS_OF_WEEK;
    if (showTodayOnly) {
      const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      // Convert to our day index (Monday = 0)
      const dayIndex = today === 0 ? 6 : today - 1;
      daysToDisplay = [DAYS_OF_WEEK[dayIndex]] as readonly DayOfWeek[];
    }

    return html`
      <div class="schedule-container">
        <!-- Time axis -->
        <div class="time-axis">
          <div class="day-label"></div>
          <div class="time-labels">
            ${this._renderTimeLabels(startHour, endHour)}
          </div>
        </div>

        <!-- Days -->
        ${daysToDisplay.map(day => this._renderDayRow(attrs, day, startHour, totalMinutes))}
      </div>
    `;
  }

  private _renderTimeLabels(startHour: number, endHour: number): TemplateResult {
    const labels: TemplateResult[] = [];
    for (let h = startHour; h <= endHour; h += 2) {
      const left = ((h - startHour) / (endHour - startHour)) * 100;
      labels.push(html`
        <span class="time-label" style="left: ${left}%">${h.toString().padStart(2, '0')}:00</span>
      `);
    }
    return html`${labels}`;
  }

  private _renderDayRow(
    attrs: ScheduleSummaryAttributes,
    day: DayOfWeek,
    startHour: number,
    totalMinutes: number
  ): TemplateResult {
    const blocks = this._getDayBlocks(attrs, day);
    const startMinutes = startHour * 60;
    const showDayLabels = this._config?.show_day_labels !== false; // Default to true
    const dayName = showDayLabels ? this._getDayName(day, true) : '';
    const rowHeight = this._config?.row_height ?? 32;

    // Calculate current time indicator position
    const now = this._currentTime;
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentDayIndex = currentDay === 0 ? 6 : currentDay - 1; // Convert to our index (Monday = 0)
    const dayIndex = DAY_INDEX[day];
    const isCurrentDay = dayIndex === currentDayIndex;
    
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeMinutes = currentHour * 60 + currentMinute;
    
    // Calculate position of current time indicator
    const shouldShowIndicator = isCurrentDay && currentTimeMinutes >= startMinutes && currentTimeMinutes < startMinutes + totalMinutes;
    const activeZone = shouldShowIndicator ? this._getActiveZoneAtTime(attrs, day, currentTimeMinutes) : null;
    const position = shouldShowIndicator ? ((currentTimeMinutes - startMinutes) / totalMinutes) * 100 : 0;
    const zoneName = activeZone?.name || 'Unknown';
    const zoneTemp = activeZone ? this._getZoneTempDisplay(activeZone) : '';

    return html`
      <div class="day-row">
        ${showDayLabels ? html`<div class="day-label">${dayName}</div>` : html`<div class="day-label" style="width: 0; padding: 0;"></div>`}
        <div class="blocks-container" style="height: ${rowHeight}px;">
          ${blocks.map(block => {
            // Calculate position and width based on visible time range
            const blockStart = Math.max(block.startMinutes, startMinutes);
            const blockEnd = Math.min(block.endMinutes, startMinutes + totalMinutes);

            if (blockEnd <= blockStart) return nothing;

            const left = ((blockStart - startMinutes) / totalMinutes) * 100;
            const width = ((blockEnd - blockStart) / totalMinutes) * 100;

            const color = getZoneColor(block.zone, this._config?.zone_colors, attrs.zones.indexOf(block.zone));
            const textColor = getContrastTextColor(color);
            const showLabel = width > 8; // Only show label if block is wide enough

            const isReadonly = this._config?.readonly !== false; // Default to true
            const showDetailedTooltips = this._config?.show_detailed_tooltips !== false; // Default to true
            const endTimeDisplay = block.endTime === '00:00' ? '24:00' : block.endTime;
            const tooltip = showDetailedTooltips 
              ? this._getZoneDetailedTooltip(block.zone, block.startTime, endTimeDisplay)
              : `${block.zone.name}: ${block.startTime} - ${endTimeDisplay}`;
            return html`
              <div
                class="block ${isReadonly ? 'readonly' : ''}"
                style="left: ${left}%; width: ${width}%; background-color: ${color}; color: ${textColor}"
                @click=${isReadonly ? undefined : () => this._handleBlockClick(day, block)}
                title="${tooltip}"
              >
                ${showLabel ? html`<span class="block-label">${block.zone.name}</span>` : nothing}
              </div>
            `;
          })}
          ${shouldShowIndicator ? html`
            <div 
              class="current-time-indicator"
              style="left: ${position}%"
              title="${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')} - ${zoneName} ${zoneTemp}"
            >
              <div 
                class="current-time-line"
                style="background-color: ${this._config?.current_time_color || '#03a9f4'}; box-shadow: 0 0 4px ${this._config?.current_time_color || '#03a9f4'}80;"
              ></div>
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }

  private _renderLegend(attrs: ScheduleSummaryAttributes): TemplateResult {
    return html`
      <div class="legend">
        ${attrs.zones.map((zone, index) => {
          const color = getZoneColor(zone, this._config?.zone_colors, index);
          const textColor = getContrastTextColor(color);

          const showDetailedTooltips = this._config?.show_detailed_tooltips !== false; // Default to true
          const tooltip = showDetailedTooltips 
            ? this._getZoneDetailedTooltip(zone)
            : zone.name;
          return html`
            <div 
              class="legend-item" 
              style="background-color: ${color}; color: ${textColor}"
              title="${tooltip}"
            >
              ${zone.name}
              ${this._config?.show_temperatures
                ? html`<span class="legend-temp">${this._getZoneTempDisplay(zone)}</span>`
                : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  private _getZoneTemp(zone: Zone): number | string {
    const temps = Object.values(zone.room_temperatures);
    if (temps.length === 0) return 0;
    
    const mode = this._config?.temp_mode ?? 'average';
    
    switch (mode) {
      case 'min':
        return Math.round(Math.min(...temps));
      case 'max':
        return Math.round(Math.max(...temps));
      case 'range':
        const min = Math.round(Math.min(...temps));
        const max = Math.round(Math.max(...temps));
        return `${min}°~${max}°`;
      case 'average':
      default:
        return Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
    }
  }

  private _getZoneTempDisplay(zone: Zone): string {
    const temp = this._getZoneTemp(zone);
    // If it's already a string (range mode), return it as is
    if (typeof temp === 'string') {
      return temp;
    }
    // Otherwise, add the degree symbol
    return `${temp}°`;
  }

  /**
   * Get room name from Home Assistant entities
   */
  private _getRoomName(roomId: string): string {
    let roomName = roomId;
    
    // Clean up room ID for display (replace underscores with spaces, capitalize)
    roomName = roomId
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    if (this.hass) {
      // Look for sensor entities that might contain the room name or ID
      const searchTerms = [roomId, roomId.replace(/_/g, ' '), roomName.toLowerCase()];
      const sensorEntity = Object.keys(this.hass.states).find(
        e => {
          const entityLower = e.toLowerCase();
          return searchTerms.some(term => entityLower.includes(term.toLowerCase()));
        }
      );
      if (sensorEntity) {
        const friendlyName = this.hass.states[sensorEntity]?.attributes?.friendly_name;
        if (friendlyName && typeof friendlyName === 'string') {
          roomName = friendlyName;
        }
      }
    }
    
    return roomName;
  }

  /**
   * Get detailed temperatures tooltip for a zone with time range
   */
  private _getZoneDetailedTooltip(zone: Zone, startTime?: string, endTime?: string): string {
    const roomTemps = zone.room_temperatures;
    if (!roomTemps || Object.keys(roomTemps).length === 0) {
      const timeRange = startTime && endTime ? ` (${startTime} - ${endTime})` : '';
      return `${zone.name}${timeRange}\n`;
    }

    // Build header with time range if provided
    const timeRange = startTime && endTime ? ` (${startTime} - ${endTime})` : '';
    const lines: string[] = [`${zone.name}${timeRange}`];
    
    // Get room entries with friendly names
    const roomEntries = Object.entries(roomTemps)
      .map(([roomId, temp]) => ({
        name: this._getRoomName(roomId),
        temp: Math.round(temp),
      }))
      .sort((a, b) => {
        // Sort by temperature first, then by name
        if (a.temp !== b.temp) {
          return a.temp - b.temp;
        }
        return a.name.localeCompare(b.name);
      });

    // Group rooms by temperature
    const groupedByTemp = new Map<number, string[]>();
    roomEntries.forEach(({ name, temp }) => {
      if (!groupedByTemp.has(temp)) {
        groupedByTemp.set(temp, []);
      }
      groupedByTemp.get(temp)!.push(name);
    });

    // Build lines with grouped rooms
    Array.from(groupedByTemp.entries())
      .sort(([tempA], [tempB]) => tempA - tempB)
      .forEach(([temp, roomNames]) => {
        const roomsList = roomNames.join(', ');
        lines.push(`${roomsList}: ${temp}°C`);
      });

    return lines.join('\n');
  }

  private _renderEditor(attrs: ScheduleSummaryAttributes): TemplateResult {
    const shortDays = DAYS_OF_WEEK.map(day => this._getDayName(day, true));

    return html`
      <div class="editor-overlay" @click=${this._closeEditor}>
        <div class="editor" @click=${(e: Event) => e.stopPropagation()}>
          <div class="editor-header">
            <span class="editor-title">Edit Schedule</span>
          </div>

          <div class="editor-row">
            <div class="editor-section">
              <label>From</label>
              <div class="day-time-input">
                <select
                  class="day-select"
                  .value=${String(this._editor.startDayIndex)}
                  @change=${(e: Event) => this._handleDayChange('start', parseInt((e.target as HTMLSelectElement).value))}
                >
                  ${shortDays.map((day, idx) => html`
                    <option value=${idx} ?selected=${idx === this._editor.startDayIndex}>${day}</option>
                  `)}
                </select>
                <input
                  type="text"
                  class="time-input"
                  placeholder="HH:MM"
                  pattern="[0-2][0-9]:[0-5][0-9]"
                  .value=${this._editor.startTime}
                  @input=${(e: Event) => this._handleTimeChange('startTime', (e.target as HTMLInputElement).value)}
                />
              </div>
            </div>
            <div class="editor-section">
              <label>To</label>
              <div class="day-time-input">
                <select
                  class="day-select"
                  .value=${String(this._editor.endDayIndex)}
                  @change=${(e: Event) => this._handleDayChange('end', parseInt((e.target as HTMLSelectElement).value))}
                >
                  ${shortDays.map((day, idx) => html`
                    <option value=${idx} ?selected=${idx === this._editor.endDayIndex}>${day}</option>
                  `)}
                </select>
                <input
                  type="text"
                  class="time-input"
                  placeholder="HH:MM"
                  pattern="[0-2][0-9]:[0-5][0-9]"
                  .value=${this._editor.endTime}
                  @input=${(e: Event) => this._handleTimeChange('endTime', (e.target as HTMLInputElement).value)}
                />
              </div>
            </div>
          </div>

          <div class="editor-section">
            <label>Zone</label>
            <div class="zone-options">
              ${attrs.zones.map((zone, index) => {
                const color = getZoneColor(zone, this._config?.zone_colors, index);
                const textColor = getContrastTextColor(color);
                const isSelected = this._editor.selectedZoneId === zone.id;

                return html`
                  <button
                    class="zone-option ${isSelected ? 'selected' : ''}"
                    style="background-color: ${color}; color: ${textColor}"
                    @click=${() => this._handleZoneSelect(zone.id)}
                  >
                    ${zone.name}
                  </button>
                `;
              })}
            </div>
          </div>

          <div class="editor-actions">
            <button class="btn-cancel" @click=${this._closeEditor}>Cancel</button>
            <button class="btn-apply" @click=${this._applyEdit}>Apply</button>
          </div>
        </div>
      </div>
    `;
  }

  private _renderLoading(): TemplateResult {
    return html`
      <div class="loading-overlay">
        <ha-circular-progress indeterminate></ha-circular-progress>
      </div>
    `;
  }

  private _renderError(): TemplateResult {
    return html`
      <div class="error-toast" @click=${() => (this._error = undefined)}>
        ${this._error}
      </div>
    `;
  }

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
      min-height: 0;
    }

    .card-header.compact {
      margin-bottom: 8px;
      min-height: 0;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      flex: 1;
    }

    .header-left:empty {
      display: none;
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

    .schedule-select {
      font-size: 0.9em;
      padding: 4px 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
      min-width: 120px;
    }

    .schedule-select:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .schedule-select:hover {
      border-color: var(--primary-color);
    }

    .refresh-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
      color: var(--secondary-text-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s, color 0.2s;
    }

    .refresh-btn:hover {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }

    .refresh-btn:active {
      background: var(--divider-color);
    }

    .schedule-container {
      margin-bottom: 16px;
    }

    .time-axis {
      display: flex;
      margin-bottom: 4px;
    }

    .time-labels {
      flex: 1;
      position: relative;
      height: 20px;
    }

    .time-label {
      position: absolute;
      font-size: 0.7em;
      color: var(--secondary-text-color);
      transform: translateX(-50%);
    }

    .day-row {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
    }

    .day-label {
      width: 40px;
      font-size: 0.85em;
      font-weight: 500;
      text-align: right;
      padding-right: 8px;
      flex-shrink: 0;
    }

    .blocks-container {
      flex: 1;
      position: relative;
      background: var(--divider-color);
      border-radius: 4px;
      overflow: visible;
    }

    .block {
      position: absolute;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.1s, box-shadow 0.1s;
      border-radius: 2px;
      overflow: hidden;
    }

    .block.readonly {
      cursor: default;
    }

    .current-time-indicator {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      z-index: 100;
      pointer-events: none;
      transform: translateX(-50%);
    }

    .current-time-line {
      position: absolute;
      top: -2px;
      bottom: -2px;
      left: 50%;
      width: 2px;
      transform: translateX(-50%);
      animation: blink 1s infinite;
    }

    @keyframes blink {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }

    .block:hover:not(.readonly) {
      transform: scaleY(1.1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      z-index: 10;
    }

    .block-label {
      font-size: 0.75em;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 4px;
    }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
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

    /* Editor Overlay */
    .editor-overlay {
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

    .editor {
      background: var(--card-background-color);
      border-radius: 12px;
      padding: 20px;
      min-width: 300px;
      max-width: 90vw;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
    }

    .editor-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .editor-title {
      font-size: 1.1em;
      font-weight: 500;
    }

    .editor-day {
      font-size: 0.9em;
      color: var(--secondary-text-color);
    }

    .editor-row {
      display: flex;
      gap: 16px;
    }

    .editor-row .editor-section {
      flex: 1;
    }

    .day-time-input {
      display: flex;
      gap: 8px;
    }

    .day-select {
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      font-size: 1em;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      cursor: pointer;
      min-width: 70px;
    }

    .day-select:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .editor-section {
      margin-bottom: 16px;
    }

    .editor-section label {
      display: block;
      font-size: 0.85em;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--secondary-text-color);
    }

    .time-input {
      flex: 1;
      min-width: 70px;
      padding: 10px;
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      font-size: 1.1em;
      font-family: monospace;
      text-align: center;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-sizing: border-box;
    }

    .time-input:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .zone-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .zone-option {
      padding: 10px 16px;
      border: 2px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.95em;
      font-weight: 500;
      transition: transform 0.1s, border-color 0.1s;
    }

    .zone-option:hover {
      transform: scale(1.05);
    }

    .zone-option.selected {
      border-color: var(--primary-text-color);
    }

    .editor-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .btn-cancel, .btn-apply {
      flex: 1;
      padding: 12px;
      border: none;
      border-radius: 8px;
      font-size: 1em;
      cursor: pointer;
      transition: background-color 0.1s;
    }

    .btn-cancel {
      background: var(--primary-background-color);
      color: var(--primary-text-color);
      border: 1px solid var(--divider-color);
    }

    .btn-apply {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
    }

    .btn-cancel:hover {
      background: var(--secondary-background-color);
    }

    .btn-apply:hover {
      opacity: 0.9;
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

declare global {
  interface HTMLElementTagNameMap {
    'intuis-schedule-card': IntuisScheduleCard;
  }
}
