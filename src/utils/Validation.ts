import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import pick from 'ramda/es/pick';
import validate from 'validate.js';

validate.validators.containsSpecialCharacters = (
  value: string,
  message: string
) => {
  if (!/[$@$!%*#?&]/g.test(value)) {
    return message;
  }
  return null;
};

validate.validators.containsUppercase = (value: string, message: string) => {
  if (!/[A-Z]/g.test(value)) {
    return message;
  }
  return null;
};

validate.validators.containsNumber = (value: string, message: string) => {
  if (!/[0-9]/.test(value)) {
    return message;
  }
  return null;
};

validate.validators.maybeNumber = (value: string, message: string) => {
  if (!value) {
    return null;
  }
  if (!/^\d+(\.\d+)?$/.test(value)) {
    return message;
  }
  return null;
};

validate.validators.isTrue = (value: boolean, message: string) => {
  if (!value) {
    return message;
  }
  return null;
};

validate.validators.containsNumber = (value: string, message: string) => {
  if (!/[0-9]/.test(value)) {
    return message;
  }
  return null;
};

validate.validators.isValidPrice = (value: string, message: string) => {
  if (/^0(\.\d+)?$/.test(value)) {
    return null;
  }

  if (/^[1-9]\d*(\.\d+)?$/.test(value)) {
    return null;
  }
  return message;
};

validate.validators.isFutureDate = (value: Date, message: string) => {
  if (`${value}`.includes('/')) {
    const split: string[] = `${value}`.split('/');
    const MM: number = +split[0]; // typecast to number
    const YY: number = +split[1];
    if (MM < 1 || MM > 12) {
      return message;
    }
    value = new Date(2000 + YY, MM - 1);
  }

  if (value && value > new Date()) {
    return null;
  }

  return message;
};

// used for validating formik
// only returns attributes with error value
export const createFormikValidator = (constraints: Record<string, any>) => {
  return (attributes: Record<string, any>): Record<string, string> => {
    const filteredConstraints = pick(Object.keys(attributes), constraints);
    const validationErrors = validate(attributes, filteredConstraints) || {};
    const filteredValidationErrors = Object.keys(validationErrors).reduce(
      (accumulator, current) => {
        return {
          ...accumulator,
          [current]: pathOr('Invalid value', [current, '0'], validationErrors),
        };
      },
      {}
    );

    return filteredValidationErrors;
  };
};

// used for validating when createUpdateReducer error handler is used instead of formik
// returns all attributes
// errors are in an array
export const createValidator = (constraints: Record<string, any>) => {
  return (attributes: Record<string, any>): Record<string, string[]> => {
    const filteredConstraints = pick(Object.keys(attributes), constraints);
    const emptyErrors = Object.keys(attributes).reduce(
      (accumulator, current) => {
        return {
          ...accumulator,
          [current]: [],
        };
      },
      {}
    );
    const validationErrors = validate(attributes, filteredConstraints) || {};

    return {
      ...emptyErrors,
      ...validationErrors,
    };
  };
};
