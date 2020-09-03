import { createValidator } from 'utils/Validation';

const constraints = {
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

export const isValid = createValidator(constraints);
