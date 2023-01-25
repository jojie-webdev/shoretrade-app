import { createFormikValidator } from 'utils/Validation';

const constraints = {
  number: {
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
  exp: {
    presence: {
      message: '^Please enter expiry date',
      allowEmpty: false,
    },
    isFutureDate: '^Invalid card expiry date',
  },
  cvc: {
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
  name: {
    presence: {
      message: '^Please enter name on card',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Invalid name on card',
    },
  },
};

export const isValid = createFormikValidator(constraints);
