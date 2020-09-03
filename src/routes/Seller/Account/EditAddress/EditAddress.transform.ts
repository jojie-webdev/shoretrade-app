import { PlaceData } from 'types/PlaceData';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';
import { UpdateAddressMeta } from 'types/store/UpdateAddressState';

import { placeDataToAddAddressMeta } from '../CreateAddress/CreateAddress.transform';

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

export function placeDataToUpdateAddressMeta(
  data: PlaceData,
  unitNumber: string,
  companyId: string,
  isDefault: boolean,
  addressId: string
): UpdateAddressMeta {
  return {
    ...placeDataToAddAddressMeta(data, unitNumber, companyId, isDefault),
    addressId,
  };
}
