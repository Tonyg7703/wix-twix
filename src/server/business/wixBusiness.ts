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

  get onInfoChange() {
    return this.client.siteProperties.onPropertiesSitePropertiesUpdated;
  }

  async updateContact(contact: siteProperties.BusinessContactData) {
    await this.client.siteProperties.updateBusinessContact(contact);
  }

  async updateAddress(address: siteProperties.Address | undefined) {
    await this.updateContact({ address });
  }

  async updateEmail(email: string | undefined) {
    // TODO: maybe add email validation
    this.updateContact({ email });
  }

  async updatePhone(phone: string | undefined) {
    // TODO: maybe add phone validation
    await this.updateContact({ phone });
  }

  async updateFax(fax: string | undefined) {
    // TODO: maybe add fax validation
    await this.updateContact({ fax });
  }

  async updateProfile(profile: siteProperties.BusinessProfileData) {
    await this.client.siteProperties.updateBusinessProfile(profile);
  }

  async updateName(name: string) {
    await this.updateProfile({ businessName: name });
  }

  async updateDescription(description: string) {
    await this.updateProfile({ description });
  }

  async updateDisplayName(displayName: string) {
    await this.updateProfile({ siteDisplayName: displayName });
  }

  // TODO: see if url can be provided, otherwise, see if client needs to upload
  // the logo and provide the id of the media
  async updateLogo(url: string) {
    await this.updateProfile({ logo: url });
  }
}
