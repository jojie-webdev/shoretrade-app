import React from 'react';

import Badge from 'components/base/Badge';
import { TypographyProps } from 'components/base/Typography/Typography.props';
import { getOfferStatus } from 'utils/MarketRequest/offerStatus';
import { useTheme } from 'utils/Theme';

import { OfferTagProps } from './OfferTag.props';
import { Container, StatusBadgeText } from './OfferTag.style';
import { OfferStatus } from 'types/store/GetActiveOffersState';

const OfferTag = (props: OfferTagProps): JSX.Element => {
  const theme = useTheme();
  const { status, price = 0, marketRequestAvgPrice = 0, perspective } = props;
  let offerStatus = '';
  if (status) {
    offerStatus = status.toLocaleUpperCase();
  }
  const renderFirstBadge = (status: string, badgeColor: string) => (
    <Badge
      className="offers-badge"
      badgeColor={badgeColor}
      style={{ marginRight: 10 }}
    >
      <StatusBadgeText color="shade1" weight="bold" variant="overline">
        {status}
      </StatusBadgeText>
    </Badge>
  );

  const renderNegoBadge = () => (
    <Badge className="offers-badge" badgeColor="#fffff4" padding="5px 8px">
      <StatusBadgeText weight="bold" variant="overline" color="alert">
        Negotiation
      </StatusBadgeText>
    </Badge>
  );

  const renderNonNegoBadge = () => {
    const renderBadge = (
      badgeColor: string,
      textColor: TypographyProps['color']
    ) => (
      <Badge id="status-badge" className="offers-badge" badgeColor={badgeColor}>
        <StatusBadgeText color={textColor} weight="bold" variant="overline">
          {offerStatus}
        </StatusBadgeText>
      </Badge>
    );

    if (offerStatus === 'PAYMENT MISSED') {
      return renderBadge('#FFF4F6', 'error');
    }
    if (offerStatus === 'PAYMENT REQUIRED') {
      return renderBadge('#FFF7F2', 'warning');
    }
    if (offerStatus === 'ACCEPTED') {
      return renderBadge('#EAFFF9', 'success');
    }
    if (offerStatus === 'NEW OFFER') {
      return renderBadge('#EAFFF9', 'success');
    }
    if (offerStatus === OfferStatus.DECLINED) {
      return renderBadge('#FFF4F6', 'error');
    }
  };

  const checkIsNonNego = () => {
    const isNonNego =
      offerStatus === 'PAYMENT REQUIRED' ||
      status === 'PAYMENT MISSED' ||
      status === 'ACCEPTED' ||
      status === '' ||
      status === OfferStatus.DECLINED ||
      offerStatus === 'NEW OFFER';

    return isNonNego;
  };

  const renderNegoBadges = () => {
    return (
      <>
        {price
          ? price < marketRequestAvgPrice &&
            renderFirstBadge('Great Value', theme.brand.success)
          : ''}
        {price
          ? price > marketRequestAvgPrice &&
            renderFirstBadge('Above Market', theme.brand.error)
          : ''}
        {renderNegoBadge()}
      </>
    );
  };

  return (
    <Container>
      <div>{checkIsNonNego() ? renderNonNegoBadge() : renderNegoBadges()}</div>
    </Container>
  );
};

export default React.memo(OfferTag);
