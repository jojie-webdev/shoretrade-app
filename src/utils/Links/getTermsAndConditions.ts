export const getTermsAndConditions = (isSeller?: boolean) => {
  window.open(
    `https://www.shoretrade.com/terms_${isSeller ? 'seller' : 'buyer'}.pdf`,
    '_blank'
  );
};
