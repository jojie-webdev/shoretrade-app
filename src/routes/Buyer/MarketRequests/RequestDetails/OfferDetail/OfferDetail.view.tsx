import React from 'react';

import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import TypographyView from 'components/base/Typography';
import { Item } from 'components/module/LocationSearch/LocationSearch.style';
import OrderItemView from 'components/module/OrderItem';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { OffersSellerAccordionContent } from '../RequestDetails.view';
import {
  OfferDetailsContainer,
  SellerOfferInteractionContentContainer,
  BadgeText,
  StyledTextField,
  BadgesContainer,
  OfferActionsContainer,
} from './OfferDetail.style';

const OfferDetailView = (props: any) => {
  const { selectedOffer, handleStartNegotiotiate, company } = props;
  const theme = useTheme();

  const OfferBadges = (props: { items: string[]; label: string }) => {
    const { items, label } = props;

    if (!items) return <></>;

    const tagsMarkup = items.map((item) => (
      <Badge
        key={item}
        className="offers-state-badge"
        badgeColor={theme.grey.shade3}
      >
        <BadgeText color="shade8" weight="bold" variant="overline">
          {item}
        </BadgeText>
      </Badge>
    ));

    return (
      <div className="offer-badges">
        <TypographyView
          style={{ marginBottom: '8px' }}
          color="shade6"
          variant="overline"
        >
          {label}
        </TypographyView>
        <BadgesContainer>{tagsMarkup}</BadgesContainer>
      </div>
    );
  };

  return (
    <>
      <OfferDetailsContainer>
        <SellerOfferInteractionContentContainer>
          <OffersSellerAccordionContent
            sellerLocation={company?.address?.countryCode}
            image={company.image}
            sellerName={company.name}
            sellerId={company.id}
            sellerRating={company.rating}
          />
        </SellerOfferInteractionContentContainer>
        {/* MOCK */}
        <OfferBadges label="Specs" items={selectedOffer.specifications} />
        <OfferBadges label="Sizes" items={[selectedOffer.size.from]} />
        <div className="sizes-container">
          <StyledTextField
            type="number"
            label="From"
            value={selectedOffer.weight}
            disabled
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                {formatMeasurementUnit(selectedOffer.measurementUnit)}
              </TypographyView>
            }
          />
          <StyledTextField
            type="number"
            label="To"
            value={selectedOffer.weight}
            disabled
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                {formatMeasurementUnit(selectedOffer.measurementUnit)}
              </TypographyView>
            }
          />
        </div>
        <div className="footer">
          <div className="total-value-container">
            <TypographyView color="shade6" variant="body">
              Total Value Including Delivery
            </TypographyView>
            <TypographyView weight="bold" color="shade9" variant="body">
              $ {'-----'}
              {/* TODO */}
            </TypographyView>
          </div>
        </div>
      </OfferDetailsContainer>
      <OfferActionsContainer>
        <Button
          onClick={() => handleStartNegotiotiate()}
          className="button"
          variant="outline"
          text="Negotiate"
        />
        <Button className="button" variant="primary" text="Accept" />
      </OfferActionsContainer>
    </>
  );
};

export default OfferDetailView;
