import { createFormikValidator } from 'utils/Validation';

const constraints = {
  oldPassword: {
    presence: {
      message: '^Please enter your current password',
      allowEmpty: false,
    },
  },
  newPassword: {
    presence: {
      message: '^Please enter your new password',
      allowEmpty: false,
    },
    length: {
      minimum: 8,
      tooShort: '^Password must contain at least 8 characters',
    },
    containsNumber: '^Password must contain at least 1 number',
    containsSpecialCharacters:
      '^Password must contain at least 1 special character',
    containsUppercase: '^Password must contain at least 1 uppercase character',
  },
  confirmNewPassword: {
    presence: {
      message: '^Please confirm your new password',
      allowEmpty: false,
    },
    equality: {
      attribute: 'newPassword',
      message: '^Password does not match',
    },
  },
};

export const isValid = createFormikValidator(constraints);
