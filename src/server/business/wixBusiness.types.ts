import type { locations, siteProperties } from '@wix/business-tools';

export type WixBusinessModules = {
  locations: typeof locations;
  siteProperties: typeof siteProperties;
};

export type WixBusinessInfo = siteProperties.PropertiesReadResponse &
  siteProperties.PropertiesReadResponseNonNullableFields;

export type WixBusinessProps = siteProperties.Properties;
