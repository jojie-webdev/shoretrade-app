import { createFormikValidator } from 'utils/Validation';

const constraints = {
  number: {
    presence: {
      message: '^Please enter card number',
      allowEmpty: false,
    },
    length: {
      is: 16,
      wrongLength: '^Card number must contain 16 digits',
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
    // format: {
    //   pattern: `\\d+ / \\d+`,
    //   flags: 'i',
    //   message: '^Invalid card expiry date',
    // },
  },
  cvc: {
    presence: {
      message: '^Please enter CVC',
      allowEmpty: false,
    },
    length: {
      is: 3,
      wrongLength: '^CVC must contain 3 digits',
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
