export const cardExpiryInputFilter = (
  fieldName: string,
  value: string,
  formik: any
) => {
  const text = value.trim().replace(/\s/g, '');
  const isFirstHalf = value.length === 2;
  const isMaxLen = text.replace('/', '').length >= 4;

  if (isFirstHalf) {
    formik.setFieldValue(fieldName, value + ' / ', false);
  } else if (isMaxLen) {
    formik.setFieldValue(fieldName, value.substr(0, 7), false);
  }
};
