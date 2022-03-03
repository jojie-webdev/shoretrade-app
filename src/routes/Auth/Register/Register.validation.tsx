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

const businessAddressConstraints = {
  address: {
    presence: {
      message: '^Please enter address',
      allowEmpty: false,
    },
  },
};

const paymentMethodConstraints = {
  cardNumber: {
    presence: {
      message: '^Please enter card number',
      allowEmpty: false,
    },
    length: {
      minimum: 15,
      maximum: 16,
      tooShort: '^Card number must contain 15 or 16 digits',
      tooLong: '^Card number must contain 15 or 16 digits',
      tokenizer: function (value: string) {
        return value.trim().replace(/\s/g, '');
      },
    },
  },
  cardExpiryDate: {
    presence: {
      message: '^Please enter expiry date',
      allowEmpty: false,
    },
    isFutureDate: '^Invalid card expiry date',
  },
  cardCvc: {
    presence: {
      message: '^Please enter CVC',
      allowEmpty: false,
    },
    length: {
      minimum: 3,
      maximum: 4,
      tooShort: '^CVC must contain 3 or 4 digits',
      tooLong: '^CVC must contain 3 or 4 digits',
    },
  },
  cardName: {
    presence: {
      message: '^Please enter name on card',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Invalid name on card',
    },
  },
  cardBillingAddress: {
    presence: {
      message: '^Please enter billing address',
      allowEmpty: false,
    },
  },
  cardZipCode: {
    presence: {
      message: '^Please enter ZIP code',
      allowEmpty: false,
    },
  },
  cardCity: {
    presence: {
      message: '^Please enter city',
      allowEmpty: false,
    },
  },
  cardState: {
    presence: {
      message: '^Please enter state',
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

const agreementConstraints = {
  agreement: {
    isTrue: '^You must agree to the terms and conditions',
  },
};

const categoryMarketSectorConstraints = {
  categoryMarketSector: {
    presence: {
      message: '^Please select a market sector',
      allowEmpty: false,
    },
  },
};

export const validateCategoryMarketSector = createFormikValidator(
  categoryMarketSectorConstraints
);

export const validateUserDetails = createFormikValidator(
  userDetailsConstraints
);
export const validateBusinessDetails = createFormikValidator(
  businessDetailsConstraints
);
export const validateBusinessAddress = createFormikValidator(
  businessAddressConstraints
);

export const validateCard = createFormikValidator(paymentMethodConstraints);

export const validateBankDetails = createFormikValidator(
  bankDetailsConstraints
);

export const validateAgreement = createFormikValidator(agreementConstraints);
