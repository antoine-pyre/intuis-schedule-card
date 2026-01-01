/**
 * Intuis Schedule Card
 *
 * A custom Lovelace card for visually editing Intuis Connect heating schedules.
 *
 * @author pmusic62
 * @license MIT
 */

import { IntuisScheduleCard } from './intuis-schedule-card';
import { IntuisScheduleCardEditor } from './intuis-schedule-editor';

// Log version info
const CARD_VERSION = '1.0.0';
console.info(
  `%c  INTUIS-SCHEDULE-CARD  %c  Version ${CARD_VERSION}  `,
  'color: white; font-weight: bold; background: #3b82f6',
  'color: #3b82f6; font-weight: bold; background: white'
);

// Register custom elements
if (!customElements.get('intuis-schedule-card')) {
  customElements.define('intuis-schedule-card', IntuisScheduleCard);
}

if (!customElements.get('intuis-schedule-card-editor')) {
  customElements.define('intuis-schedule-card-editor', IntuisScheduleCardEditor);
}

// Declare card for Home Assistant
declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

// Register card with Home Assistant card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'intuis-schedule-card',
  name: 'Intuis Schedule Card',
  description: 'A visual schedule editor for Intuis Connect heating systems',
  preview: true,
  documentationURL: 'https://github.com/pmusic62/intuis-schedule-card',
});

// Export for external use
export { IntuisScheduleCard, IntuisScheduleCardEditor };

// Add static methods to the card class for Home Assistant integration
(IntuisScheduleCard as unknown as {
  getConfigElement: () => HTMLElement;
  getStubConfig: () => object;
}).getConfigElement = function () {
  return document.createElement('intuis-schedule-card-editor');
};

(IntuisScheduleCard as unknown as {
  getStubConfig: () => object;
}).getStubConfig = function () {
  return {
    type: 'custom:intuis-schedule-card',
    entity: '',
    time_step: 60,
    start_hour: 6,
    end_hour: 23,
    show_temperatures: true,
    compact: false,
  };
};
