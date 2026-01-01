import { Zone } from '../types/types';
/**
 * Get color for a zone based on its index (unique per zone)
 */
export declare function getZoneColor(zone: Zone, customColors?: Record<string, string>, zoneIndex?: number): string;
/**
 * Get text color based on background color
 * Returns white for dark backgrounds, dark for light backgrounds
 */
export declare function getContrastTextColor(backgroundColor: string): string;
/**
 * Get zone type display name
 */
export declare function getZoneTypeName(type: number): string;
/**
 * Create CSS custom properties for zone colors
 */
export declare function createZoneColorStyles(zones: Zone[], customColors?: Record<string, string>): string;
//# sourceMappingURL=colors.d.ts.map