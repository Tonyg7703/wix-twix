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

  get name() {
    return this.props.businessName;
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
