import type { HomeAssistant, LovelaceCardConfig } from './ha-types';
export type { HomeAssistant, LovelaceCardConfig };
/**
 * Card configuration options
 */
export interface IntuisScheduleCardConfig extends LovelaceCardConfig {
    entity: string;
    title?: string;
    time_step?: 15 | 30 | 60;
    start_hour?: number;
    end_hour?: number;
    show_temperatures?: boolean;
    compact?: boolean;
    zone_colors?: Record<string, string>;
}
/**
 * Room temperature in a zone
 */
export interface RoomTemperature {
    room_id: string;
    temp: number;
}
/**
 * Zone definition from the schedule
 */
export interface Zone {
    id: number;
    name: string;
    type: number;
    room_temperatures: Record<string, number>;
}
/**
 * Timetable entry for a specific day
 */
export interface TimetableEntry {
    time: string;
    zone: string;
}
/**
 * Weekly timetable structure
 */
export interface WeeklyTimetable {
    Monday?: TimetableEntry[];
    Tuesday?: TimetableEntry[];
    Wednesday?: TimetableEntry[];
    Thursday?: TimetableEntry[];
    Friday?: TimetableEntry[];
    Saturday?: TimetableEntry[];
    Sunday?: TimetableEntry[];
}
/**
 * Available schedule option
 */
export interface AvailableSchedule {
    id: string;
    name: string;
    selected: boolean;
}
/**
 * Attributes from sensor.intuis_home_schedule_<name>
 */
export interface ScheduleSummaryAttributes {
    schedule_id: string;
    is_default: boolean;
    is_active: boolean;
    away_temperature: number;
    frost_guard_temperature: number;
    zones: Zone[];
    zones_count: number;
    weekly_timetable: WeeklyTimetable;
    available_schedules: AvailableSchedule[];
}
/**
 * Days of the week for iteration
 */
export declare const DAYS_OF_WEEK: readonly ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export type DayOfWeek = typeof DAYS_OF_WEEK[number];
/**
 * Day index mapping (for service calls)
 */
export declare const DAY_INDEX: Record<DayOfWeek, number>;
/**
 * Zone type names (from API documentation)
 */
export declare const ZONE_TYPE_NAMES: Record<number, string>;
/**
 * Cell data for the grid
 */
export interface GridCell {
    day: DayOfWeek;
    dayIndex: number;
    time: string;
    zone: Zone | null;
    isCurrentTime: boolean;
}
/**
 * Zone selector state
 */
export interface ZoneSelectorState {
    open: boolean;
    day: DayOfWeek | null;
    dayIndex: number;
    time: string;
}
//# sourceMappingURL=types.d.ts.map