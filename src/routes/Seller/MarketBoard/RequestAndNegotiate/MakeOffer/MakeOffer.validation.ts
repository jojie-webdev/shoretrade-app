import { createValidator } from 'utils/Validation';

const constraints = {
  specifications: {
    presence: {
      message: '^Select at least 1 specification from each section',
      allowEmpty: false,
    },
  },
  sizeFrom: {
    presence: {
      message: '^Please set or pick size',
      allowEmpty: false,
    },
  },
  weight: {
    presence: {
      message: '^Please set weight',
      allowEmpty: false,
    },
  },
  price: {
    presence: {
      message: '^Please set price',
      allowEmpty: false,
    },
  },
  deliveryDate: {
    presence: {
      message: '^Please set delivery date',
      allowEmpty: false,
    },
  },
  selectedAddress: {
    presence: {
      message: '^Please set your shipping from address',
      allowEmpty: false,
    },
  },
};

export const isValid = createValidator(constraints);
