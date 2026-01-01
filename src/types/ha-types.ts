/**
 * Minimal Home Assistant types for custom cards
 * Based on HA frontend types
 */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface HassConfig {
  latitude: number;
  longitude: number;
  elevation: number;
  unit_system: {
    length: string;
    mass: string;
    temperature: string;
    volume: string;
  };
  location_name: string;
  time_zone: string;
  components: string[];
  version: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  config: HassConfig;
  language: string;
  locale: {
    language: string;
    number_format: string;
  };
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] }
  ) => Promise<void>;
  callApi: <T>(
    method: string,
    path: string,
    parameters?: Record<string, unknown>
  ) => Promise<T>;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  lovelace?: unknown;
  setConfig(config: LovelaceCardConfig): void;
}

/**
 * Fire event helper type
 */
export interface CustomEvent<T = unknown> extends Event {
  detail: T;
}

// HTMLElementTagNameMap declarations are in the component files
