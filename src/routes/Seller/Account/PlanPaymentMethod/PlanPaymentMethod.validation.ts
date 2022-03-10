import { createFormikValidator } from 'utils/Validation';

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

export const validateCard = createFormikValidator(paymentMethodConstraints);
