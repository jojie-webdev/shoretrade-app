const SELLER_BASE_URL =
  'https://uploads-ssl.webflow.com/60223707cdaf015858445991/6065051c2d86c080a04f20ae_Terms_Seller.pdf';
const BUYER_BASE_URL =
  'https://uploads-ssl.webflow.com/60223707cdaf015858445991/6065051c7c1ff5527195500d_Terms_Buyer.pdf';

export const getTermsAndConditions = (isSeller?: boolean) => {
  if (!isSeller) {
    window.open(BUYER_BASE_URL, '_blank');
  } else if (isSeller) {
    window.open(SELLER_BASE_URL, '_blank');
  } else return;
};
