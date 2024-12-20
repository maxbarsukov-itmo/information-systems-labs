import { UserSettings } from 'interfaces';

export const APP_VERSION = 'v1';

export const API_URL = process.env.REACT_APP_API_URL;
export const WS_URL = process.env.REACT_APP_WS_URL;

export const USER_KEY = 'lab1_USER';
export const TOKEN_KEY = 'lab1_TOKEN';
export const REQUESTS_KEY = 'lab1_REQUESTS';
export const USER_SETTINGS_KEY = 'lab1_USER_SETTINGS';
export const NEEDS_UPDATE_KEY = 'lab1_NEEDS_UPDATE';
export const TABLES_KEY = 'lab1_TABLES';

export type Tables = 'dragons' | 'dragonHeads' | 'dragonCaves' | 'coordinates' | 'locations' | 'people';

export type FlowAlias = 'tables' | 'chart' | 'batchOperationPanel';
export interface FlowObject {
  title: string;
  alias: string;
}
export const FLOWS: FlowObject[] = [
  {
    title: 'pages.app.navigationTabs.tables',
    alias: 'tables',
  },
  {
    title: 'pages.app.navigationTabs.chart',
    alias: 'chart',
  },
  {
    title: 'pages.app.navigationTabs.batchOperations',
    alias: 'batch-operation',
  },
];

export const DEFAULT_USER_SETTINGS: UserSettings = {
  themeType: 'light',
  preferredDarkTheme: 'dark',
  preferredLightTheme: 'light',
  autoChangeTheme: false,
  language: 'ru',
};

export const LANGUAGES_INTERFACE = [
  {
    type: 'en',
    name: 'English',
  },
  {
    type: 'ru',
    name: 'Русский',
  },
];

export const NO_WS_INTERVAL = 5000;

export const ELEMENTS_ON_PAGE = 10;

export const REQUEST_UUIDS_HISTORY_LENGTH = 128;

export const HOUR = 1000 * 60 * 60;
export const DEFAULT_UPDATE_INTERVAL = HOUR / 12;

export const chromeAddressBarHeight = 56;
export const MIN_WIDTH = 960;
export const MIDDLE_WIDTH = 1175;
export const MAX_WIDTH = 1280;
export const BOTTOM_BAR_HEIGHT = 44;
export const APP_BAR_HEIGHT = 48;
export const DRAWER_WIDTH = 296;
