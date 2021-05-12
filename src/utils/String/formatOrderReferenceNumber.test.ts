import { parseOrderReferenceNumber } from './formatOrderReferenceNumber';

describe('parseOrderReferenceNumber', () => {
  describe('when contains letters', () => {
    it('should return the input', () => {
      const input = '7 abcd';
      const result = parseOrderReferenceNumber(input);
      expect(result).toEqual(input);
    });
  }),
    describe('when value starts with 0', () => {
      it('should return the next non zero values', () => {
        const input = '0123';
        const expected = '123';
        const result = parseOrderReferenceNumber(input);
        expect(result).toEqual(expected);
      });
    });

  describe('when value starts with # symbol', () => {
    it('should return the next non zero values', () => {
      const input = '#0000-0123';
      const expected = '123';
      const result = parseOrderReferenceNumber(input);
      expect(result).toEqual(expected);
    });
  });
});
