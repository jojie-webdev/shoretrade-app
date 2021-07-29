import { createValidator } from 'utils/Validation';

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
  alwaysAvailable: {
    isTrue:
      '^You cannot have an Aquafuture listing that is Always Available. If you would like this listing to be Always Available, deselect the Aquafuture tick box on Step 5',
  },
};

const constraintsAlt = {
  catchRecurrence: {
    presence: {
      message: '^Please set catch date',
      allowEmpty: false,
    },
  },
  price: {
    presence: {
      message: '^Please enter a price',
      allowEmpty: false,
    },
    isValidPrice: '^Please enter a valid price',
  },
  origin: {
    presence: {
      message: '^Please enter origin',
      allowEmpty: false,
    },
  },
  shippingAddress: {
    presence: {
      message: '^Please select shipping address',
      allowEmpty: false,
    },
  },
};

export const isValid = createValidator(constraints);
export const isValidAlt = createValidator(constraintsAlt);

export const isDateRangeValid = (endListing: Date, catchDate: Date) => {
  return (
    endListing && catchDate && endListing > catchDate && endListing > new Date()
  );
};
