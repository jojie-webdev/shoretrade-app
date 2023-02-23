import React from 'react';

import Badge from 'components/base/Badge';
// import { useTheme } from 'utils/Theme';
import { Variants } from 'components/base/Typography/Typography.props';

import { OfferTagProps } from './OfferTag.props';
import { Container, StatusBadgeText } from './OfferTag.style';

const OfferTag = (props: OfferTagProps): JSX.Element => {
  // const theme = useTheme();
  const { text, badgeColor, color, textStyle } = props;

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

  const variant = 'overlineSmall' as Variants;
  const statusBadgeTextProps = !textStyle
    ? {
        variant,
      }
    : {};

  return (
    <Container>
      <Badge id="status-badge" className="offers-badge" badgeColor={badgeColor}>
        <StatusBadgeText
          color={color}
          {...statusBadgeTextProps}
          style={textStyle}
        >
          {text}
        </StatusBadgeText>
      </Badge>
    </Container>
  );
};

export default React.memo(OfferTag);
