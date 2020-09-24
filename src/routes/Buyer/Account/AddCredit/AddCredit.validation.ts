import { createFormikValidator } from 'utils/Validation';

const constraints = {
  amount: {
    presence: {
      message: '^Please enter amount',
      allowEmpty: false,
    },
    isValidPrice: '^Please enter a valid amount',
  },
};

export const validate = createFormikValidator(constraints);
