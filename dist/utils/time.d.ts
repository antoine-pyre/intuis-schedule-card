import { DayOfWeek } from '../types/types';
/**
 * Parse time string "HH:MM" to minutes from midnight
 */
export declare function parseTimeToMinutes(time: string): number;
/**
 * Convert minutes from midnight to "HH:MM" string
 */
export declare function minutesToTime(minutes: number): string;
/**
 * Calculate m_offset (minutes from Monday 00:00)
 */
export declare function calculateMOffset(day: DayOfWeek | number, time: string): number;
/**
 * Generate time slots for a given step
 */
export declare function generateTimeSlots(startHour: number, endHour: number, step: 15 | 30 | 60): string[];
/**
 * Get current time as "HH:MM"
 */
export declare function getCurrentTime(): string;
/**
 * Get current day of week
 */
export declare function getCurrentDay(): DayOfWeek;
/**
 * Check if a time slot is the current time slot
 */
export declare function isCurrentTimeSlot(day: DayOfWeek, time: string, step: 15 | 30 | 60): boolean;
/**
 * Get short day name for compact mode
 */
export declare function getShortDayName(day: DayOfWeek): string;
//# sourceMappingURL=time.d.ts.map