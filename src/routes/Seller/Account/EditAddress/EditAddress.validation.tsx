import { createValidator } from 'utils/Validation';

const constraints = {
  address: {
    presence: {
      message: '^Please enter address',
      allowEmpty: false,
    },
  },
};

export const isValid = createValidator(constraints);
