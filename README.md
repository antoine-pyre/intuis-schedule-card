# Intuis Schedule Card

> **Visually edit your Intuis heating schedules directly from Home Assistant** - a weekly grid interface to manage your Muller / Campa / Intuis radiator schedules with simple clicks.

[![HACS Badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/antoine-pyre/intuis-schedule-card)](https://github.com/antoine-pyre/intuis-schedule-card/releases)

![Intuis Schedule Card Screenshot](docs/screenshot.png)

## What is this?

The **Intuis Schedule Card** is a custom Lovelace card for Home Assistant that provides a **visual weekly schedule editor** for [Intuis Connect](https://github.com/antoine-pyre/homeassistant-intuis-connect) heating systems.

Instead of using the limited Intuis mobile app to manage your heating schedules, you can now:

- **See your entire week at a glance** - A clear grid showing which zone (Comfort, Night, Eco...) is active at any time
- **Edit with simple clicks** - Click any time slot to change the zone, including multi-day spans (e.g., Friday night to Monday morning)
- **Stay in sync** - Changes are immediately sent to the Intuis API

This card is the perfect companion to the [Intuis Connect Integration](https://github.com/antoine-pyre/homeassistant-intuis-connect) for managing Muller, Campa, and Intuis electric radiators with Netatmo "Intuitiv" modules.

---

## Installation

### HACS (Recommended)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=antoine-pyre&repository=intuis-schedule-card&category=lovelace)

Or manually:

1. Open HACS in Home Assistant
2. Go to **Frontend**
3. Click **⋮** (top right) → **Custom repositories**
4. Add:
   - URL: `https://github.com/antoine-pyre/intuis-schedule-card`
   - Category: **Lovelace**
5. Search for "Intuis Schedule Card" and click **Download**
6. Refresh your browser

### Manual Installation

1. Download `intuis-schedule-card.js` from the [latest release](https://github.com/antoine-pyre/intuis-schedule-card/releases)
2. Copy it to `config/www/intuis-schedule-card.js`
3. Add the resource in Home Assistant:
   - Go to **Settings → Dashboards → Resources**
   - Add `/local/intuis-schedule-card.js` as a JavaScript Module

---

## Features

- **Visual Weekly Grid**: See your entire heating schedule at a glance
- **Click to Edit**: Simply click on any time slot to change the zone
- **Multi-day Spans**: Edit blocks that span multiple days (e.g., weekend night mode)
- **Dynamic Zones**: Automatically fetches available zones from your Intuis Connect integration
- **Current Time Indicator**: Highlights the current time slot
- **Refresh Button**: Manually refresh schedule data from Intuis servers
- **Customizable Display**: Configure time steps, visible hours, and colors
- **Responsive Design**: Works on both desktop and mobile devices
- **Visual Configuration Editor**: Easy setup through the Home Assistant UI

---

## Configuration

### Using the UI

1. Add a new card to your dashboard
2. Search for "Intuis Schedule Card"
3. Select your schedule summary entity
4. Configure options as needed

### YAML Configuration

```yaml
type: custom:intuis-schedule-card
entity: sensor.intuis_home_schedule_summary
title: Heating Schedule
time_step: 60
start_hour: 6
end_hour: 23
show_temperatures: true
compact: false
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | The schedule summary sensor entity ID |
| `title` | string | "Heating Schedule" | Card title |
| `time_step` | number | 60 | Time slot duration: 15, 30, or 60 minutes |
| `start_hour` | number | 0 | First hour to display (0-23) |
| `end_hour` | number | 23 | Last hour to display (0-23) |
| `show_temperatures` | boolean | true | Show temperatures in the legend |
| `compact` | boolean | false | Use compact mode for mobile |
| `zone_colors` | object | - | Custom colors for zones (see below) |

### Custom Zone Colors

You can customize zone colors by name:

```yaml
type: custom:intuis-schedule-card
entity: sensor.intuis_home_schedule_summary
zone_colors:
  Night: "#1e40af"
  Comfort: "#ea580c"
  Eco: "#4b5563"
  Comfort+: "#dc2626"
```

---

## Requirements

- Home Assistant 2024.6 or later
- [Intuis Connect Integration](https://github.com/antoine-pyre/homeassistant-intuis-connect) v1.6.0 or later

---

## How It Works

1. The card reads schedule data from the `sensor.intuis_home_schedule_summary` entity
2. It displays a weekly grid showing the active zone for each time slot
3. When you click a cell, a zone selector appears with all available zones
4. Selecting a zone calls the `intuis_connect.set_schedule_slot` service
5. The schedule is synced to the Intuis API immediately

### Multi-day Editing

The card automatically detects multi-day blocks. For example, if you have "Night" mode from Friday 22:00 to Monday 06:00, clicking on that block will let you edit the entire span at once.

---

## Troubleshooting

### Card not appearing
- Make sure the resource is properly added
- Clear your browser cache and refresh (Ctrl+Shift+R)
- Check the browser console for errors

### Entity not found
- Verify the Intuis Connect integration is installed and configured
- The entity should be `sensor.intuis_home_schedule_summary`

### Service call fails
- Check that your Intuis Connect credentials are valid
- Review Home Assistant logs for API errors
- Try clicking the refresh button to sync with Intuis servers

---

## Development

```bash
# Install dependencies
npm install

# Build the card
npm run build

# Watch for changes during development
npm run watch
```

---

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits

Created by [antoine-pyre](https://github.com/antoine-pyre)

Part of the [Intuis Connect](https://github.com/antoine-pyre/homeassistant-intuis-connect) ecosystem for Home Assistant.
