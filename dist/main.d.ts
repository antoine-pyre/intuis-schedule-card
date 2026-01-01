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
export { IntuisScheduleCard, IntuisScheduleCardEditor };
//# sourceMappingURL=main.d.ts.map