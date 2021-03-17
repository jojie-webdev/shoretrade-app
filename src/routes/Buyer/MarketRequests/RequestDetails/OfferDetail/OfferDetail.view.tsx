import React from "react";

import Badge from "components/base/Badge";
import Button from "components/base/Button";
import TypographyView from "components/base/Typography";
import { formatMeasurementUnit } from "utils/Listing/formatMeasurementUnit";
import { useTheme } from "utils/Theme";
import { toPrice } from "utils/String/toPrice";
import { OffersSellerAccordionContent } from "../RequestDetails.view";
import {
  OfferDetailsContainer,
  SellerOfferInteractionContentContainer,
  BadgeText,
  StyledTextField,
  BadgesContainer,
  OfferActionsContainer,
} from "./OfferDetail.style";

const OfferDetailView = (props: any) => {
  const {
    selectedOffer,
    handleStartNegotiotiate,
    company,
    handleAcceptOffer,
    price,
    hideNegotiate,
    deliveryTotal,
    discountPercentage,
    discountValue,
    originalOffer,
    counterOffer,
    noNewCounterOffer,
    newOffer,
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
          style={{ marginBottom: "8px" }}
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
          <OfferBadges label="Size" items={["Ungraded"]} />
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
                {formatMeasurementUnit(selectedOffer?.measurementUnit)}
              </TypographyView>
            }
          />
        </div>
        <div className="footer">
          <div className="computation-container">
            {!noNewCounterOffer ? (
              <>
                <div className="computation-item-container">
                  <TypographyView variant="label" color="shade9">
                    Your offer was
                  </TypographyView>
                  <TypographyView variant="label" weight="bold" color="shade9">
                    {toPrice(counterOffer)}/{selectedOffer?.measurementUnit}
                  </TypographyView>
                </div>
                <div className="computation-item-container">
                  <TypographyView variant="label" color="shade9">
                    Their counter offer is
                  </TypographyView>
                  <TypographyView variant="label" weight="bold" color="shade9">
                    {toPrice(newOffer)}/{selectedOffer?.measurementUnit}
                  </TypographyView>
                </div>
                <div className="computation-item-container">
                  <TypographyView variant="label" color="shade9">
                    Discount Value{" "}
                    <span className="indicator">{discountPercentage}%</span>
                  </TypographyView>
                  {discountValue !== 0 ? (
                    <TypographyView
                      color={
                        Math.sign(discountValue) === 0
                          ? "noshade"
                          : Math.sign(discountValue) === 1
                          ? "success"
                          : "error"
                      }
                      variant="label"
                      weight="bold"
                    >
                      {Math.sign(discountValue) === -1 && "-"}
                      {toPrice(Math.abs(discountValue))}/
                      {selectedOffer?.measurementUnit}
                    </TypographyView>
                  ) : (
                    <TypographyView
                      variant="label"
                      weight="bold"
                      color="shade9"
                    >
                      0
                    </TypographyView>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            <div className="computation-item-container">
              <TypographyView variant="label" color="shade9">
                Total Value
              </TypographyView>
              <TypographyView variant="label" weight="bold" color="shade9">
                {toPrice(deliveryTotal)}
              </TypographyView>
            </div>

            {!noNewCounterOffer ? (
              <div className="computation-item-container">
                <TypographyView variant="label" color="shade9">
                  No counter offer from seller yet
                </TypographyView>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </OfferDetailsContainer>
      <OfferActionsContainer>
        {hideNegotiate ? (
          ""
        ) : (
          <Button
            onClick={() => handleStartNegotiotiate()}
            className="button"
            variant="outline"
            text="Negotiate"
          />
        )}

        <Button
          onClick={() => handleAcceptOffer()}
          className="button"
          variant="primary"
          disabled={selectedOffer.status !== "OPEN"}
          text="Accept"
        />
      </OfferActionsContainer>
    </>
  );
};

export default OfferDetailView;
