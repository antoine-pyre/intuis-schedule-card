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
  private _configChanged(config: IntuisScheduleCardConfig): void {
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

    // Get all sensor entities that could be schedule summary sensors
    const entities = Object.keys(this.hass.states)
      .filter((e) => e.startsWith('sensor.') && e.includes('schedule'))
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
