import accountCredit from 'res/images/pm-account-credit.svg';
import credit from 'res/images/pm-credit.svg';
import finance from 'res/images/pm-finance-invoice.svg';
import payLater from 'res/images/pm-pay-later.svg';

export const PAYMENT_METHODS = [
  {
    label: 'Account Credit',
    value: 'account',
    img: accountCredit,
    mWidth: 36,
    mTopWidth: 22,
  },
  {
    label: 'Credit Card',
    value: 'card',
    img: credit,
    mWidth: 56,
    mTopWidth: 34,
  },
  {
    label: 'Buy Now, Pay Later',
    value: '',
    img: payLater,
    mWidth: 65,
    mTopWidth: 39,
    disabled: true,
  },
  {
    label: 'Finance & Invoice',
    value: '',
    img: finance,
    mWidth: 45,
    mTopWidth: 30,
    disabled: true,
  },
];

export const TABS = ['Add', 'Existing'];
