import { createFormikValidator } from 'utils/Validation';

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
  password: {
    presence: {
      message: '^Please enter your password',
      allowEmpty: false,
    },
  },
};

export const validate = createFormikValidator(constraints);
