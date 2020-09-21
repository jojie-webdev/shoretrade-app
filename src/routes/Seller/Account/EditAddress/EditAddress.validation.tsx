import { createFormikValidator } from 'utils/Validation';

const constraints = {
  address: {
    presence: {
      message: '^Please enter address',
      allowEmpty: false,
    },
  },
};

export const isValid = createFormikValidator(constraints);
