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
  const {
    status,
    price = 0,
    marketRequestAvgPrice = 0,
    perspective,
    marketStatus,
    offers,
    isMarketRequest,
  } = props;
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
      textColor: TypographyProps['color'],
      showCount?: boolean
    ) => (
      <Badge id="status-badge" className="offers-badge" badgeColor={badgeColor}>
        <StatusBadgeText color={textColor} weight="bold" variant="overline">
          {showCount
            ? `${offers || 'No'} ${offers === 1 ? 'offer' : 'offers'}`
            : offerStatus}
        </StatusBadgeText>
      </Badge>
    );

    if (offerStatus === 'PAYMENT MISSED' && !isMarketRequest) {
      return renderBadge('#FFF4F6', 'error');
    }
    if (
      offerStatus === 'PAYMENT REQUIRED' ||
      offerStatus === OfferStatus.PENDING_PAYMENT
    ) {
      if (perspective === 'buyer') {
        offerStatus = OfferStatus.PAYMENT_REQUIRED;
      }
      return renderBadge('#FFF7F2', 'warning');
    }
    if (offerStatus === 'ACCEPTED' && !isMarketRequest) {
      offerStatus = OfferStatus.FINALISED;
      return renderBadge('#EAFFF9', 'success');
    }
    if (offerStatus === 'NEW OFFER') {
      return renderBadge('#EAFFF9', 'success');
    }
    if (offerStatus === OfferStatus.DECLINED && !isMarketRequest) {
      return renderBadge('#FFF4F6', 'error');
    }

    if (
      offerStatus === OfferStatus.FINALISED ||
      offerStatus === '' ||
      offerStatus === OfferStatus.NEGOTIATION
    ) {
      if (marketStatus && marketStatus.toUpperCase() === OfferStatus.OPEN) {
        return renderBadge(
          theme.grey.shade3,
          !offers || offers === 0 ? 'shade5' : 'shade9',
          true
        );
      }
    }
  };

  const checkIsNonNego = () => {
    if (offerStatus === OfferStatus.NEGOTIATION) {
      if (isMarketRequest) {
        return true;
      }
      return false;
      // return offerStatus !== OfferStatus.NEGOTIATION;
    }
    return true;
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
        {!isMarketRequest && renderNegoBadge()}
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
