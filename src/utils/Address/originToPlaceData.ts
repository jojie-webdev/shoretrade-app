import { PlaceData } from 'types/PlaceData';

export function originToPlaceData(data: {
  suburb: string;
  state: string;
  countryCode: string;
}): PlaceData {
  return {
    address: `${data.suburb}, ${data.state}, ${data.countryCode}`,
    coordinates: {
      lat: null,
      lng: null,
    },
    unitNumber: '',
    level: '',
    streetNumber: '',
    route: '',
    locality: data.suburb,
    administrativeAreaLevel1: data.state,
    postcode: '',
    countryCode: data.countryCode,
  };
}
