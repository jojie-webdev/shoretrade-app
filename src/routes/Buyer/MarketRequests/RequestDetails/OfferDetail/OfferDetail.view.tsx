import React from 'react';

import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import TypographyView from 'components/base/Typography';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
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
    price,
    hideNegotiate,
    deliveryTotal,
    discountPercentage,
    discountValue,
    originalOffer,
    counterOffer,
    thereIsNewOffer,
    newOffer,
    disableAccept,
    isAccepted,
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
                {formatMeasurementUnit(
                  formatMeasurementUnit(selectedOffer?.measurementUnit)
                )}
              </TypographyView>
            }
          />
        </div>
        <div className="footer">
          <div className="computation-container">
            <div className="computation-item-container">
              <TypographyView variant="label" color="shade9">
                Seller&apos;s original offer
              </TypographyView>
              <TypographyView variant="label" weight="bold" color="shade9">
                {toPrice(selectedOffer?.price)}/
                {formatMeasurementUnit(selectedOffer?.measurementUnit)}
              </TypographyView>
            </div>
            {counterOffer !== 0 && (
              <div className="computation-item-container">
                <TypographyView variant="label" color="shade9">
                  Your counter offer is
                </TypographyView>
                <TypographyView variant="label" weight="bold" color="shade9">
                  {toPrice(counterOffer)}/
                  {formatMeasurementUnit(selectedOffer?.measurementUnit)}
                </TypographyView>
              </div>
            )}
            {thereIsNewOffer && (
              <>
                <div className="computation-item-container">
                  <TypographyView variant="label" color="shade9">
                    New offer is
                  </TypographyView>
                  <TypographyView variant="label" weight="bold" color="shade9">
                    {toPrice(newOffer)}/
                    {formatMeasurementUnit(selectedOffer?.measurementUnit)}
                  </TypographyView>
                </div>
              </>
            )}
            <div className="computation-item-container">
              <TypographyView variant="label" color="shade9">
                Change in Price{' '}
                <span className="indicator">{discountPercentage}%</span>
              </TypographyView>
              {discountValue !== 0 ? (
                <TypographyView
                  color={
                    Math.sign(discountValue) === 0
                      ? 'noshade'
                      : Math.sign(discountValue) === 1
                      ? 'success'
                      : 'error'
                  }
                  variant="label"
                  weight="bold"
                >
                  {Math.sign(discountValue) === -1 && '-'}
                  {toPrice(Math.abs(discountValue))}/
                  {formatMeasurementUnit(selectedOffer?.measurementUnit)}
                </TypographyView>
              ) : (
                <TypographyView variant="label" weight="bold" color="shade9">
                  0
                </TypographyView>
              )}
            </div>
            <div className="computation-item-container">
              <TypographyView variant="label" color="shade9">
                Total Value
              </TypographyView>
              <TypographyView variant="label" weight="bold" color="shade9">
                {toPrice(deliveryTotal)}
              </TypographyView>
            </div>

            {!isAccepted && (
              <>
                {!thereIsNewOffer && counterOffer === 0 && newOffer === 0 && (
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

                {!thereIsNewOffer && counterOffer > 0 && (
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
