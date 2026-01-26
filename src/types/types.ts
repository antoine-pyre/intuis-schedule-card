import type { HomeAssistant, LovelaceCardConfig } from './ha-types';

// Re-export HA types for convenience
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
  row_height?: number;
  show_today_only?: boolean;
  temp_mode?: 'average' | 'min' | 'max' | 'range';
  schedule_select_entity?: string;
  current_time_color?: string;
  readonly?: boolean;
  show_detailed_tooltips?: boolean;
  show_day_labels?: boolean;
  show_refresh_button?: boolean;
  show_legend?: boolean;
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
  time: string;  // "HH:MM" format
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
export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

export type DayOfWeek = typeof DAYS_OF_WEEK[number];

/**
 * Day index mapping (for service calls)
 */
export const DAY_INDEX: Record<DayOfWeek, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

/**
 * Zone type names (from API documentation)
 */
export const ZONE_TYPE_NAMES: Record<number, string> = {
  0: 'Comfort',
  1: 'Night',
  4: 'Day',
  5: 'Eco',
  8: 'Comfort+',
};

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
