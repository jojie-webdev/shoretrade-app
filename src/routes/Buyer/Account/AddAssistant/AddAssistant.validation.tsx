import { createFormikValidator } from 'utils/Validation';

const constraints = {
  firstName: {
    presence: {
      message: '^Please enter your first name',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Invalid first name',
    },
  },
  lastName: {
    presence: {
      message: '^Please enter your last name',
      allowEmpty: false,
    },
    format: {
      pattern: /^[A-Za-z\s]+$/,
      message: '^Invalid last name',
    },
  },
  email: {
    presence: {
      message: '^Please enter your email',
      allowEmpty: false,
    },
    email: {
      message: '^Please enter a valid email',
    },
  },
  mobile: {
    presence: {
      message: '^Please enter your mobile number',
      allowEmpty: false,
    },
    length: {
      minimum: 5,
      wrongLength: '^Mobile number must be at least 5 characters',
    },
    format: {
      pattern: /^[0-9]+$/,
      message: '^Invalid mobile',
    },
  },
};

export const isValid = createFormikValidator(constraints);
