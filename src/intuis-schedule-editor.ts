import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { IntuisScheduleCardConfig, HomeAssistant } from './types/types';

@customElement('intuis-schedule-card-editor')
export class IntuisScheduleCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: IntuisScheduleCardConfig;

  public setConfig(config: IntuisScheduleCardConfig): void {
    this._config = config;
  }

  /**
   * Fire config change event
   */
  private _configChanged(config: Partial<IntuisScheduleCardConfig>): void {
    const event = new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  /**
   * Handle input changes
   */
  private _valueChanged(ev: Event): void {
    if (!this._config) return;

    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    const configKey = target.dataset.config as keyof IntuisScheduleCardConfig;

    if (!configKey) return;

    let value: string | number | boolean = target.value;

    // Type conversions
    if (target.type === 'number') {
      value = parseInt(target.value, 10);
    } else if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    }

    const newConfig = {
      ...this._config,
      [configKey]: value,
    };

    this._configChanged(newConfig);
  }

  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html`<div>Loading...</div>`;
    }

    // Get Intuis schedule sensor entities
    // Valid entities: sensor.intuis_home_schedule_<schedule_name>
    // Exclude: *_scheduled_* (room temp sensors), *_schedule_summary, *_schedule_optimization
    const entities = Object.keys(this.hass.states)
      .filter((e) => {
        if (!e.startsWith('sensor.')) return false;
        if (!e.includes('intuis')) return false;
        // Must contain 'schedule_' (with underscore) but not 'scheduled_'
        if (!e.includes('_schedule_')) return false;
        if (e.includes('scheduled_')) return false;
        // Exclude old summary and config entities
        if (e.endsWith('_schedule_summary')) return false;
        if (e.endsWith('_schedule_optimization')) return false;
        return true;
      })
      .sort();

    return html`
      <div class="editor">
        <div class="row">
          <label>Entity</label>
          <select
            data-config="entity"
            .value=${this._config.entity || ''}
            @change=${this._valueChanged}
          >
            <option value="">Select entity...</option>
            ${entities.map(
              (entity) => html`
                <option value=${entity} ?selected=${this._config?.entity === entity}>
                  ${this.hass!.states[entity]?.attributes.friendly_name || entity}
                </option>
              `
            )}
          </select>
        </div>

        <div class="row">
          <label>Title (optional)</label>
          <input
            type="text"
            data-config="title"
            .value=${this._config.title || ''}
            @input=${this._valueChanged}
            placeholder="Heating Schedule"
          />
        </div>

        <div class="row">
          <label>Schedule Select Entity (optional)</label>
          <select
            data-config="schedule_select_entity"
            .value=${this._config.schedule_select_entity === undefined ? '__none_show__' : (this._config.schedule_select_entity === '' ? '__none_hide__' : this._config.schedule_select_entity)}
            @change=${(e: Event) => {
              const target = e.target as HTMLSelectElement;
              const value = target.value;
              if (value === '__none_show__') {
                // Remove the property to show schedule name
                const newConfig = { ...this._config };
                delete newConfig.schedule_select_entity;
                this._configChanged(newConfig);
              } else if (value === '__none_hide__') {
                // Set to empty string to hide schedule display
                const newConfig = {
                  ...this._config,
                  schedule_select_entity: '',
                };
                this._configChanged(newConfig);
              } else {
                // Set to the selected entity
                const newConfig = {
                  ...this._config,
                  schedule_select_entity: value,
                };
                this._configChanged(newConfig);
              }
            }}
          >
            <option value="__none_show__" ?selected=${this._config.schedule_select_entity === undefined}>None (show schedule name)</option>
            <option value="__none_hide__" ?selected=${this._config.schedule_select_entity === ''}>None (hide schedule display)</option>
            ${Object.keys(this.hass.states)
              .filter((e) => e.startsWith('select.') && e.includes('schedule'))
              .sort()
              .map(
                (entity) => html`
                  <option value=${entity} ?selected=${this._config?.schedule_select_entity === entity}>
                    ${this.hass!.states[entity]?.attributes.friendly_name || entity}
                  </option>
                `
              )}
          </select>
        </div>

        <div class="row">
          <label>Time Step</label>
          <select
            data-config="time_step"
            .value=${String(this._config.time_step || 60)}
            @change=${this._valueChanged}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        <div class="row">
          <label>Start Hour</label>
          <input
            type="number"
            data-config="start_hour"
            .value=${String(this._config.start_hour ?? 0)}
            @input=${this._valueChanged}
            min="0"
            max="23"
          />
        </div>

        <div class="row">
          <label>End Hour</label>
          <input
            type="number"
            data-config="end_hour"
            .value=${String(this._config.end_hour ?? 23)}
            @input=${this._valueChanged}
            min="0"
            max="23"
          />
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="show_temperatures"
              ?checked=${this._config.show_temperatures !== false}
              @change=${this._valueChanged}
            />
            Show temperatures in legend
          </label>
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="compact"
              ?checked=${this._config.compact === true}
              @change=${this._valueChanged}
            />
            Compact mode (for mobile)
          </label>
        </div>

        <div class="row">
          <label>Row Height (px)</label>
          <input
            type="number"
            data-config="row_height"
            .value=${String(this._config.row_height ?? 32)}
            @input=${this._valueChanged}
            min="20"
            max="100"
          />
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="show_today_only"
              ?checked=${this._config.show_today_only === true}
              @change=${this._valueChanged}
            />
            Show today only
          </label>
        </div>

        <div class="row">
          <label>Temperature Mode</label>
          <select
            data-config="temp_mode"
            .value=${this._config.temp_mode || 'average'}
            @change=${this._valueChanged}
          >
            <option value="average">Average</option>
            <option value="min">Minimum</option>
            <option value="max">Maximum</option>
            <option value="range">Range (min~max)</option>
          </select>
        </div>

        <div class="row">
          <label>Current Time Indicator Color</label>
          <input
            type="color"
            data-config="current_time_color"
            .value=${this._config.current_time_color || '#03a9f4'}
            @input=${this._valueChanged}
          />
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="readonly"
              ?checked=${this._config.readonly !== false}
              @change=${this._valueChanged}
            />
            Read-only mode (disable schedule editing)
          </label>
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="show_detailed_tooltips"
              ?checked=${this._config.show_detailed_tooltips !== false}
              @change=${this._valueChanged}
            />
            Show detailed tooltips (room temperatures)
          </label>
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="show_day_labels"
              ?checked=${this._config.show_day_labels !== false}
              @change=${this._valueChanged}
            />
            Show day labels
          </label>
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="show_refresh_button"
              ?checked=${this._config.show_refresh_button !== false}
              @change=${this._valueChanged}
            />
            Show refresh button
          </label>
        </div>

        <div class="row checkbox">
          <label>
            <input
              type="checkbox"
              data-config="show_legend"
              ?checked=${this._config.show_legend !== false}
              @change=${this._valueChanged}
            />
            Show legend
          </label>
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .row.checkbox {
      flex-direction: row;
      align-items: center;
    }

    .row.checkbox label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    label {
      font-weight: 500;
      font-size: 0.9em;
    }

    input,
    select {
      padding: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      font-size: 1em;
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    input[type='checkbox'] {
      width: 18px;
      height: 18px;
    }

    input:focus,
    select:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'intuis-schedule-card-editor': IntuisScheduleCardEditor;
  }
}
