export const SELLER_STEPS = [
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
    title: 'Bank Details',
    description:
      'Provide your bank details so we can get your account set up and running.',
  },
  {
    title: 'Licenses',
    description:
      'You have the ability to upload relevant licenses for your seafood business.',
  },
  {
    title: 'Market Sector',
    description:
      'Let us know more about your business by selecting your market sector.',
  },
  {
    title: "I'm Selling",
    description:
      'Let us know which seafood products your business commonly sells so we can optimise your experience.',
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
    title: 'Payment Method',
    description:
      'Select a payment method to be used when purchasing from our suppliers.',
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
    title: 'Summary',
    description:
      'Provide your bank details so we can get your account set up and running.',
  },
];

export const BUYER_MARKET_STEP = {
  title: 'Market Sector',
  description:
    'Please, let us know your industry so we can provide you with more tailored information.',
};

interface Field {
  label: string;
  key: string;
  secured?: boolean;
  alert?: string;
  type?: string;
  prefix?: string;
}

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

export const LICENSES_FIELDS: Field[] = [
  { label: 'License Name', key: 'licenseName' },
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

export const CREDIT_LINE_NOTES =
  'Take Out an Uncapped Line of Credit with ShoreTrade’s Financing. Get approved within 24 hours.';

export const CREDIT_LINE_TERMS_LABEL = 'shoretrade financing terms are:';

export const CREDIT_LINE_TERMS = [
  '• 0 - 30 Days (Interest Free)',
  '• 30 - 60 Days (1.5% on Invoice Penalty Fee), every 30 Days',
  '• Thereafter 1% on Invoice Penalty.',
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
