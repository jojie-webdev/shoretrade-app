import React, { useEffect, useState } from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { Calendar, Mastercard, DollarSign } from 'components/base/SVG';
import TwoWayToggle from 'components/base/TwoWayToggle';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import CreditCardLogo from 'components/module/CreditCardLogo';
import IconTooltip from 'components/module/IconTooltip';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import {
  REVERSE_MARKETPLACE_PRICE,
  BUYER_BASE_PRICE,
  BUYER_PREMIUM_PRICE,
} from 'consts/prices';
import { basePlanItems, proPlanItems } from 'consts/subcriptionPlan';
import _ from 'lodash';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { toPrice } from 'utils/String';
import { getButtonTextByStatus } from 'utils/SubscriptionPlan/getButtonTextByStatus';
import { useTheme } from 'utils/Theme';

import InclusionsList from './InclusionsList/InclusionsList.view';
import SpecialInclusionsList from './SpecialInclusionsList/SpecialInclusionsList.view';
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
  PlanContainer,
  AdditionalSubSection,
  PlanTitleContainer,
  Subscription,
  PlanPrice,
  IncusionSection,
  ReverseMarketplace,
  SpecialInclusionsContainer,
  TooltipWrapper,
  FooterNote,
  AlertsContainer,
  ExpiryAlertContentContainer,
} from './SubscriptionPlan.style';
import { BenefitsList } from './InclusionsList/InclusionsList.style';
import { Tag } from 'routes/Seller/Selling/Selling.style';

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
  cancellationPeriod,
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
  const [showProToggleModal, setShowProToggleModal] = useState(false);
  const [showBaseToggleModal, setShowBaseToggleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const price = toPrice(isMonthly ? monthlyPrice : annualPrice);

  const redirectState = {
    from: {
      label: 'Plan',
      link: location.pathname,
    },
  };

  const selectedPlan = subscriptionType === 'STANDARD' ? 'Base' : 'Pro';

  const basePrice = BUYER_BASE_PRICE.find(
    (item) => item.market === currentMarketSector.toUpperCase()
  )?.price;
  const premiumPrice = BUYER_PREMIUM_PRICE.find(
    (item) => item.market === currentMarketSector.toUpperCase()
  )?.price;

  const planPrice = subscriptionType === 'STANDARD' ? basePrice : premiumPrice;

  const reverseMarketPlace = features.find(
    (feature) => feature.alias === 'REVERSED_MARKETPLACE'
  );

  const getNextBillingAmount = () => {
    const reverseMarketPlacePrice = reverseMarketPlace
      ? REVERSE_MARKETPLACE_PRICE.BUYER
      : 0;

    return planPrice ? planPrice + reverseMarketPlacePrice : 0;
  };

  useEffect(() => {
    setIsMonthly(planInterval !== 'ANNUAL');
  }, [planInterval]);

  const interval = isMonthly ? 'MONTHLY' : 'ANNUAL';
  const isForRenewal =
    ['CANCELLED', 'OVERDUE', 'UNSUBSCRIBED'].includes(planStatus) ||
    isDeactivated;

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
      <AlertsContainer>
        <Alert
          fullWidth
          header={`Account Cancellation ${cancellationPeriod}`}
          content={
            <ExpiryAlertContentContainer>
              <Typography variant="caption" color="shade7">
                Your account will be deactivated on your next payment date and
                you will not be able to access any data in your account.
              </Typography>
              <div className="actions">
                <Button
                  onClick={() => setShowRenewModal(true)}
                  text="Renew"
                  size="sm"
                />
              </div>
            </ExpiryAlertContentContainer>
          }
          variant="error"
        />
      </AlertsContainer>
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

                <Typography variant="body" weight="400">
                  Next Billing Amount
                </Typography>
                <div className="billing-date">
                  <DollarSign fill={theme.grey.shade7} width={16} height={20} />
                  <Typography
                    variant="body"
                    style={{ marginLeft: '6px', lineHeight: 'normal' }}
                  >
                    <b>{getNextBillingAmount().toFixed(2)}</b>
                  </Typography>
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
                <PlanSection className="section">
                  <Subscription>
                    <PlanTitleContainer>
                      <Typography
                        variant="title6"
                        weight="900"
                        customFont={theme.isSFM ? 'Canela' : 'Media Sans'}
                      >
                        Base
                      </Typography>
                      <PlanPrice>
                        <Typography variant="title6" weight="400">
                          {basePrice ? toPrice(basePrice) : 0}
                        </Typography>
                        <Typography variant="label" weight="400" color="shade6">
                          /Month
                        </Typography>
                      </PlanPrice>
                      <div>
                        <BenefitsList>
                          {basePlanItems.map((i, index) => (
                            <li key={index}>
                              <Typography variant="body" color="shade9">
                                {i}
                              </Typography>
                            </li>
                          ))}
                        </BenefitsList>
                      </div>
                    </PlanTitleContainer>

                    {!!yourPlanButtonText &&
                    subscriptionType === 'STANDARD' &&
                    isSaasSubscribed ? (
                      <div>
                        <Typography variant="body" color="primary" weight="500">
                          Your current plan
                        </Typography>
                      </div>
                    ) : (
                      <div className="subscription-action">
                        <Button
                          onClick={() => setShowBaseToggleModal(true)}
                          variant="primary"
                          text="Downgrade"
                        />
                      </div>
                    )}
                  </Subscription>
                  <Subscription>
                    <PlanTitleContainer>
                      <Typography
                        variant="title6"
                        weight="900"
                        customFont={theme.isSFM ? 'Canela' : 'Media Sans'}
                      >
                        Pro
                      </Typography>
                      <PlanPrice>
                        <Typography variant="title5" color="shade9">
                          {premiumPrice ? toPrice(premiumPrice) : 0}
                        </Typography>
                        <Typography variant="label" weight="400" color="shade6">
                          /Month
                        </Typography>
                      </PlanPrice>
                      <div>
                        <BenefitsList>
                          {proPlanItems.map((i, index) => (
                            <li key={index}>
                              <Typography variant="body" color="shade9">
                                {i}
                              </Typography>
                            </li>
                          ))}
                        </BenefitsList>
                      </div>
                    </PlanTitleContainer>

                    {!!yourPlanButtonText &&
                    subscriptionType !== 'STANDARD' &&
                    isSaasSubscribed ? (
                      <div>
                        <Typography variant="body" color="primary" weight="500">
                          Your current plan
                        </Typography>
                      </div>
                    ) : (
                      <div className="subscription-action">
                        <Button
                          onClick={() => setShowProToggleModal(true)}
                          variant="primary"
                          text="Upgrade"
                        />
                      </div>
                    )}
                  </Subscription>
                </PlanSection>
              </Row>
            </PlanContainer>
            <PlanContainer>
              <Row gutterWidth={20} style={{ width: '100%' }}>
                <Col md={12}>
                  <AdditionalSubSection className="section">
                    <PlanTitleContainer>
                      <Typography
                        variant="title6"
                        weight="900"
                        customFont={theme.isSFM ? 'Canela' : 'Media Sans'}
                      >
                        Reverse Marketplace
                      </Typography>
                      <PlanPrice>
                        {selectedPlan === 'Base' ? (
                          <>
                            <Typography variant="title6" weight="400">
                              $
                              {theme.appType !== 'seller' &&
                                REVERSE_MARKETPLACE_PRICE.BUYER.toFixed(2)}
                            </Typography>
                            <Typography
                              variant="label"
                              weight="400"
                              color="shade6"
                            >
                              /Month
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Tag background={theme.brand.success}>
                              <Typography
                                variant="caption"
                                color="noshade"
                                weight="500"
                              >
                                Included
                              </Typography>
                            </Tag>
                          </>
                        )}
                      </PlanPrice>
                    </PlanTitleContainer>
                    <ReverseMarketplace>
                      <Typography
                        variant="label"
                        color={theme.appType === 'seller' ? 'shade6' : 'shade7'}
                        weight="400"
                      >
                        The Reverse Marketplace puts you in control of the
                        seafood supply. Instead of buying from a listing,
                        request tailored products from the sellers on SFMblue.
                        Recieve multiple offers on your request, negotiate
                        prices, accept offers and get your custom products
                        delivered straight to your door. Creating specific
                        requests means more seafood ends up in our bellies
                        instead of the bin, with less resoucrces taken from our
                        oceans. Join the Reverse Market Place and become part of
                        a sustainability initiative that is revolutionizing the
                        seafood industry!
                      </Typography>
                    </ReverseMarketplace>

                    {/* // NEEDED LATER FOR MARKET PLACE CANCEL SUBSCRIPTION TASK */}
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
                    )}
                  </AdditionalSubSection>
                </Col>
              </Row>
            </PlanContainer>
            <PlanContainer>
              <IncusionSection>
                <Typography
                  variant="title6"
                  weight="900"
                  customFont={theme.isSFM ? 'Canela' : 'Media Sans'}
                >
                  {subscriptionType === 'STANDARD' ? 'Base ' : 'Pro '} Plan
                  Inclusions
                </Typography>
                <InclusionsList
                  selectedPlan={selectedPlan}
                  currentMarketSector={currentMarketSector}
                />
                <FooterNote>
                  <Typography
                    variant="label"
                    color={theme.appType === 'seller' ? 'shade6' : 'shade7'}
                    weight="400"
                  >
                    *Minimum 3 month sign up, starting from your account
                    approval date.
                  </Typography>
                </FooterNote>

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
                    className="cancel-subscription"
                    onClick={() => setShowProToggleModal(true)}
                  >
                    <Typography
                      variant="label"
                      color="primary"
                      weight="400"
                      style={{ textDecoration: 'underline' }}
                    >
                      Cancel Subscription
                    </Typography>
                  </div>
                )}
              </IncusionSection>
            </PlanContainer>
          </Col>
        </Row>
      </SubscriptionContainer>
      <ConfirmationModal
        isOpen={showProToggleModal}
        title="Upgrade to the Pro model and unlock more features!"
        actionText={`Upgrade (${'$11'})`} // todo get upgrade cost
        onClickClose={() => {
          setShowProToggleModal(false);
          // setIsMonthly(!isMonthly);
        }}
        action={() => {
          updateSubscription(
            interval,
            selectedPlan === 'Base' ? 'PREMIUM' : 'STANDARD'
          );
          setShowProToggleModal(false);
        }}
        style={{ width: '686px' }}
      >
        <Typography color="shade6">
          The ongoing monthly cost will be:
          <Typography variant="body" component="span">
            &nbsp;{price}
          </Typography>
          <Typography
            component="span"
            variant="caption"
            weight="500"
            color="shade6"
          >
            /Month
          </Typography>
        </Typography>

        <Typography variant="body" weight="500" color="shade6">
          Pay the amount below to unlock the Pro model now.
        </Typography>
        <div style={{ display: 'flex', margin: '8px 0' }}>
          <Typography variant="title3" weight="400">
            {price}
          </Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography variant="body" color="shade6">
            This is a pro rata cost to have the Pro features for the remainder
            of your current payment period. All future costs will be
            <Typography component="span" color="shade9">
              &nbsp;{price}
            </Typography>
            <Typography variant="caption" component="span" color="shade6">
              &nbsp;/{isMonthly ? 'Month' : 'Year'}
            </Typography>
          </Typography>
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        isOpen={showBaseToggleModal}
        title="Are you sure you want to switch plans?"
        actionText="Back" // todo get upgrade cost
        cancelText="Confirm"
        onClickClose={() => {
          // setShowBaseToggleModal(false);
          // setIsMonthly(!isMonthly);
          updateSubscription(
            interval,
            selectedPlan === 'Base' ? 'PREMIUM' : 'STANDARD'
          );
          setShowBaseToggleModal(false);
        }}
        action={() => {
          setShowBaseToggleModal(false);
        }}
        style={{ width: '686px' }}
      >
        <Typography color="shade6">
          The ongoing monthly cost will be:
          <Typography variant="body" component="span">
            &nbsp;{basePrice ? toPrice(basePrice) : 0}
          </Typography>
          <Typography
            component="span"
            variant="caption"
            weight="500"
            color="shade6"
          >
            /Month
          </Typography>
        </Typography>
        <Typography variant="body" weight="500" color="shade6">
          effective from the next payment period. .
        </Typography>
        <div style={{ display: 'flex', marginTop: 24 }}>
          <Typography variant="body" color="shade6">
            By pressing Confirm, you will have the Pro features until the end of
            this payment period and will be downgraded as of the{' '}
            {`22nd of 
            February.`}
          </Typography>
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        isOpen={showCancelModal}
        title="Are you sure you want to cancel your ShoreTrade account?"
        description="Your account will be deactivated on your next payment date and you will not be able to access any data in your account."
        actionText="No"
        cancelText="Cancel Subscription"
        onClickClose={() => setShowCancelModal(false)}
        action={() => setShowCancelModal(false)}
        cancel={() => {
          cancelSubscription();
          setShowCancelModal(false);
        }}
        style={{ width: '686px' }}
      />

      <ConfirmationModal
        isOpen={showRenewModal}
        title="Renew your subscription"
        description={
          <>
            <Typography variant="body" color="shade6">
              To gain access to your account, you will need to renew your
              subscription.{' '}
            </Typography>
            <Typography variant="body" color="shade6">
              Press Renew Subscription to confirm your payment details and
              payment frequency. The relevant amount will be debited from your
              nominated card and once successfully received, your account will
              be reactivated.
            </Typography>
          </>
        }
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
