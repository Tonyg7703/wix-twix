import type { locations, siteProperties } from '@wix/business-tools';

export type WixBusinessModules = {
  locations: typeof locations;
  siteProperties: typeof siteProperties;
};

export type WixBusinessInfo = siteProperties.PropertiesReadResponse &
  siteProperties.PropertiesReadResponseNonNullableFields;

export type WixBusinessProps = siteProperties.Properties;

export type Hour =
  `${`${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`}:${`${0 | 1 | 2 | 3 | 4 | 5}${number}`}`;
export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export type BusinessHoursPeriod = {
  openDay: DayOfWeek;
  openTime: Hour;
  closeDay: DayOfWeek;
  closeTime: Hour;
};

export type SpecialBusinessHoursPeriod = {
  endDate: DayOfWeek;
  startDate: DayOfWeek;
  isClosed?: boolean;
  comment?: string;
};
