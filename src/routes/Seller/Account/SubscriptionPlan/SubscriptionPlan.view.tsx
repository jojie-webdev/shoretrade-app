import React, { useEffect, useState } from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import {
  Calendar,
  Mastercard,
  ShoretradeProSellerLogo,
  DollarSign,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import AdditionalPlanFeatures from 'components/module/AdditionalPlanFeatures';
import ConfirmationModal from 'components/module/ConfirmationModal';
import CreditCardLogo from 'components/module/CreditCardLogo';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import qs from 'qs';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory } from 'react-router-dom';
import { toPrice } from 'utils/String';
import { getButtonTextByStatus } from 'utils/SubscriptionPlan/getButtonTextByStatus';
import { useTheme } from 'utils/Theme';

import { SubscriptionPlanGeneratedProps } from './SubscriptionPlan.props';
import {
  BillingSection,
  BreadcrumbsContainer,
  Container,
  DicountContainer,
  FlexContainer,
  PaymentMethodSection,
  PlanSection,
  SubscriptionContainer,
  ToggleContainer,
  AdditionalSubSection,
  PlanTitleContainer,
  PlanContainer,
  IncusionSection,
  ReverseMarketplace,
  PlanPrice,
  BadgesContainer,
  AlertsContainer,
  AlertContentContainer,
} from './SubscriptionPlan.style';

export const SubscriptionPlanView = ({
  annualPrice,
  monthlyPrice,
  nextBillingDate,
  nextBillingAmount,
  cardBrand,
  cardNumberMasked,
  planStatus,
  planInterval,
  features,
  subscriptionType,
  currentMarketSector,
  cancelSubscription,
  updateSubscription,
  reverseMarketAddOnDetails,
  reverseMarketPlanDetails,
  renewSubscription,
  currentPlanDetails,
  currentReverseMarketDetails,
  company,
  flags,
  cancellationReversePeriodReverseMarket,
  lateReverseMarketPayment,
  defaultCard,
  failedReverseMarketPayment,
}: SubscriptionPlanGeneratedProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS.sm });
  const history = useHistory();
  const isSmallDesktop = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1439px)',
  });
  const [isMonthly, setIsMonthly] = useState(true);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showEnterCardModal, setShowEnterCardModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [
    showReverseMarketPlaceToggleModal,
    setShowReverseMarketPlaceToggleModal,
  ] = useState(false);
  const [
    showCancelReverseMarketModal,
    setShowCancelReverseMarketModal,
  ] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const price = toPrice(isMonthly ? monthlyPrice : annualPrice);

  const reverseMarketPrice = reverseMarketPlanDetails
    ? Number(reverseMarketPlanDetails.price)
    : 0;

  useEffect(() => {
    setIsMonthly(planInterval !== 'ANNUAL');
  }, [planInterval]);

  const ifForRenewal = ['CANCELLED', 'OVERDUE'].includes(planStatus);
  const interval = isMonthly ? 'MONTHLY' : 'ANNUAL';

  return (
    <Container>
      <BreadcrumbsContainer>
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Your Plan',
              link: SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
            },
          ]}
        />
      </BreadcrumbsContainer>
      <AlertsContainer>
        {flags?.hasCancelledReversedMarketplace && (
          <Alert
            variant="error"
            fullWidth={true}
            content={<></>}
            header={`Reverse Marketplace Cancellation ${cancellationReversePeriodReverseMarket}`}
          />
        )}
        {lateReverseMarketPayment && (
          <Alert
            fullWidth
            header="Late Payment"
            content={
              <AlertContentContainer>
                <Typography variant="caption" color="shade7">
                  Your subscription payment is outstanding. Please make a
                  one-off payment here within 3 days to keep your account
                  active.
                </Typography>
                <div className="actions">
                  <Button
                    onClick={() => {
                      history.push(SELLER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD);
                    }}
                    text="Make Payment"
                    size="sm"
                  />
                </div>
              </AlertContentContainer>
            }
            variant="error"
          />
        )}
        {failedReverseMarketPayment && !lateReverseMarketPayment && (
          <Alert
            fullWidth
            header="Unsuccessful Payment"
            content={
              <AlertContentContainer>
                <Typography variant="caption" color="shade7">
                  Your most recent payment was unsuccessful. The payment will be
                  automatically reattempted tomorrow.
                </Typography>
              </AlertContentContainer>
            }
            variant="error"
          />
        )}
      </AlertsContainer>
      {/* <DicountContainer>
        <div className="discount">
          <Typography
            weight="400"
            color="noshade"
            style={{ fontFamily: 'Wilderness', fontSize: '24px' }}
          >
            10% OFF
          </Typography>
        </div>
      </DicountContainer> */}

      {/* <ToggleContainer>
        <Typography
          variant="label"
          weight="400"
          color="noshade"
          style={{ marginRight: '8px' }}
        >
          Monthly
        </Typography>

        <TwoWayToggle
          checked={isMonthly}
          onClick={() => {
            setIsMonthly(!isMonthly);
            setShowToggleModal(true);
          }}
        />

        <Typography
          variant="label"
          weight="400"
          color="noshade"
          style={{ marginLeft: '8px' }}
        >
          Annually
        </Typography>
      </ToggleContainer> */}

      <SubscriptionContainer>
        <Row gutterWidth={20} justify="center" style={{ width: '100%' }}>
          <Col md={12} lg={4}>
            <PaymentMethodSection className="section">
              <Typography variant="body" weight="400" color="noshade">
                Your Payment Method
              </Typography>

              <div className="card-info">
                <div className="card-icon">
                  <CreditCardLogo type={cardBrand ? cardBrand : 'visa'} />
                </div>
                <Typography variant="body" color="noshade">
                  <b>{cardNumberMasked}</b>
                </Typography>
              </div>

              <Link
                className="see-payment-methods"
                to={`${SELLER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD}${qs.stringify(
                  { companyId: company?.id },
                  { addQueryPrefix: true }
                )}`}
              >
                <Typography
                  variant="label"
                  color="primary"
                  weight="400"
                  style={{ textDecoration: 'underline' }}
                >
                  See Payment Methods
                </Typography>
              </Link>
            </PaymentMethodSection>

            <BillingSection className="section">
              <Typography variant="body" weight="400" color="noshade">
                Next Billing Date
              </Typography>

              <div className="billing-date">
                <Calendar fill={theme.grey.shade7} />
                <Typography
                  variant="body"
                  color="noshade"
                  style={{ marginLeft: '6px' }}
                >
                  <b>{nextBillingDate}</b>
                </Typography>
              </div>
              <div className="billing-item">
                <Typography variant="body" weight="400" color="noshade">
                  Next Billing Amount
                </Typography>
                <div className="billing-date">
                  <DollarSign fill={theme.grey.shade7} width={16} height={20} />
                  <Typography
                    variant="body"
                    style={{ marginLeft: '6px', lineHeight: 'normal' }}
                    color="noshade"
                  >
                    <b>{nextBillingAmount}</b>
                  </Typography>
                </div>
              </div>
              <BadgesContainer>
                {flags?.hasCancelledReversedMarketplace && (
                  <Badge badgeColor={theme.product?.error} borderRadius="4px">
                    <Typography
                      variant="overline"
                      color="noshade"
                      style={{ lineHeight: 'unset' }}
                    >
                      Cancelling
                    </Typography>
                  </Badge>
                )}
              </BadgesContainer>
              <div className="section-footer">
                <Link
                  className="see-payment-history"
                  to={SELLER_ACCOUNT_ROUTES.PAYMENT_HISTORY}
                >
                  <Typography
                    variant="label"
                    color="primary"
                    weight="400"
                    style={{ textDecoration: 'underline' }}
                  >
                    See Payment History
                  </Typography>
                </Link>
              </div>
            </BillingSection>
          </Col>

          <Col md={12} lg={8}>
            <PlanContainer>
              <Row gutterWidth={20} style={{ width: '100%' }}>
                <Col md={12}>
                  <AdditionalSubSection className="section">
                    <PlanTitleContainer>
                      <Typography
                        variant="title6"
                        weight="900"
                        customFont={theme.isSFM ? 'Canela' : 'Media Sans'}
                        color={
                          theme.appType === 'seller' ? 'noshade' : 'shade9'
                        }
                      >
                        Reverse Marketplace
                      </Typography>
                      <PlanPrice>
                        <Typography
                          variant="title5"
                          weight="400"
                          color={
                            theme.appType === 'seller' ? 'noshade' : 'shade9'
                          }
                        >
                          $
                          {theme.appType === 'seller' &&
                            reverseMarketPlanDetails?.price}
                        </Typography>
                        <Typography variant="label" weight="400" color="shade6">
                          /Month
                        </Typography>
                      </PlanPrice>
                    </PlanTitleContainer>
                    <ReverseMarketplace>
                      <Typography
                        variant="label"
                        color={theme.appType === 'seller' ? 'shade6' : 'shade7'}
                        weight="400"
                      >
                        Want to gain even more sales with quick turn around
                        times? See what unique products buyers are after when
                        you connect to the Reverse Marketplace. Buyers make
                        specific requests for seafood products, and if you can
                        provide that product then make them an offer. By
                        aligning your stock supply to the buyers' needs, your
                        product is sold more efficiently, and less resources are
                        taken from our oceans. Gain an extra sales channel and
                        revolutionize your seafood business with Reverse
                        Marketplace!
                      </Typography>
                    </ReverseMarketplace>

                    {currentReverseMarketDetails &&
                    !flags?.hasCancelledReversedMarketplace ? (
                      <div
                        className="cancel-subscription"
                        onClick={() => setShowCancelReverseMarketModal(true)}
                      >
                        <Button
                          onClick={() => true}
                          variant="primary"
                          text="Remove Subscription"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="subscription-action">
                          {flags?.hasCancelledReversedMarketplace ? (
                            <Button
                              onClick={() => {
                                if (currentReverseMarketDetails) {
                                  renewSubscription(
                                    currentReverseMarketDetails.plan.id
                                  );
                                }
                              }}
                              variant="primary"
                              text="Renew Subscription"
                            />
                          ) : (
                            <Button
                              onClick={() => {
                                if (defaultCard) {
                                  setShowReverseMarketPlaceToggleModal(true);
                                } else {
                                  setShowEnterCardModal(true);
                                }
                              }}
                              variant="primary"
                              text="Subscribe"
                            />
                          )}
                        </div>
                      </>
                    )}

                    {/* // NEEDED LATER FOR MARKET PLACE CANCEL SUBSCRIPTION TASK */}
                    {/* {!!yourPlanButtonText && isSaasSubscribed && (
                      <div
                        className="subscription-action"
                        onClick={() =>
                          isForRenewal
                            ? showYourPlanOnly
                              ? history.push(
                                  BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD
                                )
                              : setShowRenewModal(true)
                            : setShowCancelModal(true)
                        }
                      >
                        <Typography
                          variant="label"
                          color="primary"
                          weight="400"
                          style={{ textDecoration: 'underline' }}
                        >
                          {yourPlanButtonText}
                        </Typography>
                      </div>
                    )} */}
                  </AdditionalSubSection>
                </Col>
              </Row>
            </PlanContainer>
          </Col>
        </Row>
      </SubscriptionContainer>
      <ConfirmationModal
        isOpen={showToggleModal}
        title={`Change to ${interval.toLowerCase()} billing?`}
        actionText="Confirm new plan"
        onClickClose={() => {
          setShowToggleModal(false);
          setIsMonthly(!isMonthly);
        }}
        action={() => {
          updateSubscription(interval);
          setShowToggleModal(false);
        }}
        style={{ width: '686px' }}
      >
        <Typography color="shade7">Your new plan will be:</Typography>
        <div style={{ display: 'flex', margin: '8px 0' }}>
          <Typography variant="title3" weight="400" color="noshade">
            {price}
          </Typography>
          <Typography variant="label" weight="400" color="shade6">
            &nbsp;/ {isMonthly ? 'Month' : 'Year'}
          </Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography variant="body" weight="400" color="shade7">
            You will be charged
          </Typography>
          <Typography variant="body" weight="700" color="noshade">
            &nbsp;{price}
          </Typography>
          <Typography variant="body" weight="400" color="shade7">
            &nbsp;on
          </Typography>
          <Typography variant="body" weight="700" color="noshade">
            &nbsp;{nextBillingDate}
          </Typography>
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancel Subscription"
        description="Are you sure you want to cancel your ShoreTrade account? Your account will be deactivated until you contact info@shoretrade.com to renew your subscription. You will not be able to access any data that is within your account."
        actionText="Continue Subscription"
        cancelText="Cancel Subscription"
        onClickClose={() => setShowCancelModal(false)}
        action={() => setShowCancelModal(false)}
        style={{ width: '686px' }}
      />

      <ConfirmationModal
        isOpen={showCancelReverseMarketModal}
        title="Are you sure you want to cancel your Reverse Marketplace Access?"
        actionText="No"
        cancelText="Cancel Subscription"
        cancel={() => {
          if (currentReverseMarketDetails?.plan.id) {
            cancelSubscription(currentReverseMarketDetails?.plan.id);
            setShowCancelReverseMarketModal(false);
          }
          setShowCancelModal(false);
        }}
        onClickClose={() => {
          setShowCancelReverseMarketModal(false);
        }}
        action={() => {
          setShowCancelReverseMarketModal(false);
          // setIsMonthly(!isMonthly);
        }}
        style={{ width: '686px' }}
      >
        <div>
          <Typography color="shade6">
            Your access will be revoked after your payment period ends.
          </Typography>
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        isOpen={showRenewModal}
        title="Renew your subscription"
        description="To gain access to your account, you will need to renew your subscription. Press Renew Subscription to confirm your payment details and payment frequency. The relevant amount will be debited from your nominated card and once successfully received, your account will be reactivated."
        actionText="Renew Subscription"
        cancelText="Cancel"
        onClickClose={() => setShowRenewModal(false)}
        action={() => {
          renewSubscription(interval);
          setShowRenewModal(false);
        }}
        cancel={() => setShowRenewModal(false)}
        style={{ width: '686px' }}
      />
      <ConfirmationModal
        isOpen={showEnterCardModal}
        title="Credit Card details required"
        description="Before you are able to subscribe to reverse marketplace, please enter your credit cards and retry."
        actionText="Enter credit card"
        hideCancel
        onClickClose={() => setShowEnterCardModal(false)}
        action={() => {
          history.push(
            `${SELLER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD}${qs.stringify(
              { companyId: company?.id },
              { addQueryPrefix: true }
            )}`
          );
          setShowEnterCardModal(false);
        }}
        cancel={() => setShowRenewModal(false)}
        style={{ width: '686px' }}
      />
      <ConfirmationModal
        isOpen={showReverseMarketPlaceToggleModal}
        title="Add Reverse Marketplace package"
        actionText="Confirm"
        hideCancel
        onClickClose={() => setShowReverseMarketPlaceToggleModal(false)}
        action={() => {
          if (reverseMarketAddOnDetails) {
            updateSubscription(reverseMarketAddOnDetails?.id);
            setShowReverseMarketPlaceToggleModal(false);
          }
        }}
        style={{ width: '686px' }}
      >
        <Typography color="shade6">
          The ongoing monthly cost will be an additional:
          <Typography variant="body" component="span" color="noshade">
            &nbsp;
            {reverseMarketPrice ? toPrice(reverseMarketPrice) : 0}
          </Typography>
          <Typography
            component="span"
            variant="caption"
            weight="500"
            color="noshade"
          >
            /Month
          </Typography>
        </Typography>
        <Typography variant="body" weight="500" color="shade6">
          Pay the amount below to unlock your access now.
        </Typography>
        <div style={{ display: 'flex', margin: '8px 0' }}>
          <Typography variant="title5" weight="500" color="noshade">
            {reverseMarketAddOnDetails
              ? toPrice(reverseMarketAddOnDetails.remaining_price)
              : 0}
          </Typography>
        </div>
        <div style={{ display: 'flex', marginTop: 12 }}>
          <Typography variant="body" color="shade6">
            This is a pro rata cost to have Reverse Marketplace access for the
            remainder of your current payment period. Your total future monthly
            cost will be
            <Typography variant="body" component="span" color="noshade">
              &nbsp;
              {reverseMarketPrice ? toPrice(reverseMarketPrice) : 0}
            </Typography>
            <Typography
              component="span"
              variant="caption"
              weight="500"
              color="noshade"
            >
              /Month
            </Typography>
          </Typography>
        </div>
      </ConfirmationModal>
    </Container>
  );
};
