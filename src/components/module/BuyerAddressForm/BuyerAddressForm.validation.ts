import { createValidator } from 'utils/Validation';

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
  },
};

export const isValid = createValidator(constraints);
