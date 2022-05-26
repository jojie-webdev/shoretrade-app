import React, { useEffect, useState } from 'react';

import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs';
import { Calendar, Mastercard } from 'components/base/SVG';
import TwoWayToggle from 'components/base/TwoWayToggle';
import Typography from 'components/base/Typography';
import AdditionalPlanFeatures from 'components/module/AdditionalPlanFeatures';
import ConfirmationModal from 'components/module/ConfirmationModal';
import CreditCardLogo from 'components/module/CreditCardLogo';
import PlanFeatures from 'components/module/PlanFeatures';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import _ from 'lodash';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory, useLocation } from 'react-router-dom';
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
  PlanContainer,
  AdditionalSubSection,
  PlanTitleContainer,
  Footer,
} from './SubscriptionPlan.style';

export const SubscriptionPlanView = ({
  annualPrice,
  monthlyPrice,
  nextBillingDate,
  cardBrand,
  cardNumberMasked,
  isSaasSubscribed,
  subscriptionType,
  planStatus,
  planInterval,
  isDeactivated,
  features,
  currentMarketSector,
  cancelSubscription,
  updateSubscription,
  renewSubscription,
}: SubscriptionPlanGeneratedProps) => {
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS.sm });
  const isSmallDesktop = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1439px)',
  });
  const [isMonthly, setIsMonthly] = useState(true);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const price = toPrice(isMonthly ? monthlyPrice : annualPrice);
  const redirectState = {
    from: {
      label: 'Plan',
      link: location.pathname,
    },
  };
  const reverseMarketPlace = features.find(
    (feature) => feature.alias === 'REVERSED_MARKETPLACE'
  );
  const selectedPlan = subscriptionType === 'STANDARD' ? 'Standard' : 'Premium';

  useEffect(() => {
    setIsMonthly(planInterval !== 'ANNUAL');
  }, [planInterval]);

  const interval = isMonthly ? 'MONTHLY' : 'ANNUAL';
  const plan = isMonthly ? 'Base' : 'Premium';
  const isForRenewal =
    ['CANCELLED', 'OVERDUE', 'UNSUBSCRIBED'].includes(planStatus) ||
    isDeactivated;

  const yourPlanBadgeText = isForRenewal
    ? planStatus === 'OVERDUE'
      ? 'OVERDUE'
      : 'CANCELLED'
    : !isSaasSubscribed
    ? 'CANCELLED'
    : null;
  const isOverdueBadgeVisible = [
    'UNSUCCESSFUL',
    'LATE',
    'OVERDUE',
    'UNSUBSCRIBED',
  ].includes(planStatus);
  const yourPlanButtonText = getButtonTextByStatus(planStatus);
  const showYourPlanOnly = !cardNumberMasked && !nextBillingDate;

  return (
    <Container>
      <BreadcrumbsContainer>
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Plan',
            },
          ]}
        />
      </BreadcrumbsContainer>

      <SubscriptionContainer>
        <Row gutterWidth={20} justify="center" style={{ width: '100%' }}>
          {!showYourPlanOnly && (
            <Col md={12} lg={4}>
              <PaymentMethodSection className="section payment-section">
                <Typography variant="body" weight="400">
                  Your Payment Method
                </Typography>

                <div className="card-info">
                  <div className="card-icon">
                    <CreditCardLogo type={cardBrand} />
                  </div>
                  <Typography variant="body">
                    <b>{cardNumberMasked}</b>
                  </Typography>
                </div>

                <Link
                  className="see-payment-methods"
                  to={BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD}
                >
                  <Typography
                    variant="label"
                    color="primary"
                    weight="400"
                    style={{ textDecoration: 'underline' }}
                  >
                    {isOverdueBadgeVisible
                      ? 'Pay Outstanding Balance'
                      : 'See Payment Methods'}
                  </Typography>
                </Link>
              </PaymentMethodSection>

              <BillingSection className="section payment-section">
                <Typography variant="body" weight="400">
                  Next Billing Date
                </Typography>

                <div className="billing-date">
                  <Calendar fill={theme.grey.shade7} />
                  <Typography
                    variant="body"
                    style={{ marginLeft: '6px', lineHeight: 'normal' }}
                  >
                    <b>{nextBillingDate}</b>
                  </Typography>
                  {isOverdueBadgeVisible && (
                    <Badge
                      badgeColor={theme.brand.error}
                      borderRadius="8px"
                      style={{ marginLeft: '8px' }}
                    >
                      <Typography
                        variant="overline"
                        color="noshade"
                        style={{ lineHeight: 'unset' }}
                      >
                        OVERDUE
                      </Typography>
                    </Badge>
                  )}
                </div>

                <Link
                  className="see-payment-history"
                  to={{
                    pathname: BUYER_ACCOUNT_ROUTES.PAYMENT_HISTORY,
                    state: redirectState,
                  }}
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
              </BillingSection>
            </Col>
          )}

          <Col md={12} lg={8}>
            <PlanContainer>
              <Row gutterWidth={20} style={{ width: '100%' }}>
                <Col md={12} xl={6} style={{ marginBottom: '24px' }}>
                  <PlanSection className="section">
                    <PlanTitleContainer>
                      <Typography variant="body" weight="900">
                        Basic Plan
                      </Typography>

                      {subscriptionType === 'STANDARD' && (
                        <Badge
                          badgeColor={theme.brand.primary}
                          borderRadius="8px"
                          style={{ marginLeft: '8px' }}
                        >
                          <Typography
                            variant="overline"
                            color="noshade"
                            style={{ lineHeight: 'normal' }}
                          >
                            subscribed
                          </Typography>
                        </Badge>
                      )}
                    </PlanTitleContainer>

                    <PlanFeatures
                      selectedPlan="Standard"
                      currentMarketSector={currentMarketSector}
                    />

                    <Footer>
                      <Typography variant="caption" weight="regular">
                        *Minimum 3 month sign up, starting from your account
                        approval date.
                      </Typography>
                      {selectedPlan === 'Standard' && (
                        <Typography variant="caption" weight="regular">
                          **The Transaction Value is the total value of the
                          products in your order excluding any crate fees and
                          shipping costs.
                        </Typography>
                      )}
                    </Footer>

                    {!!yourPlanButtonText &&
                    subscriptionType === 'STANDARD' &&
                    isSaasSubscribed ? (
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
                    ) : (
                      <div
                        className="subscription-action"
                        onClick={() => setShowToggleModal(true)}
                      >
                        <Typography
                          variant="label"
                          color="primary"
                          weight="400"
                          style={{ textDecoration: 'underline' }}
                        >
                          Update Subscription
                        </Typography>
                      </div>
                    )}
                  </PlanSection>
                </Col>
                <Col md={12} xl={6} style={{ marginBottom: '24px' }}>
                  <PlanSection className="section">
                    <PlanTitleContainer>
                      <Typography variant="body" weight="900">
                        Premium Plan
                      </Typography>
                      {subscriptionType !== 'STANDARD' && (
                        <Badge
                          badgeColor={theme.brand.primary}
                          borderRadius="8px"
                          style={{ marginLeft: '8px' }}
                        >
                          <Typography
                            variant="overline"
                            color="noshade"
                            style={{ lineHeight: 'normal' }}
                          >
                            subscribed
                          </Typography>
                        </Badge>
                      )}
                    </PlanTitleContainer>

                    <PlanFeatures
                      selectedPlan="Premium"
                      currentMarketSector={currentMarketSector}
                    />

                    <Footer>
                      <Typography variant="caption" weight="regular">
                        *Minimum 3 month sign up, starting from your account
                        approval date.
                      </Typography>
                    </Footer>

                    {!!yourPlanButtonText &&
                    subscriptionType !== 'STANDARD' &&
                    isSaasSubscribed ? (
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
                    ) : (
                      <div
                        className="subscription-action"
                        onClick={() => setShowToggleModal(true)}
                      >
                        <Typography
                          variant="label"
                          color="primary"
                          weight="400"
                          style={{ textDecoration: 'underline' }}
                        >
                          Update Subscription
                        </Typography>
                      </div>
                    )}
                  </PlanSection>
                </Col>
              </Row>
            </PlanContainer>
            <PlanContainer>
              <Row gutterWidth={20} style={{ width: '100%' }}>
                <Col md={12}>
                  <AdditionalSubSection className="section">
                    <PlanTitleContainer>
                      <Typography variant="body" weight="900">
                        Reverse Marketplace $49.9
                      </Typography>
                      {reverseMarketPlace && (
                        <Badge
                          badgeColor={theme.brand.primary}
                          borderRadius="8px"
                          style={{ marginLeft: '8px' }}
                        >
                          <Typography
                            variant="overline"
                            color="noshade"
                            style={{ lineHeight: 'normal' }}
                          >
                            subscribed
                          </Typography>
                        </Badge>
                      )}
                    </PlanTitleContainer>

                    <AdditionalPlanFeatures
                      selectedPlan={selectedPlan}
                      currentMarketSector={currentMarketSector}
                    />

                    {/* // NEEDED LATER FOR MARKET PLACE CANCEL SUBSCRIPTION TASK
                    {!!yourPlanButtonText && isSaasSubscribed && (
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
        title={`Change to ${
          selectedPlan === 'Standard' ? 'premium' : 'basic'
        } billing?`}
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
          <Typography variant="title3" weight="400">
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
          <Typography variant="body" weight="700">
            &nbsp;{price}
          </Typography>
          <Typography variant="body" weight="400" color="shade7">
            &nbsp;on
          </Typography>
          <Typography variant="body" weight="700">
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
        cancel={() => {
          cancelSubscription(interval);
          setShowCancelModal(false);
        }}
        style={{ width: '686px' }}
      />

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
    </Container>
  );
};
