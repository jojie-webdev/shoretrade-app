import { PlaceData } from 'types/PlaceData';

export function addressToPlaceData(data: PlaceData, unitNumber: string) {
  const street = data.streetNumber
    ? `${unitNumber ? `${unitNumber}/` : ''}${data.streetNumber} ${
        data.address
      }`
    : `${unitNumber ? `${unitNumber} ` : ''}${data.address}`;

  return {
    address: `${street}, ${data.countryCode}`,
    coordinates: {
      lat: null,
      lng: null,
    },
    unitNumber: unitNumber,
    level: data.level,
    streetNumber: data.streetNumber,
    postcode: data.postcode,
    countryCode: data.countryCode,
  };
}
