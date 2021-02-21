import React from 'react';

import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import TypographyView from 'components/base/Typography';
import OrderItemView from 'components/module/OrderItem';
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
  const { specs, handleStartNegotiotiate } = props;
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
            sellerLocation="Manila"
            image={'http://placekitten.com/64/64'}
            sellerName="Manny Pacquiao"
            sellerId={'1'}
            sellerRating={'4'}
          />
        </SellerOfferInteractionContentContainer>
        {/* MOCK */}
        <OfferBadges label="Specs" items={['Frozen', 'Fresh']} />
        <OfferBadges label="Sizes" items={['Medium', 'Large']} />
        <div className="sizes-container">
          <StyledTextField
            type="number"
            label="From"
            value={100}
            disabled
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                kg
              </TypographyView>
            }
          />
          <StyledTextField
            type="number"
            label="To"
            value={100}
            disabled
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                kg
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
              $ {'19000'}
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
