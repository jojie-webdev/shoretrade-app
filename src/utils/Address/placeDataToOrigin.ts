import { PlaceData } from 'types/PlaceData';

export function placeDataToOrigin(data: PlaceData) {
  return {
    suburb: data.locality || '',
    state: data.administrativeAreaLevel1 || '',
    countryCode: data.countryCode || '',
  };
}
