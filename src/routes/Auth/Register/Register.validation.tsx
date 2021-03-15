import { createFormikValidator } from 'utils/Validation';

const userDetailsConstraints = {
  firstName: {
    presence: {
      message: '^Please enter your first name',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Invalid first name',
    },
  },
  lastName: {
    presence: {
      message: '^Please enter your last name',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Invalid last name',
    },
  },
  email: {
    presence: {
      message: '^Please enter your email',
      allowEmpty: false,
    },
    email: {
      message: '^Please enter a valid email',
    },
  },
  password: {
    presence: {
      message: '^Please enter your password',
      allowEmpty: false,
    },
    length: {
      minimum: 8,
      tooShort: '^Password must contain at least 8 characters',
    },
    containsNumber: '^Password must contain at least 1 number',
    containsSpecialCharacters:
      '^Password must contain at least 1 special character',
    containsUppercase: '^Password must contain at least 1 uppercase character',
  },
  passwordConfirm: {
    presence: {
      message: '^Please confirm your password',
      allowEmpty: false,
    },
    equality: {
      attribute: 'password',
      message: '^Password does not match',
    },
  },
  mobile: {
    presence: {
      message: '^Please enter your mobile number',
      allowEmpty: false,
    },
    length: {
      minimum: 5,
      wrongLength: '^Mobile number must be at least 5 characters',
    },
    format: {
      pattern: /^[0-9]+$/,
      message: '^Invalid mobile',
    },
  },
};

const businessDetailsConstraints = {
  businessName: {
    presence: {
      message: '^Please enter your business name',
      allowEmpty: false,
    },
  },
  abn: {
    maybeNumber: '^Please enter a valid business number',
  },
};

const businessAddressContraints = {
  address: {
    presence: {
      message: '^Please enter address',
      allowEmpty: false,
    },
  },
};

const bankDetailsConstraints = {
  accountName: {
    presence: {
      message: '^Please enter your account name',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Invalid account name',
    },
  },
  bsb: {
    presence: {
      message: '^Please enter your bsb',
      allowEmpty: false,
    },
    length: {
      maximum: 6,
      tooLong: '^Invalid bsb',
    },
    format: {
      pattern: /^\d{6}$/,
      message: '^Invalid bsb',
    },
  },
  accountNumber: {
    presence: {
      message: '^Please enter your account number',
      allowEmpty: false,
    },
    length: {
      maximum: 10,
      tooLong: '^Invalid account number',
    },
    format: {
      pattern: /^[0-9]+$/,
      message: '^Invalid account number',
    },
  },
};

const estimatedAnnualRevenueContraints = {
  estimatedAnnualRevenue: {
    isValidPrice: '^Please enter a valid amount',
  },
};

const agreementConstraints = {
  agreement: {
    isTrue: '^You must agree to the terms and conditions',
  },
};

const selectedMarketSectorContstraints = {
  selectedMarketSector: {
    presence: {
      message: '^Please select a market sector',
      allowEmpty: false,
    },
  },
};

const categoryMarketSectorContstraints = {
  categoryMarketSector: {
    presence: {
      message: '^Please select a market sector',
      allowEmpty: false,
    },
  },
};

export const validateCategoryMarketSector = createFormikValidator(
  categoryMarketSectorContstraints
);

export const validateUserDetails = createFormikValidator(
  userDetailsConstraints
);
export const validateBusinessDetails = createFormikValidator(
  businessDetailsConstraints
);
export const validateBusinessAddress = createFormikValidator(
  businessAddressContraints
);
export const validateBankDetails = createFormikValidator(
  bankDetailsConstraints
);

export const validateAnnualRevenue = createFormikValidator(
  estimatedAnnualRevenueContraints
);

export const validateMarketSector = createFormikValidator(
  selectedMarketSectorContstraints
);

export const validateAgreement = createFormikValidator(agreementConstraints);
