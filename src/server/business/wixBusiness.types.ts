import type { locations, siteProperties } from '@wix/business-tools';

export type WixBusinessModules = {
  locations: typeof locations;
  siteProperties: typeof siteProperties;
};

export type WixBusinessInfo = siteProperties.PropertiesReadResponse &
  siteProperties.PropertiesReadResponseNonNullableFields;

export type WixBusinessProps = siteProperties.Properties;

export type WixLocationProps = locations.Location &
  locations.LocationNonNullableFields;

export type Hour =
  `${`${0 | 1}${number}` | `2${0 | 1 | 2 | 3}`}:${`${0 | 1 | 2 | 3 | 4 | 5}${number}`}`;
export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'
  | locations.DayOfWeek;

export type HoursPeriod = {
  openDay: DayOfWeek | locations.DayOfWeek;
  openTime: Hour;
  closeDay: DayOfWeek | locations.DayOfWeek;
  closeTime: Hour | locations.DayOfWeek;
};

export type SpecialHoursPeriod = {
  endDate: DayOfWeek;
  startDate: DayOfWeek;
  isClosed?: boolean;
  comment?: string;
};

export type Address = {
  street: string;
  street2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  coordinates?: [latitude: number, longitude: number];
};

export interface IBranch {
  id: string;
  name: string;
  description: string;
  revisionId: string;
  isDefault: boolean;
  isArchived: boolean;
  hours?: HoursPeriod[];
  specialHours?: SpecialHoursPeriod[];
  address?: Address;
  email?: string;
  phone?: string;
  fax?: string;
  timezone?: string;
  // status: locations.LocationStatus; // Wix: for future use
  // type: locations.LocationType; // Wix: for future use
}
