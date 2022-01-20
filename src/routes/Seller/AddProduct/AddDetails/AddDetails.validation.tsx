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
  templateDeliveryDate: {
    presence: {
      message: '^Please set estimated shipping time',
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
  endAndCatchmentDate: {
    isTrue: '^Expiry date must either be beyond or equal to the catch date',
  },
};

const constraintsAlt = {
  catchRecurrence: {
    presence: {
      message: '^Please set catch date',
      allowEmpty: false,
    },
  },
  catchDate: {
    presence: {
      message: '^Please set catch date',
      allowEmpty: false,
    },
  },
  templateDeliveryDate: {
    presence: {
      message: '^Please set estimated shipping time',
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

const constraintsAuction = {
  auctionDate: {
    presence: {
      message: '^Please set auction date',
      allowEmpty: false,
    },
  },
  catchDate: {
    presence: {
      message: '^Please set auction date',
      allowEmpty: false,
    },
  },
  shippingAddress: {
    presence: {
      message: '^Please select shipping address',
      allowEmpty: false,
    },
  },
  templateDeliveryDate: {
    presence: {
      message: '^Please set estimated shipping time',
      allowEmpty: false,
    },
  },
  origin: {
    presence: {
      message: '^Please enter origin',
      allowEmpty: false,
    },
  },
  isAuctionDateValid: {
    isTrue: '^Please set a valid auction date',
  },
};

export const isValid = createValidator(constraints);
export const isValidAlt = createValidator(constraintsAlt);
export const isValidAuction = createValidator(constraintsAuction);
export const isValidPreAuction = createValidator({
  ...constraintsAuction,
  price: constraintsAlt.price,
});
export const isValidExpiryDate = createValidator({
  isListingExpiryDateValid: constraints.endAndCatchmentDate,
});

export const isDateRangeValid = (endListing: Date, catchDate: Date) => {
  return (
    endListing && catchDate && endListing > catchDate && endListing > new Date()
  );
};

export const isAuctionDateValid = (auctionDate: Date | null) => {
  if (!auctionDate) return false;
  return auctionDate > new Date();
};
export const isListingExpiryDateValid = (isBefore: boolean) => isBefore;
