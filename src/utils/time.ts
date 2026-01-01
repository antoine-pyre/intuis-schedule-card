import { DAYS_OF_WEEK, DayOfWeek, DAY_INDEX } from '../types/types';

/**
 * Parse time string "HH:MM" to minutes from midnight
 */
export function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convert minutes from midnight to "HH:MM" string
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Calculate m_offset (minutes from Monday 00:00)
 */
export function calculateMOffset(day: DayOfWeek | number, time: string): number {
  const dayIndex = typeof day === 'number' ? day : DAY_INDEX[day];
  const minutesInDay = parseTimeToMinutes(time);
  return dayIndex * 1440 + minutesInDay;
}

/**
 * Generate time slots for a given step
 */
export function generateTimeSlots(
  startHour: number,
  endHour: number,
  step: 15 | 30 | 60
): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      if (hour === endHour && minute > 0) break;
      slots.push(minutesToTime(hour * 60 + minute));
    }
  }
  return slots;
}

/**
 * Get current time as "HH:MM"
 */
export function getCurrentTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
}

/**
 * Get current day of week
 */
export function getCurrentDay(): DayOfWeek {
  const dayIndex = new Date().getDay();
  // JavaScript: Sunday = 0, we need Monday = 0
  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  return DAYS_OF_WEEK[adjustedIndex];
}

/**
 * Check if a time slot is the current time slot
 */
export function isCurrentTimeSlot(
  day: DayOfWeek,
  time: string,
  step: 15 | 30 | 60
): boolean {
  const currentDay = getCurrentDay();
  if (day !== currentDay) return false;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const slotMinutes = parseTimeToMinutes(time);

  return currentMinutes >= slotMinutes && currentMinutes < slotMinutes + step;
}

/**
 * Get short day name for compact mode
 */
export function getShortDayName(day: DayOfWeek): string {
  return day.substring(0, 3);
}
