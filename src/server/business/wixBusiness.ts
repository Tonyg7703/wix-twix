import { locations, siteProperties } from '@wix/business-tools';
import { WixServerClient } from '../wixServerClient';
import type {
  WixBusinessInfo,
  WixBusinessModules,
  WixBusinessProps,
} from './wixBusiness.types';

export class WixBusiness extends WixServerClient<WixBusinessModules> {
  private version!: number | string;
  props!: WixBusinessProps;

  private constructor() {
    super({ locations, siteProperties });
  }

  get name() {
    return this.props.businessName;
  }

  static async init() {
    const instance = new WixBusiness();
    await instance.fetchInfo();
  }

  private async fetchInfo(): Promise<WixBusinessInfo> {
    const response = await this.client.siteProperties.getSiteProperties();
    this.version = response.version;
    this.props = response.properties || ({} as WixBusinessProps);
    return response;
  }

  async onInfoChange() {
    this.client.siteProperties.onPropertiesSitePropertiesUpdated(
      ({ data, metadata }) => {
        console.log({ data, metadata });
      }
    );
  }
}
