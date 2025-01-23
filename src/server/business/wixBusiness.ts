import type { WixBusinessModules } from './wixBusiness.types';
import { locations, siteProperties } from '@wix/business-tools';
import { WixServerClient } from '../wixServerClient';
import { WixBusinessLocation } from './wixBusinessLocation';

export class WixBusiness extends WixServerClient<WixBusinessModules> {
  version!: number | string;
  locations: locations.Location[] = [];
  constructor() {
    super({ locations, siteProperties });
  }

  async getLocationById(id: string) {
    const wixLocation = await this.client.locations.getLocation(id);
    const location = new WixBusinessLocation(this.client, wixLocation);
    return location;
  }

  async getLocations() {
    const { locations } = await this.client.locations.listLocations();
    return locations.map((location) => {
      return new WixBusinessLocation(this.client, location);
    });
  }

  async getDefaultLocation() {
    const locationQuery = await this.client.locations
      .queryLocations()
      .eq('default', true)
      .find();

    const wixLocation = locationQuery.items[0];

    if (!wixLocation) {
      throw new Error('No default location found');
    }

    const location = new WixBusinessLocation(this.client, wixLocation);
    return location;
  }

  async onLocationUpdate() {
    return this.client.locations.onLocationCreated;
  }

  async onLocationCreate() {
    return this.client.locations.onLocationCreated;
  }

  async onLocationArchive() {
    return this.client.locations.onLocationArchiveStatus;
  }

  async onLocationSetDefault() {
    return this.client.locations.onLocationSetDefaultLocation;
  }
}
