import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography/Typography.view';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview/CategoryImagePreview.view';
import NegotiateModal from 'components/module/NegotiateModal';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { isEmpty } from 'ramda';
import { useHistory, useLocation } from 'react-router-dom';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import theme from 'utils/Theme';

import MakeOffer from './MakeOffer';
import { MakeOfferProps } from './MakeOffer/MakeOffer.props';
import {
  RequestAndNegotiateGeneratedProps,
  Step1Props,
} from './RequestAndNegotiate.props';
import {
  SummaryContentContainer,
  Container,
  BadgesContainer,
  BadgeText,
} from './RequestAndNegotiate.style';
import ReviewOffer from './ReviewOffer';
import { ReviewOfferProps } from './ReviewOffer/ReviewOffer.props';

const Step1 = ({ isReview, buyerRequest, ...props }: Step1Props) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);

  const discountValue = 1.5;

  const SummaryBadges = (badgeProps: { items: string[]; label: string }) => {
    const { items, label } = badgeProps;

    if (isEmpty(items)) return <></>;

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
      <div>
        <Typography
          style={{ marginBottom: '8px' }}
          color="shade6"
          variant="overline"
        >
          {label}
        </Typography>
        <BadgesContainer>{tagsMarkup}</BadgesContainer>
      </div>
    );
  };

  return (
    <>
      <div className="step-1-container">
        <CategoryImagePreviewView
          categoryName={buyerRequest.type}
          imgSrc={buyerRequest.image}
        />

        <SummaryContentContainer>
          <SummaryBadges
            label="Specs"
            items={buyerRequest.specifications.map((v) => v.stateName)}
          />
          {!isEmpty(buyerRequest.sizeOptions) ? (
            <SummaryBadges label="Sizes" items={buyerRequest.sizeOptions} />
          ) : (
            <>
              <Typography
                style={{ marginBottom: '16px' }}
                color="shade6"
                variant="overline"
              >
                Size
              </Typography>

              <div className="quantity-container">
                <TextField
                  className="text-field"
                  type="number"
                  label="From"
                  value={buyerRequest.sizeFrom || 0}
                  disabled
                  LeftComponent={
                    <Typography variant="label" weight="bold" color="shade6">
                      {formatMeasurementUnit(buyerRequest.measurementUnit)}
                    </Typography>
                  }
                />
                <TextField
                  className="text-field"
                  type="number"
                  label="To"
                  value={buyerRequest.sizeTo || 0}
                  disabled
                  LeftComponent={
                    <Typography variant="label" weight="bold" color="shade6">
                      {formatMeasurementUnit(buyerRequest.measurementUnit)}
                    </Typography>
                  }
                />
              </div>
            </>
          )}
          <Typography
            style={{ margin: '16px 0' }}
            color="shade6"
            variant="overline"
          >
            Weight
          </Typography>
          <div className="quantity-container">
            <TextField
              className="text-field"
              type="number"
              label="From"
              value={buyerRequest.weight?.from || 0}
              disabled
              LeftComponent={
                <Typography variant="label" weight="bold" color="shade6">
                  {formatMeasurementUnit(buyerRequest.measurementUnit)}
                </Typography>
              }
            />
            <TextField
              className="text-field"
              type="number"
              label="To"
              value={buyerRequest.weight?.to || 0}
              disabled
              LeftComponent={
                <Typography variant="label" weight="bold" color="shade6">
                  {formatMeasurementUnit(buyerRequest.measurementUnit)}
                </Typography>
              }
            />
          </div>

          {!isReview && (
            <div className="offer-container">
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Your offer was
                </Typography>
                <Typography variant="label" weight="bold" color="noshade">
                  {'$'}
                  {'24'}/{'kg'}
                </Typography>
              </div>
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Your counter offer is
                </Typography>
                <Typography variant="label" color="noshade" weight="bold">
                  {'$'}
                  {'48'}/{'kg'}
                </Typography>
              </div>
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Discount Value <span className="indicator">{'0.5%'}</span>
                </Typography>
                {/*
                //@ts-ignore*/}
                {discountValue !== 0 ? (
                  <Typography
                    color={discountValue > 0 ? 'success' : 'error'}
                    variant="label"
                    weight="bold"
                  >
                    {'$'}
                    {discountValue > 0 ? '-' : '+'}
                    {Math.abs(discountValue)}/{'kg'}
                  </Typography>
                ) : (
                  <Typography variant="label" weight="bold" color="noshade">
                    0
                  </Typography>
                )}
              </div>
              <div className="computation-item-container">
                <Typography variant="label" color="noshade">
                  Original offer was
                </Typography>
                <Typography variant="label" color="noshade" weight="bold">
                  {'$'}
                  {'1800'}/{'kg'}
                </Typography>
              </div>
            </div>
          )}

          <div className="submit-btns">
            {!isReview ? (
              <>
                <Button
                  onClick={() => setIsOpen(true)}
                  className="submit-btn"
                  text="Negotiate"
                  variant="outline"
                />
                <Button
                  onClick={() =>
                    history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING)
                  }
                  className="submit-btn"
                  text="accept"
                  variant="primary"
                />
              </>
            ) : (
              <Button
                onClick={() => props.setStep && props.setStep(2)}
                className="submit-btn"
                text="Make an offer"
                variant="primary"
              />
            )}
          </div>
        </SummaryContentContainer>
      </div>

      <NegotiateModal
        onSubmit={() => history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING)}
        offerId="2"
        negotiationId="1"
        originalOffer={1}
        weight={{
          unit: 'kg',
          value: 100,
        }}
        isOpen={isOpen}
        onClickClose={() => setIsOpen(false)}
      />
    </>
  );
};

const Step2 = (props: MakeOfferProps) => {
  return <MakeOffer {...props} />;
};

const Step3 = (props: ReviewOfferProps) => {
  return <ReviewOffer {...props} />;
};

const RequestAndNegotiateView = (props: RequestAndNegotiateGeneratedProps) => {
  const location = useLocation();
  const { pathname } = location;
  const isReview = pathname.includes(SELLER_MARKET_BOARD_ROUTES.OFFER);

  const [step, setStep] = useState(1);

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Market Board', link: SELLER_MARKET_BOARD_ROUTES.LANDING },
            {
              label: isReview ? 'Review Request' : 'Negotiate',
              ...(step >= 2 ? { onClick: () => setStep(1) } : {}),
            },
            ...(step === 2 ? [{ label: 'Make an Offer' }] : []),
            ...(step === 3
              ? [
                  { label: 'Make an Offer', onClick: () => setStep(2) },
                  { label: 'Review Offer' },
                ]
              : []),
          ]}
        />
      </div>

      {step === 1 && <Step1 setStep={setStep} isReview={isReview} {...props} />}
      {step === 2 && <Step2 setStep={setStep} {...props} />}
      {step === 3 && <Step3 setStep={setStep} {...props} />}
    </Container>
  );
};

export default RequestAndNegotiateView;
