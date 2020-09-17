import { createFormikValidator, createValidator } from 'utils/Validation';

const constraints = {
  price: {
    presence: {
      message: '^Please enter a price',
      allowEmpty: false,
    },
    isValidPrice: '^Please enter a valid price',
  },
  catchDate: {
    presence: {
      message: '^Please set catch date',
      allowEmpty: false,
    },
  },
  origin: {
    presence: {
      message: '^Please enter origin',
      allowEmpty: false,
    },
  },
  listingEndDate: {
    presence: {
      message: '^Please set listing end date',
      allowEmpty: false,
    },
  },
  listingEndTime: {
    presence: {
      message: '^Please set listing end time',
      allowEmpty: false,
    },
  },
  shippingAddress: {
    presence: {
      message: '^Please select shipping address',
      allowEmpty: false,
    },
  },
  isDateRangeValid: {
    isTrue: '^Please set a valid date range',
  },
};

export const isValid = createValidator(constraints);

export const isDateRangeValid = (endListing: Date, catchDate: Date) => {
  if (
    endListing &&
    catchDate &&
    endListing > catchDate &&
    endListing > new Date()
  ) {
    return true;
  }
  return false;
};
