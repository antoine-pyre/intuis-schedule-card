import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { IntuisScheduleCardConfig, HomeAssistant } from './types/types';
export declare class IntuisScheduleCard extends LitElement {
    hass?: HomeAssistant;
    private _config?;
    private _loading;
    private _error?;
    private _editor;
    setConfig(config: IntuisScheduleCardConfig): void;
    getCardSize(): number;
    protected shouldUpdate(changedProps: PropertyValues): boolean;
    private _getScheduleAttributes;
    /**
     * Convert timetable entries for a day into blocks
     */
    private _getDayBlocks;
    /**
     * Handle block click - open editor
     * Detects multi-day spans by scanning both backward and forward
     */
    private _handleBlockClick;
    /**
     * Handle zone selection in editor
     */
    private _handleZoneSelect;
    /**
     * Handle time change in editor
     */
    private _handleTimeChange;
    /**
     * Handle day change in editor
     */
    private _handleDayChange;
    /**
     * Apply the block edit - supports multi-day spans
     */
    private _applyEdit;
    /**
     * Close editor
     */
    private _closeEditor;
    protected render(): TemplateResult;
    /**
     * Handle refresh button click - refresh schedules from API
     */
    private _handleRefresh;
    private _renderHeader;
    private _renderSchedule;
    private _renderTimeLabels;
    private _renderDayRow;
    private _renderLegend;
    private _getAverageTemp;
    private _renderEditor;
    private _renderLoading;
    private _renderError;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'intuis-schedule-card': IntuisScheduleCard;
    }
}
//# sourceMappingURL=intuis-schedule-card.d.ts.map