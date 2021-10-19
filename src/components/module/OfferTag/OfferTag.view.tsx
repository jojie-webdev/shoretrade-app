import React from 'react';

import Badge from 'components/base/Badge';
import { TypographyProps } from 'components/base/Typography/Typography.props';
import { getOfferStatus } from 'utils/MarketRequest/offerStatus';
import { useTheme } from 'utils/Theme';

import { OfferTagProps } from './OfferTag.props';
import { Container, StatusBadgeText } from './OfferTag.style';

const OfferTag = (props: OfferTagProps): JSX.Element => {
  const theme = useTheme();
  const { offer, marketRequestAvgPrice = 0, perspective } = props;
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
    const offerStatus = getOfferStatus(offer, perspective);

    const renderBadge = (
      status: string,
      badgeColor: string,
      textColor: TypographyProps['color']
    ) => (
      <Badge id="status-badge" className="offers-badge" badgeColor={badgeColor}>
        <StatusBadgeText color={textColor} weight="bold" variant="overline">
          {status}
        </StatusBadgeText>
      </Badge>
    );

    if (offerStatus === 'PAYMENT MISSED') {
      return renderBadge('PAYMENT MISSED', '#FFF4F6', 'error');
    }
    if (offerStatus === 'PAYMENT REQUIRED') {
      return renderBadge('PAYMENT REQUIRED', '#FFF7F2', 'warning');
    }
    if (offerStatus === 'ACCEPTED') {
      return renderBadge('FINALISED', '#EAFFF9', 'success');
    }
    if (offerStatus === 'NEW OFFER') {
      return renderBadge('NEW OFFER', '#EAFFF9', 'success');
    }
  };

  const checkIsNonNego = () => {
    const offerStatus = getOfferStatus(offer, perspective);
    const isNonNego =
      offerStatus === 'PAYMENT REQUIRED' ||
      offerStatus === 'PAYMENT MISSED' ||
      offerStatus === 'ACCEPTED' ||
      offerStatus === 'NEW OFFER';

    return isNonNego;
  };

  const renderNegoBadges = () => (
    <>
      {offer.price < marketRequestAvgPrice ||
        (0 && renderFirstBadge('Great Value', theme.brand.success))}
      {offer.price > marketRequestAvgPrice ||
        (0 && renderFirstBadge('Above Market', theme.brand.error))}
      {renderNegoBadge()}
    </>
  );

  return (
    <Container>
      <div>{checkIsNonNego() ? renderNonNegoBadge() : renderNegoBadges()}</div>
    </Container>
  );
};

export default React.memo(OfferTag);
