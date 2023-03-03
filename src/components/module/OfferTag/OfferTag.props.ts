import { Variants } from 'components/base/Alert/Alert.props';
import { TypographyProps } from 'components/base/Typography/Typography.props';
import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';
import { Theme } from 'types/Theme';

export interface OfferTagProps {
  text: string;
  badgeColor: string;
  variantColor: Variants;
  color?: TypographyProps['color'];
  textStyle?: TypographyProps['style'];
}
