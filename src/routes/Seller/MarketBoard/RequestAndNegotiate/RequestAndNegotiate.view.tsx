import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography/Typography.view';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview/CategoryImagePreview.view';
import ConfirmationModal from 'components/module/ConfirmationModal';
import NegotiateModal from 'components/module/NegotiateModal';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { isEmpty, pathOr } from 'ramda';
import { useHistory } from 'react-router-dom';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';
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

const Step1 = ({
  isReview,
  buyerRequest,
  activeOffer,
  ...props
}: Step1Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const unit = formatMeasurementUnit(
    isReview ? buyerRequest.measurementUnit : activeOffer.measurementUnit
  );
  const noNegotiations = isReview ? true : isEmpty(activeOffer.negotiations);
  const isNegoOpen = isReview ? false : activeOffer.status === 'OPEN';

  const getSizeBadge = () => {
    if (buyerRequest && !isEmpty(buyerRequest.sizeOptions)) {
      return buyerRequest.sizeOptions;
    }

    const sizeFrom = pathOr(null, ['size', 'from'], activeOffer);
    if (activeOffer) {
      if (sizeFrom === null) {
        return ['Ungraded'];
      } else if (isNaN(parseFloat(sizeFrom))) {
        return [activeOffer.size?.from || ''];
      }
    }

    return [];
  };

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

  const Negotiations = ({
    activeOffer,
  }: {
    activeOffer: Step1Props['activeOffer'];
  }) => {
    if (isReview) return <></>;
    if (noNegotiations || !isNegoOpen) {
      return (
        <div className="offer-container">
          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Your original offer
            </Typography>
            <Typography variant="label" weight="bold" color="noshade">
              {toPrice(activeOffer.price)}/{unit}
            </Typography>
          </div>

          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Total Value
            </Typography>
            <Typography variant="label" weight="bold" color="noshade">
              {toPrice(activeOffer.price * activeOffer.weight)}
            </Typography>
          </div>

          {isNegoOpen && (
            <div className="computation-item-container">
              <Typography variant="label" color="noshade">
                No counter offer from buyer yet
              </Typography>
            </div>
          )}
        </div>
      );
    }

    const negoCopy = [...activeOffer.negotiations];
    const negotiations = negoCopy.reverse();
    const buyerNego = negotiations.find((n) => n.type === 'COUNTER_OFFER');
    const sellerNego = negotiations.find((n) => n.type === 'NEW_OFFER');

    const sellerOffer = sellerNego?.price || activeOffer.price;
    const buyerCounterOffer = buyerNego?.price || 0;

    const discountValue = buyerCounterOffer - sellerOffer;
    const discountPercentage = discountValue
      ? (
          (discountValue /
            (buyerCounterOffer === 0 ? sellerOffer : buyerCounterOffer)) *
          100
        ).toFixed(2)
      : 0;

    const deliveryTotal = sellerOffer * activeOffer.weight;

    return (
      <>
        <div className="offer-container">
          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Your offer was
            </Typography>
            <Typography variant="label" weight="bold" color="noshade">
              {toPrice(sellerOffer)}/{unit}
            </Typography>
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Their counter offer is
            </Typography>
            <Typography variant="label" color="noshade" weight="bold">
              {toPrice(buyerCounterOffer)}/{unit}
            </Typography>
          </div>

          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Change in Price{' '}
              <span className="indicator">{discountPercentage}%</span>
            </Typography>
            {discountValue !== 0 ? (
              <Typography
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
                {toPrice(Math.abs(discountValue))}/{unit}
              </Typography>
            ) : (
              <Typography variant="label" weight="bold" color="noshade">
                0
              </Typography>
            )}
          </div>
          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Total Value
            </Typography>
            <Typography variant="label" color="noshade" weight="bold">
              {toPrice(deliveryTotal)}
            </Typography>
          </div>
        </div>

        <div className="submit-btns">
          {!isReview && !noNegotiations && isNegoOpen && (
            <>
              <Button
                onClick={() => setIsOpen(true)}
                className="submit-btn"
                text="Negotiate"
                variant="outline"
              />
              <Button
                loading={props.isNegotiating}
                onClick={() =>
                  props.onNegotiateOffer(
                    activeOffer.id,
                    buyerCounterOffer,
                    true
                  )
                }
                className="submit-btn"
                text="accept"
                variant="primary"
              />
            </>
          )}
        </div>

        <NegotiateModal
          originalOffer={buyerCounterOffer}
          counterOffer={sellerOffer}
          weight={{
            unit: unit,
            value: activeOffer.weight,
          }}
          isOpen={isOpen}
          onClickClose={() => setIsOpen(false)}
          isNegotiating={props.isNegotiating}
          onSubmit={(counterOffer) =>
            props.onNegotiateOffer(activeOffer.id, counterOffer)
          }
        />
      </>
    );
  };

  return (
    <>
      <div className="step-1-container">
        <CategoryImagePreviewView
          categoryName={isReview ? buyerRequest.type : activeOffer.name}
          imgSrc={isReview ? buyerRequest.image : activeOffer.image}
        />

        <SummaryContentContainer>
          <SummaryBadges
            label="Specs"
            items={
              isReview
                ? buyerRequest.specifications.map((v) => v.stateName)
                : activeOffer.specifications
            }
          />
          {!isEmpty(getSizeBadge()) ? (
            <SummaryBadges label="Sizes" items={getSizeBadge()} />
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
                  label={isReview ? 'From' : ''}
                  value={
                    isReview
                      ? buyerRequest.sizeFrom || 0
                      : activeOffer.size.from || 0
                  }
                  disabled
                  LeftComponent={
                    <Typography variant="label" weight="bold" color="shade6">
                      {unit}
                    </Typography>
                  }
                />

                {isReview && (
                  <TextField
                    className="text-field"
                    type="number"
                    label="To"
                    value={buyerRequest.sizeTo || 0}
                    disabled
                    LeftComponent={
                      <Typography variant="label" weight="bold" color="shade6">
                        {unit}
                      </Typography>
                    }
                  />
                )}
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
              label={isReview ? 'From' : ''}
              value={
                isReview
                  ? buyerRequest.weight?.from || 0
                  : activeOffer.weight || 0
              }
              disabled
              LeftComponent={
                <Typography variant="label" weight="bold" color="shade6">
                  {unit}
                </Typography>
              }
            />

            {isReview && (
              <TextField
                className="text-field"
                type="number"
                label="To"
                value={buyerRequest.weight?.to || 0}
                disabled
                LeftComponent={
                  <Typography variant="label" weight="bold" color="shade6">
                    {unit}
                  </Typography>
                }
              />
            )}
          </div>

          <Negotiations activeOffer={activeOffer} />

          {isReview && (
            <div className="submit-btns">
              <Button
                onClick={() => props.setStep && props.setStep(2)}
                className="submit-btn"
                text="Make an offer"
                variant="primary"
              />
            </div>
          )}
        </SummaryContentContainer>
      </div>
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
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            {
              label: 'Market Board',
              onClick: () => {
                if (!isEmpty(props.offer)) {
                  setIsOpen(true);
                } else if (props.isReview) {
                  history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
                } else {
                  history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING, {
                    currentTab: 'My Active Offers',
                  });
                }
              },
            },
            {
              label: props.isReview ? 'Review Request' : 'Negotiate',
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

      {step === 1 && <Step1 setStep={setStep} {...props} />}
      {step === 2 && <Step2 setStep={setStep} {...props} />}
      {step === 3 && <Step3 setStep={setStep} {...props} />}

      <ConfirmationModal
        isOpen={isOpen}
        title="Clear Current Offer"
        description="Are you sure you want to clear current offer?"
        action={() => {
          props.setOffer([]);
          props.setCurrentOfferItem('');
          setIsOpen(false);
          history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
        }}
        actionText="Clear"
        onClickClose={() => setIsOpen(false)}
      />
    </Container>
  );
};

export default RequestAndNegotiateView;
