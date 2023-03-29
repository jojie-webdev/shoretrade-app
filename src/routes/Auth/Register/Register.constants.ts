import { Field } from './Register.props';

export const SELLER_STEPS = [
  {
    title: 'Your Details',
    description:
      'Provide your contact details so we can get your account set up and running.',
  },
  {
    title: 'Business Details',
    description:
      'Provide your business details so we can generate invoices and arrange shipment.',
  },
  {
    title: 'Bank Details',
    description:
      'Provide your bank details so we can deposit your sales revenue.',
  },
  {
    title: 'Fishing Licenses',
    description:
      'You have the ability to upload relevant licenses for your seafood business.',
  },
  {
    title: 'Market Sector',
    description:
      'Let us know more about your business by selecting your market sector.',
  },
  // {
  //   title: 'Your Plan',
  //   description:
  //     'Sell your seafood products directly to businesses with a few clicks.',
  // },
  // {
  //   title: 'Payment Method',
  //   description:
  //     'ShoreTrade offers multiple payment options, including the ability to apply for ShorePay; our Buy Now Pay Later financing option.',
  // },
  {
    title: "I'm Selling",
    description:
      'Optimise your experience and select the seafood products your business commonly sells.',
  },
  {
    title: 'Summary',
    description:
      'Provide your bank details so we can get your account set up and running.',
  },
];

export const BUYER_STEPS = [
  {
    title: 'Your Details',
    description:
      'Provide your contact details so we can get your account set up and running.',
  },
  {
    title: 'Business Details',
    description:
      'Provide your business details so we know where to send your purchases.',
  },
  {
    title: 'Market Sector',
    description:
      'Let us know more about your business by selecting your market sector.',
  },
  {
    title: 'I’m looking for',
    description:
      'Let us know which seafood products you commonly purchase so we can optimise your experience.',
  },
  {
    title: 'Choose your plan',
    description:
      'Review the benefits of the base and pro subscription models below, based on your selected monthly purchasing value $0 - $10,000.',
  },
  {
    title: 'Payment Method',
    description:
      'ShoreTrade offers multiple payment options, including the ability to apply for ShorePay; our Buy Now Pay Later financing option.',
  },
  {
    title: 'Summary',
    description:
      'Provide your bank details so we can get your account set up and running.',
  },
];

export const SFM_BUYER_STEPS = [
  {
    title: 'Your Details',
    description:
      'Provide your contact details so we can get your account set up and running.',
  },
  {
    title: 'Business Details',
    description:
      'Provide your business details so we know where to send your purchases.',
  },
  {
    title: 'Market Sector',
    description:
      'Let us know more about your business by selecting your market sector.',
  },
  {
    title: 'I’m looking for',
    description:
      'Let us know which seafood products you commonly purchase so we can optimise your experience.',
  },
  {
    title: 'Choose your plan',
    description:
      'Review the benefits of the base and pro subscription models below, based on your selected monthly purchasing value $0 - $10,000.',
  },
  {
    title: 'Payment Method',
    description:
      'SFMblue offers multiple payment options, including the ability to apply for a credit account; our Buy Now Pay Later financing option.',
  },
  {
    title: 'Summary',
    description:
      'Provide your bank details so we can get your account set up and running.',
  },
];

export const USER_DETAIL_FIELDS: Field[] = [
  {
    label: 'First Name',
    key: 'firstName',
  },
  {
    label: 'Last Name',
    key: 'lastName',
  },
  {
    label: 'Email',
    key: 'email',
    type: 'email',
    alert: 'You will use this to log in once your account is approved',
  },
  {
    label: 'Password',
    key: 'password',
    secured: true,
    tooltipText:
      'Password must be a minimum of 8 characters including 1 Uppercase letter, 1 Number, and 1 special character.',
  },
  {
    label: 'Confirm Password',
    key: 'passwordConfirm',
    secured: true,
  },
];

export const BUSINESS_DETAIL_FIELDS: Field[] = [
  {
    label: 'Business Name',
    key: 'businessName',
  },
  {
    label: 'Business Number',
    key: 'abn',
    placeholder: 'ABN or Country Business Number',
  },
];

export const BANK_DETAIL_FIELDS: Field[] = [
  {
    label: 'Account Name',
    key: 'accountName',
  },
  {
    label: 'BSB',
    key: 'bsb',
  },
  {
    label: 'Account Number',
    key: 'accountNumber',
  },
];

export const BUYER_LOCATION_NOTES =
  'Receiving shipment from more than 1 location? You can add multiple addresses once your account is approved.';

export const SELLER_LOCATION_NOTES =
  'Shipping from more than 1 location? You can add multiple addresses once your account is approved.';

export const PAYMENT_METHOD_OPTIONS = [
  {
    label: 'Application for Line of Credit',
    value: '0',
  },
  {
    label: 'Bank Transfer / EFT',
    value: '1',
  },
];

export const INTERESTED_SHOREPAY_OPTIONS = [
  {
    label: 'Yes',
    value: '1',
  },
  {
    label: 'No',
    value: '0',
  },
];

export const BUYER_VARIATIONS = [
  { key: 'HOTEL', label: 'Hotel' },
  { key: 'RESTAURANT_BAR', label: 'Restaurant ~ Bar' },
  { key: 'WHOLESALER', label: 'Wholesaler' },
  { key: 'PROCESSOR', label: 'Processor' },
  { key: 'RETAILER', label: 'Retailer' },
  { key: 'WET_SHOP', label: 'Wet Shop' },
];

export const SELLER_VARIATIONS = [
  { key: 'WILD_CATCH_FISHING_COMPANY', label: 'Wild Catch Fishing Company' },
  { key: 'AQUACULTURE_PRODUCER', label: 'Aquaculture Producer' },
  { key: 'WHOLESALER', label: 'Wholesaler' },
  { key: 'PROCESSOR', label: 'Processor' },
  { key: 'RETAILER', label: 'Retailer' },
];

export const BUYER_STEP_SUBTITLE: { [key: number]: string } = {
  2: 'By providing us with your business details, we will automatically generate invoices for you and deliver purchases to your door.',
  3: 'Please, let us know your industry so we can provide you with more tailored information.',
  4: 'These selections will result in your ShoreTrade experience being more personalised through customised search results and new product notifications. They can also be amended at any time within your account.',
  5: 'Review the benefits of the base and pro subscription models below.',
};

export const SFM_BUYER_STEP_SUBTITLE: { [key: number]: string } = {
  2: 'By providing us with your business details, we will automatically generate invoices for you and deliver purchases to your door.',
  3: 'Please, let us know your industry so we can provide you with more tailored information.',
  4: 'These selections will result in your ShoreTrade experience being more personalised through customised search results and new product notifications. They can also be amended at any time within your account.',
  5: 'FREE to signup! No charges will be made after your free period unless you opt in. Review the benefits of the Essentials and Pro subscriptions below.',
};

export const SELLER_STEP_SUBTITLE: { [key: number]: string } = {
  2: 'By providing your business details we will automatically generate invoices and can organise shipment of your sales.',
  3: 'Providing your bank details allows us to deposit your sales directly to your nominated account.',
  5: 'By choosing your market sector, we learn more about your business and can optimise your ShoreTrade experience.',
  8: 'These selections will result in a personalised ShoreTrade experience through customised notifications and relevant market statistics. They can also be amended at any time within your account.',
};

export const BUYER_PAYMENT_METHOD_DETAILS = [
  {
    label: 'Credit Card',
    text: 'We accept Visa, MasterCard and American Express (Fees Apply).',
  },
  {
    label: 'EFT',
    text: 'Loading Credit into your ShoreTrade account via Bank Transfer.',
  },
  {
    label: 'Shore Pay',
    text: 'Apply for our Buy Now Pay Later trading account to fast track your business and help with cashflow. ShorePay is a financing tool built by industry for industry.',
  },
];

export const PLAN_NAME = {
  BASE: 'BASE',
  PRO: 'PRO',
};

export const PLAN_PRICE = {
  BASE: { price: 59.99, reverseMarket: 59.99, priceWithReverse: 119.98 },
  PRO: { price: 499 },
};

export const TRANSACTION_VALUES = [
  'Less than $7,500',
  'Between $7,500 and $15,000',
  'Between $15,000 and $22,500',
  'More than $22,500',
];

export const SELLER_REVERSE_MARKET_FEAT = 'FEATURE_REVERSED_MARKETPLACE_SELLER';
export const BUYER_REVERSE_MARKET_FEAT = 'FEATURE_REVERSED_MARKETPLACE';

export const NEW_SAAS_END_DATE = '2023-05-01T16:00:00.000z';
