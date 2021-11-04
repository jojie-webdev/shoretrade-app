import React from 'react';

import Badge from 'components/base/Badge';
import { TypographyProps } from 'components/base/Typography/Typography.props';
import { OfferStatus } from 'types/store/GetActiveOffersState';
import { getOfferStatus } from 'utils/MarketRequest/offerStatus';
import { useTheme } from 'utils/Theme';

import { OfferTagProps } from './OfferTag.props';
import { Container, StatusBadgeText } from './OfferTag.style';

const OfferTag = (props: OfferTagProps): JSX.Element => {
  const theme = useTheme();
  const { text, badgeColor, color, variantColor } = props;

  // const renderNegoBadges = () => {
  //   return (
  //     <>
  //       {price
  //         ? price < marketRequestAvgPrice &&
  //           renderFirstBadge('Great Value', theme.brand.success)
  //         : ''}
  //       {price
  //         ? price > marketRequestAvgPrice &&
  //           renderFirstBadge('Above Market', theme.brand.error)
  //         : ''}
  //       {!isMarketRequest && renderNegoBadge()}
  //     </>
  //   );
  // };

  return (
    <Container>
      <Badge id="status-badge" className="offers-badge" badgeColor={badgeColor}>
        <StatusBadgeText color={color} variant="overlineSmall">
          {text}
        </StatusBadgeText>
      </Badge>
    </Container>
  );
};

export default React.memo(OfferTag);
