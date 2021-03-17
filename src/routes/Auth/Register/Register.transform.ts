import { PlaceData } from 'types/PlaceData';

export function addressToPlaceData(data: PlaceData) {
  const street = data.streetNumber
    ? `${data.streetNumber} ${data.address}`
    : data.address;
  return {
    address: `${street}, ${data.countryCode}`,
    coordinates: {
      lat: null,
      lng: null,
    },
    unitNumber: '',
    level: data.level,
    streetNumber: data.streetNumber,
    postcode: data.postcode,
    countryCode: data.countryCode,
  };
}
