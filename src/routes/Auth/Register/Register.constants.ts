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
    title: 'Payment Method',
    description:
      'ShoreTrade offers multiple payment options, including the ability to apply for ShorePay; our Buy Now Pay Later financing option.',
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
};

export const SELLER_STEP_SUBTITLE: { [key: number]: string } = {
  2: 'By providing your business details we will automatically generate invoices and can organise shipment of your sales.',
  3: 'Providing your bank details allows us to deposit your sales directly to your nominated account.',
  4: '',
  5: 'By choosing your market sector, we learn more about your business and can optimise your ShoreTrade experience.',
  6: 'These selections will result in a personalised ShoreTrade experience through customised notifications and relevant market statistics. They can also be amended at any time within your account.',
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
    text:
      'Apply for our Buy Now Pay Later trading account to fast track your business and help with cashflow. ShorePay is a financing tool built by industry for industry.',
  },
];
