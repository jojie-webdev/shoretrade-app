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
  if (value && value > new Date()) {
    return null;
  }

  return message;
};

export const createValidator = (constraints: Record<string, any>) => {
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
