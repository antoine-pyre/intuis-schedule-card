# Intuis Schedule Card

A custom Lovelace card for Home Assistant that provides a visual schedule editor for [Intuis Connect](https://github.com/pmusic62/homeassistant-intuis-connect) heating systems.

## Features

- **Visual Weekly Grid**: See your entire heating schedule at a glance
- **Click to Edit**: Simply click on any time slot to change the zone
- **Dynamic Zones**: Automatically fetches available zones from your Intuis Connect integration
- **Current Time Indicator**: Highlights the current time slot
- **Customizable Display**: Configure time steps, visible hours, and colors
- **Responsive Design**: Works on both desktop and mobile devices
- **Visual Configuration Editor**: Easy setup through the Home Assistant UI

## Installation

### HACS (Recommended)

1. Open HACS in Home Assistant
2. Click on "Frontend"
3. Click the "+" button
4. Search for "Intuis Schedule Card"
5. Click "Install"
6. Refresh your browser

### Manual Installation

1. Download `intuis-schedule-card.js` from the [latest release](https://github.com/pmusic62/intuis-schedule-card/releases)
2. Copy it to `config/www/intuis-schedule-card.js`
3. Add the resource in Home Assistant:
   - Go to Settings > Dashboards > Resources
   - Add `/local/intuis-schedule-card.js` as a JavaScript Module

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
  Jour: "#ea580c"
  Eco: "#4b5563"
  Comfort+: "#dc2626"
```

## Requirements

- Home Assistant 2023.0 or later
- [Intuis Connect Integration](https://github.com/pmusic62/homeassistant-intuis-connect) v1.6.0 or later

## How It Works

1. The card reads schedule data from the `sensor.intuis_home_schedule_summary` entity
2. It displays a weekly grid showing the active zone for each time slot
3. When you click a cell, a zone selector appears with all available zones
4. Selecting a zone calls the `intuis_connect.set_schedule_slot` service
5. The schedule is synced to the Intuis API immediately

## Troubleshooting

### Card not appearing
- Make sure the resource is properly added
- Clear your browser cache and refresh
- Check the browser console for errors

### Entity not found
- Verify the Intuis Connect integration is installed and configured
- The entity should be `sensor.intuis_home_schedule_summary`

### Service call fails
- Check that your Intuis Connect credentials are valid
- Review Home Assistant logs for API errors

## Development

```bash
# Install dependencies
npm install

# Build the card
npm run build

# Watch for changes during development
npm run watch
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits

Created by [pmusic62](https://github.com/pmusic62)

Part of the [Intuis Connect](https://github.com/pmusic62/homeassistant-intuis-connect) ecosystem for Home Assistant.
