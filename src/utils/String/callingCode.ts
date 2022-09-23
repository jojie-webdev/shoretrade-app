import CALLING_CODES from '../../consts/callingCodes';

export const replaceCallingCode = (mobile: string) => {
  const country = CALLING_CODES.find((cc: { callingCode: string }) =>
    mobile.includes(cc.callingCode)
  );

  return country ? mobile.replace(`+${country.callingCode}`, '') : mobile;
};

export const getCallingCode = (mobile: string) => {
  const country = CALLING_CODES.find((cc: { callingCode: string }) =>
    mobile.includes(cc.callingCode)
  );

  return country ? country.callingCode : '61';
};

export const getCallingCode2 = (mobile: string) => {
  const country = CALLING_CODES.find(
    (cc: { callingCode: string }) => mobile.slice(1, 3) === cc.callingCode
  );

  return country ? country.callingCode : '61';
};
