import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography/Typography.view';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview/CategoryImagePreview.view';
import ConfirmationModal from 'components/module/ConfirmationModal';
import NegotiateSellerModal from 'components/module/NegotiateSellerModal';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import moment from 'moment';
import { isEmpty, pathOr, sortBy } from 'ramda';
import { useHistory } from 'react-router-dom';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toOrdinalSuffix } from 'utils/String/toOrdinalSuffix';
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
  userPending,
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
                The buyer is reviewing your offer.
              </Typography>
            </div>
          )}
        </div>
      );
    }

    const negoCopy = [...activeOffer.negotiations];
    const sortByDate = sortBy(
      (data: { created_at: string }) => data.created_at
    );
    const negotiations = sortByDate(negoCopy);
    const acceptedOffer = negotiations.find((a) => a.is_accepted);
    const sellerNegos = negotiations.filter((n) => n.type === 'NEW_OFFER');
    const buyerNegos = negotiations.filter((n) => n.type === 'COUNTER_OFFER');

    const latestSellerNego = sellerNegos.slice(-1)[0];
    const latestBuyerNego = buyerNegos.slice(-1)[0];
    const currentOfferPrice =
      acceptedOffer?.price || latestSellerNego?.price || activeOffer.price;

    const discountValue = currentOfferPrice - (latestBuyerNego?.price || 0);
    const discountPercentage = (
      (discountValue / currentOfferPrice) *
      100
    ).toFixed(2);

    const actualPrice =
      activeOffer.status === 'ACCEPTED'
        ? acceptedOffer?.price || currentOfferPrice
        : latestBuyerNego?.price || currentOfferPrice;
    const totalValue = actualPrice * activeOffer.weight;

    const latestNewOfferDate = latestSellerNego
      ? moment(latestSellerNego.created_at).toDate()
      : undefined;
    const latestCounterOfferDate = latestBuyerNego
      ? moment(latestBuyerNego.created_at).toDate()
      : undefined;
    const isNegotiationAllowed =
      (latestNewOfferDate &&
        latestCounterOfferDate &&
        latestCounterOfferDate > latestNewOfferDate) ||
      (latestBuyerNego && !latestNewOfferDate);

    const isNegotiationEqual =
      latestSellerNego &&
      latestBuyerNego &&
      latestSellerNego.price === latestBuyerNego.price;

    const lastNegotiationsArray = negotiations.slice(
      Math.max(negotiations.length - (negotiations.length >= 3 ? 2 : 1), 0)
    );

    const modalLastNegotiationsArray = negotiations.slice(
      Math.max(negotiations.length - (negotiations.length >= 3 ? 2 : 1), 0)
    );

    sellerNegos.map((off, index) => {
      const find = lastNegotiationsArray.find((ltn) => off.id === ltn.id);
      const findModal = modalLastNegotiationsArray.find(
        (ltn) => off.id === ltn.id
      );
      if (find !== undefined) {
        if (index === 0) {
          find.ordinal = index + 2;
        } else {
          find.ordinal = index + 1;
        }
      }
      if (findModal !== undefined) {
        if (index === 0) {
          findModal.ordinal = index + 2;
        } else {
          findModal.ordinal = index + 1;
        }
      }
    });

    buyerNegos.map((off, index) => {
      const find = lastNegotiationsArray.find((ltn) => off.id === ltn.id);
      const findModal = modalLastNegotiationsArray.find(
        (ltn) => off.id === ltn.id
      );

      if (find !== undefined) {
        find.ordinal = index + 1;
      }
      if (findModal !== undefined) {
        findModal.ordinal = index + 1;
      }
    });

    return (
      <>
        <div className="offer-container">
          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Your original offer
            </Typography>
            <Typography variant="label" weight="bold" color="noshade">
              {toPrice(activeOffer.price)}/{unit}
            </Typography>
          </div>
          {negotiations.length !== 0 && negotiations.length <= 3 && (
            <div className="computation-item-container">
              <Typography variant="label" color="noshade">
                Buyer&apos;s counter offer
              </Typography>
              <Typography variant="label" color="noshade" weight="bold">
                {toPrice(latestBuyerNego.price)}/{unit}
              </Typography>
            </div>
          )}

          {negotiations.length >= 2 &&
            lastNegotiationsArray.map((offer) => {
              return (
                <div key={offer.id} className="computation-item-container">
                  <Typography variant="label" color="noshade">
                    {`${offer.type === 'COUNTER_OFFER' ? `Buyer's` : 'Your'} ${
                      offer.ordinal && toOrdinalSuffix(offer.ordinal)
                    } offer`}
                  </Typography>
                  <Typography variant="label" color="noshade" weight="bold">
                    {toPrice(offer.price)}/{unit}
                  </Typography>
                </div>
              );
            })}

          <div className="computation-item-container">
            <Typography variant="label" color="noshade">
              Change in Price{' '}
              <span className="indicator">{discountPercentage}%</span>
            </Typography>
            {discountValue !== 0 ? (
              <Typography
                color={discountValue >= 0 ? 'error' : 'success'}
                variant="label"
                weight="bold"
              >
                {toPrice(-discountValue)}/{unit}
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
              {toPrice(totalValue)}
            </Typography>
          </div>

          {!isNegotiationAllowed && (
            <div className="computation-item-container">
              <Typography variant="label" color="noshade">
                The buyer is reviewing your offer.
              </Typography>
            </div>
          )}
        </div>

        <div className="submit-btns">
          {!isReview &&
            !noNegotiations &&
            isNegoOpen &&
            isNegotiationAllowed &&
            !isNegotiationEqual && (
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
                      latestBuyerNego.price,
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

        <NegotiateSellerModal
          marketOffer={activeOffer}
          modalLastNegotiationsArray={modalLastNegotiationsArray}
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
          marketBoard
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
                  label="From"
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

                {!isReview && parseFloat(activeOffer.size.to || '0') > 0 && (
                  <TextField
                    className="text-field"
                    type="number"
                    label="To"
                    value={activeOffer.size.to}
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
                disabled={userPending}
                text="Make an offer"
                variant={userPending ? 'disabled' : 'primary'}
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

      {step === 1 && (
        <Step1 setStep={setStep} {...props} userPending={props.userPending} />
      )}
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
