import { Zone, ZONE_TYPE_NAMES } from '../types/types';

/**
 * Color palette for zones - each zone gets a unique color based on index
 * Colors are designed to be accessible and distinguishable
 */
const ZONE_COLOR_PALETTE = [
  '#3b82f6',  // Blue
  '#f97316',  // Orange
  '#22c55e',  // Green
  '#ef4444',  // Red
  '#8b5cf6',  // Purple
  '#06b6d4',  // Cyan
  '#ec4899',  // Pink
  '#eab308',  // Yellow
  '#14b8a6',  // Teal
  '#6b7280',  // Gray
  '#f43f5e',  // Rose
  '#84cc16',  // Lime
];

/**
 * Get color for a zone based on its index (unique per zone)
 */
export function getZoneColor(
  zone: Zone,
  customColors?: Record<string, string>,
  zoneIndex = 0
): string {
  // Check custom colors first (by name)
  if (customColors?.[zone.name]) {
    return customColors[zone.name];
  }

  // Use index-based colors to ensure each zone has a unique color
  return ZONE_COLOR_PALETTE[zoneIndex % ZONE_COLOR_PALETTE.length];
}

/**
 * Get text color based on background color
 * Returns white for dark backgrounds, dark for light backgrounds
 */
export function getContrastTextColor(backgroundColor: string): string {
  // Remove # if present
  const hex = backgroundColor.replace('#', '');

  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#1f2937' : '#ffffff';
}

/**
 * Get zone type display name
 */
export function getZoneTypeName(type: number): string {
  return ZONE_TYPE_NAMES[type] || `Type ${type}`;
}

/**
 * Create CSS custom properties for zone colors
 */
export function createZoneColorStyles(
  zones: Zone[],
  customColors?: Record<string, string>
): string {
  return zones
    .map((zone, index) => {
      const color = getZoneColor(zone, customColors, index);
      const textColor = getContrastTextColor(color);
      return `
        --zone-${zone.id}-bg: ${color};
        --zone-${zone.id}-text: ${textColor};
      `;
    })
    .join('');
}
