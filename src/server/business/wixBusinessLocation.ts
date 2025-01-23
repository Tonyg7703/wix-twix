import { locations } from '@wix/business-tools';
import type { WixBusiness } from './wixBusiness';
import type {
  HoursPeriod,
  SpecialHoursPeriod,
  DayOfWeek,
  Address,
} from './wixBusiness.types';

export class WixBusinessLocation {
  constructor(
    private client: WixBusiness['client'],
    private props: locations.Location
  ) {
    if (!props._id) throw new Error('Location id is required');
    if (!props.revision) throw new Error('Location revision is required');
    this.props = props;
  }

  private get revision() {
    return this.props.revision;
  }

  private get isArchived() {
    return this.props.archived;
  }

  get id() {
    return this.props._id as string;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get isDefault() {
    return this.props.default;
  }

  get status() {
    return this.props.status;
  }

  get fax() {
    return this.props.fax;
  }

  get timeZone() {
    return this.props.timeZone;
  }

  get email() {
    return this.props.email;
  }

  get phone() {
    return this.props.phone;
  }

  get address(): Address {
    const { number, name, apt } = this.props.address?.streetAddress || {};
    const { latitude, longitude } = this.props.address?.location || {};

    return {
      street: [number, name].filter(Boolean).join(', '),
      street2: apt || '',
      city: this.props.address?.city || '',
      state: this.props.address?.subdivision || '',
      country: this.props.address?.country || '',
      postalCode: this.props.address?.postalCode || '',
      coordinates: latitude && longitude ? [latitude, longitude] : undefined,
    };
  }

  get hours(): HoursPeriod[] {
    const hoursPeriods = this.props.businessSchedule?.periods;
    if (!hoursPeriods) return [];
    return hoursPeriods.map((period) => {
      return this.getHours({
        closeDay: period.closeDay as HoursPeriod['closeDay'],
        closeTime: period.openTime as HoursPeriod['closeTime'],
        openTime: period.closeTime as HoursPeriod['openTime'],
        openDay: period.openDay as HoursPeriod['closeDay'],
      });
    });
  }

  get specialHours(): SpecialHoursPeriod[] {
    const specialPeriods = this.props.businessSchedule?.specialHourPeriod;
    if (!specialPeriods) return [];
    return specialPeriods.map((period) => {
      return this.getSpecialHours({
        startDate: period.startDate as SpecialHoursPeriod['startDate'],
        endDate: period.endDate as SpecialHoursPeriod['endDate'],
        isClosed: period.isClosed,
        comment: period.comment,
      });
    });
  }

  update({
    name,
    description,
    email,
    phone,
    fax,
    timeZone,
  }: Pick<
    locations.UpdateLocation,
    'name' | 'description' | 'phone' | 'email' | 'fax' | 'timeZone'
  >) {
    if (this.isArchived) {
      throw new Error('Cannot update archived location');
    }

    return this.client.locations.updateLocation(this.id, {
      revision: this.revision,
      default: this.isDefault,
      name: name || this.name,
      timeZone: timeZone || this.timeZone,
      address: this.props.address, // TODO: convert to wix format
      description,
      phone,
      email,
      fax,
    });
  }

  async setAsDefault() {
    if (this.isDefault) return;
    this.client.locations.setDefaultLocation(this.id);
  }

  async archive() {
    if (this.isArchived) return;

    if (this.isDefault) {
      throw new Error('Cannot archive default location');
    }

    return this.client.locations.archiveLocation(this.id);
  }

  private getHours({ openDay, openTime, closeDay, closeTime }: HoursPeriod) {
    return {
      openDay: this.getDayOfWeek(openDay),
      openTime: openTime,
      closeDay: this.getDayOfWeek(closeDay),
      closeTime: closeTime,
    };
  }

  private getSpecialHours({
    startDate,
    endDate,
    isClosed,
    comment,
  }: SpecialHoursPeriod) {
    return {
      startDate: this.getDayOfWeek(startDate),
      endDate: this.getDayOfWeek(endDate),
      isClosed,
      comment,
    };
  }

  private getDayOfWeek(day: DayOfWeek) {
    switch (day) {
      case 'MONDAY':
        return locations.DayOfWeek.MONDAY;
      case 'TUESDAY':
        return locations.DayOfWeek.TUESDAY;
      case 'WEDNESDAY':
        return locations.DayOfWeek.WEDNESDAY;
      case 'THURSDAY':
        return locations.DayOfWeek.THURSDAY;
      case 'FRIDAY':
        return locations.DayOfWeek.FRIDAY;
      case 'SATURDAY':
        return locations.DayOfWeek.SATURDAY;
      case 'SUNDAY':
        return locations.DayOfWeek.SUNDAY;
      default:
        throw new Error(`Invalid day of week: ${day}`);
    }
  }
}
