import { createFormikValidator, createValidator } from 'utils/Validation';

const constraints = {
  address: {
    presence: {
      message: '^Please enter your delivery address',
      allowEmpty: false,
    },
  },
  unitNumber: {
    presence: {
      allowEmpty: true,
    },
    // maybeNumber: '^Please enter a valid unit number',
  },
};

export const isValid = createValidator(constraints);
