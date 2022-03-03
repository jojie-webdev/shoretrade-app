export const cardNumberInputFilter = (
  fieldName: string,
  value: string,
  formik: any
) => {
  const digits = value.trim().replace(/\s/g, '').replace(/[^\d]/g, '');
  const isMaxLen = digits.length > 16;

  formik.setFieldValue(fieldName, digits, false);

  if (digits.length === 16) {
    // formik.setFieldValue('number', value, false);
    const visaString =
      digits.substring(0, 4) +
      ' ' +
      digits.substring(4, 8) +
      ' ' +
      digits.substring(8, 12) +
      ' ' +
      digits.substring(12);
    formik.setFieldValue(fieldName, visaString.trim(), false);
  } else if (digits.length === 15) {
    const amexString =
      digits.substring(0, 4) +
      ' ' +
      digits.substring(4, 10) +
      ' ' +
      digits.substring(10, 15) +
      ' ' +
      digits.substring(15);
    formik.setFieldValue(fieldName, amexString.trim(), false);
  } else if (isMaxLen) {
    // Prevent value to exceed 16 digits + 3 spaces

    formik.setFieldValue(fieldName, value.slice(0, 19).trim(), false);
  }
};
