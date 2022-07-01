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

export function addressToPlaceData2(data: PlaceData, unitNumber: string) {
  const street = data.streetNumber
    ? `${data.streetNumber} ${data.address}`.indexOf(data.streetNumber) > -1
      ? `${data.address}`
      : `${unitNumber ? `${unitNumber}/` : ''}${data.streetNumber} ${
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

export function resErrorToCardFieldError(error: {
  message: string;
  param: string;
}) {
  switch (error.param) {
    case 'number':
      return { cardNumber: error.message };
    case 'exp_month':
    case 'exp_year':
      return { cardExpiryDate: error.message };
    case 'cvc':
      return { cardCvc: error.message };
    case 'name':
      return { cardName: error.message };
    case 'address_line1':
      return { cardBillingAddress: error.message };
    case 'address_city':
      return { cardCity: error.message };
    case 'address_state':
      return { cardState: error.message };
    case 'address_zip':
      return { cardState: error.message };
    default:
      return { cardNumber: error.message };
  }
}
