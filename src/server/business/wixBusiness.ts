import { locations, siteProperties } from '@wix/business-tools';
import { WixServerClient } from '../wixServerClient';
import type { WixBusinessModules, WixBusinessProps } from './wixBusiness.types';

export class WixBusiness extends WixServerClient<WixBusinessModules> {
  props: WixBusinessProps = {};
  version!: number | string;

  private constructor() {
    super({ locations, siteProperties });
  }

  static async init() {
    const instance = new WixBusiness();
    await instance.fetchInfo();
    return instance;
  }

  get type() {
    return this.props.categories?.primary;
  }

  get categories() {
    return this.props.categories?.secondary || [];
  }

  get name() {
    return this.props.businessName;
  }

  get street() {
    const { streetNumber, street } = this.address || {};
    if (!streetNumber && !street) return undefined;
    return [streetNumber, street].filter(Boolean).join(' ');
  }

  get city() {
    return this.address?.city;
  }

  get state() {
    return this.address?.state;
  }

  get zip() {
    return this.address?.zip;
  }

  get country() {
    return this.address?.country;
  }

  get phone() {
    return this.props.phone;
  }

  get fax() {
    return this.props.fax;
  }

  get email() {
    return this.props.email;
  }

  get coordinates() {
    const { latitude, longitude } = this.address?.coordinates || {};
    if (!latitude || !longitude) return null;
    return [latitude, longitude];
  }

  get locale() {
    const { country, languageCode } = this.props.locale || {};
    if (!languageCode || !country) return null;
    return `${languageCode}-${country}`;
  }

  get timezone() {
    // TODO: figure out a way to take `America/New_York` from `GMT-5` or `GMT+2`
    return this.props.timeZone;
  }

  get currency() {
    return this.props.paymentCurrency;
  }

  get hoursOfOperation() {
    return this.props.businessSchedule;
  }

  get isPhysical() {
    return this.props.address?.isPhysical;
  }

  private get address() {
    return this.props.address;
  }

  private async fetchInfo(): Promise<void> {
    const response = await this.client.siteProperties.getSiteProperties();
    this.version = response.version;
    this.props = response.properties || ({} as WixBusinessProps);
  }

  async onInfoChange() {
    this.client.siteProperties.onPropertiesSitePropertiesUpdated(
      ({ data, metadata }) => {
        console.log({ data, metadata });
      }
    );
  }
}
