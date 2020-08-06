export interface PlaceData {
  address: string;
  coordinates: {
    lat: number | null;
    lng: number | null;
  };
  unitNumber: string;
  level: string;
  streetNumber: string;
  route: string;
  locality: string;
  administrativeAreaLevel1: string;
  postcode: string;
  countryCode: string;
}
