import { PlaceData } from 'types/PlaceData';
import { AddAddressMeta } from 'types/store/AddAddressState';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export function addressToPlaceData(data: GetAddressesResponseItem): PlaceData {
  const street = data.streetNumber
    ? `${data.streetNumber} ${data.streetName}`
    : data.streetName;
  return {
    address: `${street}, ${data.suburb}, ${data.state}, ${data.countryCode}`,
    coordinates: {
      lat: null,
      lng: null,
    },
    unitNumber: '',
    level: data.level,
    streetNumber: data.streetNumber,
    route: data.streetName,
    locality: data.suburb,
    administrativeAreaLevel1: data.state,
    postcode: data.postcode,
    countryCode: data.countryCode,
  };
}

export function placeDataToAddAddressMeta(
  data: PlaceData,
  unitNumber: string,
  companyId: string,
  isDefault: boolean,
  approved?: string
): AddAddressMeta {
  return {
    companyId,
    address: data.address,
    default: isDefault,
    unitNumber,
    level: data.level,
    streetName: data.route,
    streetNumber: data.streetNumber,
    suburb: data.locality,
    state: data.administrativeAreaLevel1,
    postcode: data.postcode,
    countryCode: data.countryCode,
    approved: approved,
  };
}
