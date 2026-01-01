import { LitElement, TemplateResult } from 'lit';
import { IntuisScheduleCardConfig, HomeAssistant } from './types/types';
export declare class IntuisScheduleCardEditor extends LitElement {
    hass?: HomeAssistant;
    private _config?;
    setConfig(config: IntuisScheduleCardConfig): void;
    /**
     * Fire config change event
     */
    private _configChanged;
    /**
     * Handle input changes
     */
    private _valueChanged;
    protected render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'intuis-schedule-card-editor': IntuisScheduleCardEditor;
    }
}
//# sourceMappingURL=intuis-schedule-editor.d.ts.map