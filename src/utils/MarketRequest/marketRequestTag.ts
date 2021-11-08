import { Variants } from 'components/base/Alert/Alert.props';
import { TypographyProps } from 'components/base/Typography/Typography.props';
import theme from 'utils/Theme';

type statuses =
  | 'NEGOTIATION'
  | 'NEW_OFFER'
  | 'PENDING_PAYMENT'
  | 'CLOSED'
  | 'FINALISED'
  | 'PAYMENT_MISSED'
  | 'DECLINED'
  | 'NO_OFFERS'
  | 'PAYMENT_REQUIRED';

const text: Record<statuses, string> = {
  NEGOTIATION: 'In Negotiation',
  NEW_OFFER: 'New Offer',
  PENDING_PAYMENT: 'Pending Payment',
  CLOSED: 'Closed',
  FINALISED: 'Finalised',
  PAYMENT_MISSED: 'Payment Missed',
  DECLINED: 'Declined',
  PAYMENT_REQUIRED: 'Payment Required',
  NO_OFFERS: 'No Offers',
};

const descriptions: Record<statuses, string> = {
  NEGOTIATION: 'Your offer is being reviewed by the Seller.',
  NEW_OFFER:
    'Review the offer details and Negotiate or Accept the offer to proceed.',
  PENDING_PAYMENT:
    'The offer has automatically closed due to missed payment.' ||
    'The Buyer needs to process the payment for the accepted offer. ',
  CLOSED: 'Closed',
  FINALISED: 'This offer is now Order #0000-:t0.',
  PAYMENT_MISSED: 'The offer has automatically closed due to missed payment.',
  DECLINED: 'Your offer was declined by the Buyer. ',
  NO_OFFERS: '',
  PAYMENT_REQUIRED:
    'Please process the payment within the remaining time. This offer will atuomatically close if payment is not received.',
};

type types =
  | 'In Negotiation'
  | 'New Offer'
  | 'No Offers'
  | 'Pending Payment'
  | 'Closed'
  | 'Finalised'
  | 'Payment Missed'
  | 'Declined'
  | 'Payment Required';

export const transformMarketRequestStatusText = (
  statusText: types | string,
  isSeller?: boolean,
  stringTokens?: string[]
): {
  variantColor: Variants;
  tagColor: TypographyProps['color'];
  text: string;
  description: string;
  badgeColor?: string;
} => {
  if (statusText === 'Negotiation') {
    if (isSeller) {
      return {
        text: 'Awaiting Buyer',
        description: 'Your offer is being reviewed by the Buyer.',
        tagColor: 'noshade',
        variantColor: 'alert',
        badgeColor: theme.brand.warning,
      };
    }
    return {
      text: 'Awaiting Seller',
      description: 'Your offer is being reviewed by the Seller.',
      tagColor: 'alert',
      variantColor: 'alert',
      badgeColor: '#fffff4',
    };
  }

  if (statusText === 'New Offer') {
    if (isSeller) {
      return {
        text: text.NEW_OFFER,
        description: descriptions.NEW_OFFER,
        tagColor: 'noshade',
        variantColor: 'success',
        badgeColor: theme.brand.success,
      };
    }
    return {
      text: text.NEW_OFFER,
      description: descriptions.NEW_OFFER,
      tagColor: 'success',
      variantColor: 'success',
      badgeColor: '#EAFFF9',
    };
  }

  if (statusText === 'No Offers') {
    return {
      text: text.NO_OFFERS,
      description: text.NO_OFFERS,
      tagColor: 'shade6',
      variantColor: 'info',
      badgeColor: '#E5E9F5',
    };
  }

  if (
    (statusText.includes('Offer') || statusText.includes('Offers')) &&
    !statusText.includes('No')
  ) {
    return {
      text: statusText,
      description: text.NO_OFFERS,
      tagColor: 'shade10',
      variantColor: 'info',
      badgeColor: '#E5E9F5',
    };
  }

  if (statusText === 'Pending Payment' || statusText === 'Payment Required') {
    if (isSeller) {
      return {
        text: text.PENDING_PAYMENT,
        description:
          'The Buyer needs to process the payment for the accepted offer. ',
        tagColor: 'warning',
        variantColor: 'warning',
        badgeColor: '#FFF7F2',
      };
    }

    return {
      text: text.PAYMENT_REQUIRED,
      description: descriptions.PAYMENT_REQUIRED,
      tagColor: 'warning',
      badgeColor: '#FFF7F2',
      variantColor: 'warning',
    };
  }

  if (statusText === 'Payment Missed' || statusText === 'LOST') {
    if (isSeller) {
      return {
        text: 'Lost',
        description:
          'The payment was not processed by the Buyer within the given time frame.We apologise for any inconvenience caused. ',
        tagColor: 'noshade',
        variantColor: 'error',
        badgeColor: theme.brand.error,
      };
    }
    return {
      text: text.PAYMENT_MISSED,
      description: descriptions.PAYMENT_MISSED,
      tagColor: 'error',
      variantColor: 'error',
      badgeColor: '#FFF4F6',
    };
  }

  if (statusText === 'Finalised') {
    if (isSeller) {
      return {
        text: text.FINALISED,
        description: processStringTokens(
          descriptions.FINALISED,
          stringTokens || []
        ),
        tagColor: 'noshade',
        variantColor: 'success',
        badgeColor: theme.brand.success,
      };
    } else {
      return {
        text: text.FINALISED,
        description: processStringTokens(
          descriptions.FINALISED,
          stringTokens || []
        ),
        tagColor: 'success',
        variantColor: 'success',
        badgeColor: '#EAFFF9',
      };
    }
  }

  if (statusText === 'Declined') {
    return {
      text: text.DECLINED,
      description: descriptions.DECLINED,
      tagColor: 'error',
      variantColor: 'error',
    };
  }
  return {
    text: '',
    description: '',
    tagColor: 'secondary',
    variantColor: 'info',
    badgeColor: theme.brand.secondary,
  };
};

function processStringTokens(string: string, tokens: string[]) {
  let output = '';
  tokens.forEach((t, i) => {
    output = string.replace(`:t${i}`, t);
  });
  return output;
}
