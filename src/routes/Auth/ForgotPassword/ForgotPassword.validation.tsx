import { createValidator } from 'utils/Validation';

const constraints = {
  email: {
    presence: {
      message: '^Please enter your email',
      allowEmpty: false,
    },
    email: {
      message: '^Please enter a valid email',
    },
  },
};

export const validate = createValidator(constraints);
