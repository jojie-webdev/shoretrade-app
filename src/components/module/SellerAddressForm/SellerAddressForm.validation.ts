import { createFormikValidator, createValidator } from 'utils/Validation';

const constraints = {
  address: {
    presence: {
      message: '^Please enter your shipping address',
      allowEmpty: false,
    },
  },
  unitNumber: {
    maybeNumber: '^Please enter a valid unit number',
  },
};

export const isValid = createValidator(constraints);