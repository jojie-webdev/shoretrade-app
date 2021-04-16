import React from 'react';

import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import TypographyView from 'components/base/Typography';
import { BUYER_ROUTES } from 'consts';
import { useHistory } from 'react-router';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toOrdinalSuffix } from 'utils/String/toOrdinalSuffix';
import { toPrice } from 'utils/String/toPrice';
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
  const {
    selectedOffer,
    handleStartNegotiate,
    company,
    handleAcceptOffer,
    hideNegotiate,
    deliveryTotal,
    discountPercentage,
    discountValue,
    counterOffer,
    thereIsNewOffer,
    newOffer,
    disableAccept,
    isAccepted,
    sortedNegotiations,
    lastNegotiationsOffers,
  } = props;
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

  if (!selectedOffer) {
    return <></>;
  }

  const unit = formatMeasurementUnit(selectedOffer.measurementUnit);

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
        <OfferBadges label="Specs" items={selectedOffer?.specifications} />
        {selectedOffer.size.from ? (
          <OfferBadges label="Size" items={[selectedOffer?.size?.from]} />
        ) : (
          <OfferBadges label="Size" items={['Ungraded']} />
        )}

        <div className="sizes-container">
          <StyledTextField
            type="number"
            label="From"
            value={selectedOffer.weight}
            disabled
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                {unit}
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
                {unit}
              </TypographyView>
            }
          />
        </div>
        <div className="footer">
          <div className="computation-container">
            {sortedNegotiations.length === 0 && (
              <div className="computation-item-container">
                <TypographyView variant="label" color="shade9">
                  {`Seller's Current Offer`}
                </TypographyView>
                <TypographyView variant="label" weight="bold" color="shade9">
                  {toPrice(selectedOffer?.price)}/{unit}
                </TypographyView>
              </div>
            )}

            {counterOffer !== '' && sortedNegotiations.length <= 1 && (
              <div className="computation-item-container">
                <TypographyView variant="label" color="shade9">
                  Your Offer
                </TypographyView>
                <TypographyView variant="label" weight="bold" color="shade9">
                  {toPrice(counterOffer)}/{unit}
                </TypographyView>
              </div>
            )}

            {sortedNegotiations.length !== 0 &&
              sortedNegotiations.length >= 2 &&
              lastNegotiationsOffers.map((offer: any) => {
                return (
                  <div key={offer.id} className="computation-item-container">
                    <TypographyView variant="label" color="shade9">
                      {`${
                        offer.type === 'COUNTER_OFFER'
                          ? `Your ${
                              sortedNegotiations[sortedNegotiations.length - 1]
                                .type === 'COUNTER_OFFER'
                                ? ''
                                : 'Previous '
                            }`
                          : `Seller's ${
                              sortedNegotiations[sortedNegotiations.length - 1]
                                .type === 'NEW_OFFER'
                                ? 'Current '
                                : 'Previous '
                            }`
                      }Offer `}
                    </TypographyView>
                    <TypographyView
                      variant="label"
                      weight="bold"
                      color="shade9"
                    >
                      {toPrice(offer.price)}/{unit}
                    </TypographyView>
                  </div>
                );
              })}
            {sortedNegotiations.length > 0 && (
              <div className="computation-item-container">
                <TypographyView variant="label" color="shade9">
                  Change in Price{' '}
                  <span className="indicator">{discountPercentage}%</span>
                </TypographyView>
                {discountValue !== 0 ? (
                  <TypographyView
                    color={discountValue < 0 ? 'error' : 'success'}
                    variant="label"
                    weight="bold"
                  >
                    {toPrice(discountValue)}/{unit}
                  </TypographyView>
                ) : (
                  <TypographyView variant="label" weight="bold" color="shade9">
                    0
                  </TypographyView>
                )}
              </div>
            )}

            <div className="computation-item-container border-bottom">
              <TypographyView variant="label" color="shade9">
                Total Value
              </TypographyView>
              <TypographyView variant="label" weight="bold" color="shade9">
                {toPrice(deliveryTotal)}
              </TypographyView>
            </div>

            {!isAccepted && (
              <>
                {!thereIsNewOffer && counterOffer === '' && (
                  <div className="computation-item-container">
                    <TypographyView variant="label" color="shade9">
                      You have received an offer by the Seller. Either click
                      accept or negotiate to proceed.
                    </TypographyView>
                  </div>
                )}

                {thereIsNewOffer && counterOffer === newOffer && (
                  <div className="computation-item-container">
                    <TypographyView variant="label" color="shade9">
                      You have received an offer by the Seller. Either click
                      accept or negotiate to proceed.
                    </TypographyView>
                  </div>
                )}

                {!thereIsNewOffer && parseFloat(counterOffer) > 0 && (
                  <div className="computation-item-container">
                    <TypographyView variant="label" color="shade9">
                      The seller is reviewing your offer.
                    </TypographyView>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </OfferDetailsContainer>
      <OfferActionsContainer>
        {!hideNegotiate && (
          <Button
            onClick={() => handleStartNegotiate()}
            className="button"
            variant="outline"
            text="Negotiate"
          />
        )}

        {!isAccepted && (
          <Button
            onClick={() => handleAcceptOffer()}
            className="button"
            variant="primary"
            disabled={disableAccept}
            text="Accept"
          />
        )}
      </OfferActionsContainer>
    </>
  );
};

export default OfferDetailView;
