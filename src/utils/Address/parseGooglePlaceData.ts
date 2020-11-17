import pathOr from 'ramda/es/pathOr';
import { PlaceData } from 'types/PlaceData';

const findParam = (
  components: {
    short_name: string;
    types: string[];
  }[],
  param: string
) =>
  components.find((comp): boolean => comp.types.indexOf(param) !== -1) || {
    short_name: '',
  };

export default (place: {
  formatted_address: string;
  address_components: {
    short_name: string;
    types: string[];
  }[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}): PlaceData => ({
  address: place.formatted_address,
  coordinates: {
    lat: pathOr(null, ['geometry', 'location', 'lat'], place),
    lng: pathOr(null, ['geometry', 'location', 'lng'], place),
  },
  unitNumber: findParam(place.address_components, 'subpremise').short_name,
  level: findParam(place.address_components, 'floor').short_name,
  streetNumber: findParam(place.address_components, 'street_number').short_name,
  route: findParam(place.address_components, 'route').short_name,
  locality:
    findParam(place.address_components, 'locality').short_name ||
    findParam(place.address_components, 'administrative_area_level_2')
      .short_name,
  administrativeAreaLevel1: findParam(
    place.address_components,
    'administrative_area_level_1'
  ).short_name,
  postcode: findParam(place.address_components, 'postal_code').short_name,
  countryCode: findParam(place.address_components, 'country').short_name,
});
