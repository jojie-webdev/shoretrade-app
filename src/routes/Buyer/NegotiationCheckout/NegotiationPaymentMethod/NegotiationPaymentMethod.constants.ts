import accountCredit from 'res/images/pm-account-credit.svg';
import credit from 'res/images/pm-credit.svg';
import finance from 'res/images/pm-finance-invoice.svg';
import payLater from 'res/images/pm-pay-later.svg';

export const NEGOTIATION_PAYMENT_METHODS = [
  {
    label: 'Account Credit',
    value: 'account',
    img: accountCredit,
    mWidth: 36,
    mTopWidth: 22,
    verbiage:
      'Use your available account balance to purchase your products. Multiple top up options are available in your Account section.',
  },
  {
    label: 'Credit Card',
    value: 'card',
    img: credit,
    mWidth: 56,
    mTopWidth: 34,
    verbiage:
      'We accept Visa, MasterCard and American Express. Credit card processing fees apply.',
  },
  {
    label: 'Buy Now, Pay Later',
    value: '',
    img: payLater,
    mWidth: 65,
    mTopWidth: 39,
    disabled: true,
    verbiage:
      'Choose from your preferred Buy Now, Pay Later provider e.g. Zip, AfterPay etc.',
  },
  {
    label: 'ShorePay',
    value: '',
    img: finance,
    mWidth: 45,
    mTopWidth: 30,
    disabled: true,
    verbiage:
      'An industry leading financing option, built and tailored for the seafood industry.',
  },
];

export const TABS = ['Add', 'Existing'];
