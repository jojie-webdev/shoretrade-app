import { reverse } from 'dns';

import React, { useEffect, useState } from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { Calendar, Mastercard, DollarSign, Plus } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import CreditCardLogo from 'components/module/CreditCardLogo';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import {
  getBasePlanItems,
  PRO_PLAN_ITEMS,
  PRO_TRANSACTION_VALUES,
} from 'consts/subcriptionPlan';
import _ from 'lodash';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { TRANSACTION_VALUE_FEE_PERCENTAGE } from 'routes/Buyer/Checkout/Checkout.constants';
import { SubMinorDetail } from 'routes/Buyer/NegotiationsAndRequests/Landing/Landing.style';
import { Tag } from 'routes/Seller/Selling/Selling.style';
import {
  CompanyPlanAlias,
  CompanyPlanName,
} from 'types/store/GetCompanyPlanState';
import { toPrice } from 'utils/String';
import { getButtonTextByStatus } from 'utils/SubscriptionPlan/getButtonTextByStatus';
import { useTheme } from 'utils/Theme';

import {
  BenefitsList,
  BenefitsItem,
} from './InclusionsList/InclusionsList.style';
import InclusionsList from './InclusionsList/InclusionsList.view';
import { SubscriptionPlanGeneratedProps } from './SubscriptionPlan.props';
import {
  BillingSection,
  BreadcrumbsContainer,
  Container,
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
  FooterNote,
  AlertsContainer,
  AlertContentContainer,
  BadgesContainer,
  CurrentPlanIndicator,
  PlusIconWrapper,
  PlanTitleWrapper,
  DowngradeStartsIndicator,
} from './SubscriptionPlan.style';

export const SubscriptionPlanView = ({
  nextBillingDate,
  cardBrand,
  cardNumberMasked,
  subscriptionType,
  planStatus,
  planInterval,
  currentMarketSector,
  cancellationPeriod,
  cancelSubscription,
  updateSubscription,
  downgradeSubscription,
  renewSubscription,
  revertSubscription,
  nextBillingAmount,
  proPlanDetails,
  basePlanDetails,
  reverseMarketDetails,
  currentPlanDetails,
  loading,
  isApprovedAccount,
  currentReverseMarketDetails,
  flags,
  proRataPrice,
  latePayment,
  failedPayment,
  cancellationReversePeriodReverseMarket,
  hasUpdateSubsPlanError,
  updateSubsPlanPending,
  updateSubsPlanSuccess,
  transactionValueFeePercent,
}: SubscriptionPlanGeneratedProps) => {
  const location = useLocation();
  const theme = useTheme();
  const history = useHistory();

  const isMobile = useMediaQuery({ query: BREAKPOINTS.sm });
  const isSmallDesktop = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1439px)',
  });
  const [isMonthly, setIsMonthly] = useState(true);
  const [showProToggleModal, setShowProToggleModal] = useState(false);
  const [showBaseToggleModal, setShowBaseToggleModal] = useState(false);
  const [showDowngradeToggleModal, setShowDowngradeToggleModal] = useState(
    false
  );
  const [
    showCancelReverseMarketModal,
    setShowCancelReverseMarketModal,
  ] = useState(false);
  const [
    showReverseMarketPlaceToggleModal,
    setShowReverseMarketPlaceToggleModal,
  ] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Essentials');

  const redirectState = {
    from: {
      label: 'Your Plan',
      link: location.pathname,
    },
  };

  const basePrice = basePlanDetails ? basePlanDetails.price : 0;
  const proPrice = proPlanDetails ? toPrice(proPlanDetails.price) : '$0';
  const currentMainPlanPrice = currentPlanDetails
    ? currentPlanDetails.plan.name === CompanyPlanName.BASE
      ? basePlanDetails?.price
      : proPlanDetails?.price
    : 0;
  const reverseMarketPrice = reverseMarketDetails
    ? Number(reverseMarketDetails.price)
    : 0;

  const transactionValue = currentPlanDetails
    ? currentPlanDetails?.company.subscription_preference.transactionValue
    : '';

  const withinFreeTrial = currentPlanDetails
    ? currentPlanDetails?.plan.alias.includes('FREE')
    : false;

  const seventhFreeDay = currentPlanDetails
    ? moment(currentPlanDetails?.subscription.created_at).add(7, 'days')
    : moment();

  const today = moment();

  const remainingFreeTrialDays = seventhFreeDay.diff(today, 'days');

  const [showFreeTrialPopUp, setShowFreeTrialPopUp] = useState({
    upgrade: false,
    downgrade: false,
  });

  const YourCurrentPlanIndicator = () => (
    <CurrentPlanIndicator>
      <Typography variant="label" weight="500" color="primary">
        Current Plan
      </Typography>
    </CurrentPlanIndicator>
  );

  useEffect(() => {
    setIsMonthly(planInterval !== 'ANNUAL');
  }, [planInterval]);

  const isForRenewal = flags?.hasCancelledPlan;

  const isOverdueBadgeVisible = [
    'UNSUCCESSFUL',
    'LATE',
    'OVERDUE',
    'UNSUBSCRIBED',
  ].includes(planStatus);
  const showYourPlanOnly = !cardNumberMasked && !nextBillingDate;

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <BreadcrumbsContainer>
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Your Plan',
            },
          ]}
        />
      </BreadcrumbsContainer>
      <AlertsContainer>
        {updateSubsPlanSuccess && (
          <Alert
            fullWidth
            header="Payment Successful"
            content={
              <AlertContentContainer>
                <Typography variant="caption" color="shade7">
                  You are successfully subscribed to{' '}
                  {currentPlanDetails?.plan.name.toLowerCase() === 'base'
                    ? 'Essentials'
                    : 'Pro'}{' '}
                  plan.
                </Typography>
              </AlertContentContainer>
            }
            variant="success"
          />
        )}
        {hasUpdateSubsPlanError && (
          <Alert
            fullWidth
            header="Payment Unsuccessful"
            content={
              <AlertContentContainer>
                <Typography variant="caption" color="shade7">
                  Your card was not charged. Please check your payment details.
                </Typography>
              </AlertContentContainer>
            }
            variant="error"
          />
        )}
        {!flags?.hasInactiveSubscription && (
          <>
            {flags?.hasCancelledReversedMarketplace && (
              <Alert
                variant="error"
                fullWidth={true}
                content={<></>}
                header={`Reverse MarketPlace Cancellation ${cancellationReversePeriodReverseMarket}`}
              />
            )}
            {flags?.hasCancelledPlan && !flags?.hasDowngraded && (
              <Alert
                fullWidth
                header={`Account Cancellation ${cancellationPeriod}`}
                content={
                  <AlertContentContainer>
                    <Typography variant="caption" color="shade7">
                      Your account will be deactivated on your next payment date
                      and you will not be able to access any data in your
                      account.
                    </Typography>
                    <div className="actions">
                      <Button
                        onClick={() => {
                          if (currentPlanDetails) {
                            renewSubscription(currentPlanDetails?.plan.id);
                          }
                        }}
                        text="Renew"
                        size="sm"
                      />
                    </div>
                  </AlertContentContainer>
                }
                variant="error"
              />
            )}
            {flags?.hasDowngraded && (
              <Alert
                fullWidth
                header={`Account Downgrade ${cancellationPeriod}`}
                content={
                  <AlertContentContainer>
                    <Typography variant="caption" color="shade7">
                      Your account will be downgraded on your next payment date.
                    </Typography>
                  </AlertContentContainer>
                }
                variant="warning"
              />
            )}
            {latePayment && (
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
                          history.push(
                            BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD
                          );
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
            {failedPayment && !latePayment && (
              <Alert
                fullWidth
                header="Unsuccessful Payment"
                content={
                  <AlertContentContainer>
                    <Typography variant="caption" color="shade7">
                      Your most recent payment was unsuccessful. The payment
                      will be automatically reattempted tomorrow.
                    </Typography>
                  </AlertContentContainer>
                }
                variant="error"
              />
            )}
          </>
        )}
        {!isApprovedAccount && (
          <Alert
            fullWidth
            header="Pending Account Approval"
            content={
              <AlertContentContainer>
                <Typography variant="caption" color="shade7">
                  Your free period will begin once your account has been
                  approved.
                </Typography>
              </AlertContentContainer>
            }
            variant="alert"
          />
        )}
        {flags?.hasInactiveSubscription && (
          <Alert
            fullWidth
            header="Inactive Subscription"
            content={
              <AlertContentContainer>
                <Typography variant="caption" color="shade7">
                  Your subscription payment is outstanding. Please make a
                  one-off payment here to renew your Subscription.
                </Typography>
                <div className="actions">
                  <Button
                    onClick={() => {
                      history.push(BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD);
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
                    <CreditCardLogo type={cardBrand ? cardBrand : 'visa'} />
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
                <div className="billing-item">
                  <Typography variant="body" weight="400">
                    Next Billing Date
                  </Typography>

                  {isApprovedAccount ? (
                    <div className="billing-date">
                      <Calendar
                        fill={theme.grey.shade7}
                        width={16}
                        height={20}
                      />
                      <Typography
                        variant="body"
                        style={{
                          marginLeft: '6px',
                          lineHeight: 'normal',
                          marginTop: '4px',
                        }}
                      >
                        <b>{nextBillingDate}</b>
                      </Typography>
                    </div>
                  ) : (
                    <Typography
                      variant="body"
                      style={{
                        lineHeight: 'normal',
                        marginTop: '4px',
                      }}
                    >
                      <b>
                        Your free trial will begin once your account is
                        approved. Your next billing date will be after the free
                        trial ends.
                      </b>
                    </Typography>
                  )}
                </div>
                <div className="billing-item">
                  <Typography variant="body" weight="400">
                    Next Billing Amount
                  </Typography>
                  <div className="billing-date">
                    <DollarSign
                      fill={theme.grey.shade7}
                      width={16}
                      height={20}
                    />
                    <Typography
                      variant="body"
                      style={{
                        marginLeft: '6px',
                        lineHeight: 'normal',
                        marginTop: '4px',
                      }}
                    >
                      <b>
                        {isApprovedAccount ? nextBillingAmount.toFixed(2) : 0}
                      </b>
                    </Typography>
                  </div>
                </div>
                <BadgesContainer>
                  {isForRenewal && currentPlanDetails && !flags?.hasDowngraded && (
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
                  {currentPlanDetails && flags?.hasDowngraded && (
                    <Badge badgeColor={theme.brand.warning} borderRadius="4px">
                      <Typography
                        variant="overline"
                        color="noshade"
                        style={{ lineHeight: 'unset' }}
                      >
                        Downgrading
                      </Typography>
                    </Badge>
                  )}
                  {isOverdueBadgeVisible && (
                    <Badge
                      badgeColor={theme.brand.error}
                      borderRadius="4px"
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
                </BadgesContainer>
                <div className="section-footer">
                  <Link
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
                      See Subscription History
                    </Typography>
                  </Link>
                </div>
              </BillingSection>
            </Col>
          )}

          <Col md={12} lg={8}>
            <PlanContainer>
              <Row gutterWidth={20} style={{ width: '100%' }}>
                <Col md={12}>
                  <PlanSection className="section">
                    <Subscription>
                      <>
                        <div
                          data-tip
                          data-for={
                            PRO_TRANSACTION_VALUES.includes(transactionValue) &&
                            `disableDowngrade`
                          }
                        >
                          <PlanTitleContainer
                            className={`${
                              PRO_TRANSACTION_VALUES.includes(
                                transactionValue
                              ) && 'disable-downgrade'
                            }`}
                          >
                            <PlanTitleWrapper>
                              <Typography
                                variant="title6"
                                weight="900"
                                customFont={
                                  theme.isSFM ? 'Canela' : 'Media Sans'
                                }
                              >
                                Essentials
                              </Typography>
                              {subscriptionType === CompanyPlanName.BASE ? (
                                <div>
                                  <YourCurrentPlanIndicator />
                                </div>
                              ) : (
                                <>
                                  {flags?.hasDowngraded && (
                                    <DowngradeStartsIndicator>
                                      <Typography
                                        variant="label"
                                        weight="500"
                                        color="shade6"
                                      >
                                        Starts on{' '}
                                        {moment(nextBillingDate).format(
                                          'Do MMM'
                                        )}
                                      </Typography>
                                    </DowngradeStartsIndicator>
                                    // <>
                                    //   {withinFreeTrial ? (
                                    //     <DowngradeStartsIndicator>
                                    //       <Typography
                                    //         variant="label"
                                    //         weight="500"
                                    //         color="shade6"
                                    //       >
                                    //         Starts on{' '}
                                    //         {moment(nextBillingDate).format(
                                    //           'Do MMM'
                                    //         )}
                                    //       </Typography>
                                    //     </DowngradeStartsIndicator>
                                    //   ) : (
                                    //     <div className="subscription-action">
                                    //       <Button
                                    //         onClick={() =>
                                    //           revertSubscription(
                                    //             proPlanDetails?.id
                                    //           )
                                    //         }
                                    //         variant="primary"
                                    //         text="Revert Subscription"
                                    //         size="sm"
                                    //       />
                                    //     </div>
                                    //   )}
                                    // </>
                                  )}
                                  {subscriptionType === null ? (
                                    <div className="subscription-action">
                                      <Button
                                        onClick={() => {
                                          setSelectedPlan('Essentials');
                                          if (basePlanDetails) {
                                            updateSubscription(
                                              basePlanDetails.id
                                            );
                                          }
                                        }}
                                        variant="primary"
                                        text="Subscribe"
                                        size="sm"
                                        loading={
                                          selectedPlan === 'Essentials' &&
                                          updateSubsPlanPending
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <>
                                      {!flags?.hasDowngraded && (
                                        <div
                                          className={`subscription-action ${
                                            withinFreeTrial && 'disable'
                                          }`}
                                        >
                                          <Button
                                            disabled={flags?.hasDowngraded}
                                            onClick={() =>
                                              withinFreeTrial
                                                ? setShowFreeTrialPopUp({
                                                    ...showFreeTrialPopUp,
                                                    downgrade: true,
                                                  })
                                                : setShowBaseToggleModal(true)
                                            }
                                            variant="primary"
                                            text="Downgrade"
                                            size="sm"
                                          />
                                        </div>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </PlanTitleWrapper>
                            <PlanPrice>
                              <Typography variant="title5" weight="500">
                                {basePrice ? toPrice(basePrice) : 0}
                              </Typography>
                              <Typography
                                variant="label"
                                weight="400"
                                color="shade6"
                              >
                                /Month
                              </Typography>
                            </PlanPrice>
                            <div>
                              <BenefitsList>
                                {getBasePlanItems(
                                  !transactionValueFeePercent
                                    ? TRANSACTION_VALUE_FEE_PERCENTAGE.toString()
                                    : transactionValueFeePercent.toString()
                                ).map((i, index) => {
                                  if (index === 0) {
                                    return (
                                      <>
                                        <BenefitsItem
                                          key={index}
                                          data-tip
                                          data-for="transactValueTip"
                                        >
                                          <div style={{ display: 'flex' }}>
                                            <PlusIconWrapper>
                                              <Plus width={14} height={14} />
                                            </PlusIconWrapper>
                                            <Typography
                                              variant="body"
                                              color="shade9"
                                              weight="700"
                                              customFont={`${
                                                theme.isSFM
                                                  ? 'Basis Grotesque Pro'
                                                  : ''
                                              }`}
                                            >
                                              {i.title}
                                            </Typography>
                                          </div>
                                          <Typography
                                            weight="400"
                                            variant="label"
                                          >
                                            {i.subText}
                                          </Typography>
                                        </BenefitsItem>
                                        <ReactTooltip
                                          id="transactValueTip"
                                          place="top"
                                          effect="solid"
                                          backgroundColor={theme.grey.shade9}
                                        >
                                          <div
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                            }}
                                          >
                                            The Transaction Value is the total
                                            value
                                            <br />
                                            of the products in your order
                                            excluding
                                            <br />
                                            any crate fees and shipping costs.
                                          </div>
                                        </ReactTooltip>
                                      </>
                                    );
                                  }
                                  return (
                                    <BenefitsItem key={index}>
                                      <div style={{ display: 'flex' }}>
                                        <PlusIconWrapper>
                                          <Plus width={14} height={14} />
                                        </PlusIconWrapper>
                                        <Typography
                                          variant="body"
                                          color="shade9"
                                          weight="700"
                                          customFont={`${
                                            theme.isSFM
                                              ? 'Basis Grotesque Pro'
                                              : ''
                                          }`}
                                        >
                                          {i.title}
                                        </Typography>
                                      </div>
                                      <Typography weight="400" variant="label">
                                        {i.subText}
                                      </Typography>
                                    </BenefitsItem>
                                  );
                                })}
                              </BenefitsList>
                            </div>
                          </PlanTitleContainer>
                        </div>
                        <ReactTooltip
                          id="disableDowngrade"
                          place="top"
                          effect="solid"
                          backgroundColor={theme.grey.shade9}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            Plan availability is dependent on your
                            <br />
                            monthly transaction expenditure.
                          </div>
                        </ReactTooltip>
                      </>
                    </Subscription>
                    <Subscription>
                      <PlanTitleContainer>
                        <PlanTitleWrapper>
                          <Typography
                            variant="title6"
                            weight="900"
                            customFont={theme.isSFM ? 'Canela' : 'Media Sans'}
                          >
                            Pro
                          </Typography>
                          {currentPlanDetails?.plan.name ===
                          CompanyPlanName.PRO ? (
                            <div>
                              <YourCurrentPlanIndicator />
                            </div>
                          ) : (
                            <>
                              {subscriptionType === null ? (
                                <div className="subscription-action">
                                  <Button
                                    onClick={() => {
                                      if (proPlanDetails) {
                                        setSelectedPlan('Pro');
                                        updateSubscription(proPlanDetails.id);
                                      }
                                    }}
                                    variant="primary"
                                    text="Subscribe"
                                    size="sm"
                                    loading={
                                      selectedPlan === 'Pro' &&
                                      updateSubsPlanPending
                                    }
                                  />
                                </div>
                              ) : (
                                <div
                                  className={`subscription-action ${
                                    withinFreeTrial && 'disable'
                                  }`}
                                >
                                  <Button
                                    disabled={
                                      flags
                                        ? flags.hasCancelledPlan
                                          ? true
                                          : false
                                        : false
                                    }
                                    onClick={() =>
                                      withinFreeTrial
                                        ? setShowFreeTrialPopUp({
                                            ...showFreeTrialPopUp,
                                            upgrade: true,
                                          })
                                        : setShowProToggleModal(true)
                                    }
                                    variant="primary"
                                    text="Upgrade"
                                    size="sm"
                                  />
                                </div>
                              )}
                            </>
                          )}
                        </PlanTitleWrapper>
                        <PlanPrice>
                          <Typography variant="title5" weight="500">
                            {proPrice}
                          </Typography>
                          <Typography
                            variant="label"
                            weight="400"
                            color="shade6"
                          >
                            /Month
                          </Typography>
                        </PlanPrice>
                        <div>
                          <BenefitsList>
                            {PRO_PLAN_ITEMS.map((i, index) => (
                              <BenefitsItem key={index}>
                                <div style={{ display: 'flex' }}>
                                  <PlusIconWrapper>
                                    <Plus width={14} height={14} />
                                  </PlusIconWrapper>
                                  <Typography
                                    variant="body"
                                    color="shade9"
                                    weight="700"
                                    customFont={`${
                                      theme.isSFM ? 'Basis Grotesque Pro' : ''
                                    }`}
                                  >
                                    {i.title}
                                  </Typography>
                                </div>
                                <div style={{ paddingLeft: '16px' }}>
                                  <Typography weight="400" variant="label">
                                    {i.subText}
                                  </Typography>
                                </div>
                              </BenefitsItem>
                            ))}
                          </BenefitsList>
                        </div>
                      </PlanTitleContainer>
                    </Subscription>
                  </PlanSection>
                </Col>
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
                        {currentPlanDetails?.plan.name ===
                        CompanyPlanName.BASE ? (
                          <>
                            <Typography variant="title6" weight="400">
                              $
                              {theme.appType !== 'seller' &&
                                reverseMarketPrice.toFixed(2)}
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
                            {subscriptionType !== null && (
                              <div style={{ marginBottom: 12 }}>
                                {!flags?.hasDowngraded ? (
                                  <Tag background={theme.brand.success}>
                                    <Typography
                                      variant="caption"
                                      color="noshade"
                                      weight="500"
                                    >
                                      Included
                                    </Typography>
                                  </Tag>
                                ) : (
                                  <Badge
                                    badgeColor={theme.brand.warning}
                                    borderRadius="4px"
                                  >
                                    <Typography
                                      variant="overline"
                                      color="noshade"
                                      style={{ lineHeight: 'unset' }}
                                    >
                                      Downgrading
                                    </Typography>
                                  </Badge>
                                )}
                              </div>
                            )}
                          </>
                        )}
                      </PlanPrice>
                    </PlanTitleContainer>
                    <ReverseMarketplace>
                      <ul>
                        <li>
                          <Typography
                            variant="label"
                            color={
                              theme.appType === 'seller' ? 'shade6' : 'shade7'
                            }
                            weight="400"
                          >
                            Negotiate the price of listings
                          </Typography>
                        </li>
                      </ul>

                      <Typography
                        variant="label"
                        color={theme.appType === 'seller' ? 'shade6' : 'shade7'}
                        weight="400"
                      >
                        Bartering with Sellers on select listings allows you to
                        get their best price. Initiate and negotiate up to 5
                        times with this package added to your Essentials Plan,
                        or upgrade to Pro to have{' '}
                        <span style={{ fontWeight: 'bold' }}>unlimited</span>{' '}
                        negotiation abilities. Negotiations have
                        product-specific time limits to ensure that all parties
                        offer fair prices.
                      </Typography>

                      <div style={{ marginTop: 25 }} />

                      <ul>
                        <li>
                          <Typography
                            variant="label"
                            color={
                              theme.appType === 'seller' ? 'shade6' : 'shade7'
                            }
                            weight="400"
                          >
                            Customized products delivered to your door
                          </Typography>
                        </li>
                      </ul>

                      <Typography
                        variant="label"
                        color={theme.appType === 'seller' ? 'shade6' : 'shade7'}
                        weight="400"
                      >
                        Buyer Requests creates a reverse marketplace where you
                        can submit a market-wide seafood request tailored to
                        your business needs. Choose your desired species,
                        sizing, specifications, quantity and delivery location,
                        and our SMFblue Sellers will make you an offer. Accept
                        their offers or negotiate, and have your custom product
                        delivered straight to your door.
                      </Typography>
                    </ReverseMarketplace>

                    {/* // NEEDED LATER FOR MARKET PLACE CANCEL SUBSCRIPTION TASK */}
                    {currentReverseMarketDetails ||
                    currentPlanDetails?.plan.name === CompanyPlanName.PRO ? (
                      <>
                        {flags?.hasCancelledReversedMarketplace ? (
                          <div className="subscription-action">
                            <Button
                              onClick={() => {
                                if (currentReverseMarketDetails?.plan.id) {
                                  renewSubscription(
                                    currentReverseMarketDetails?.plan.id
                                  );
                                }
                              }}
                              variant="primary"
                              text="Renew Subscription"
                            />
                          </div>
                        ) : (
                          <>
                            {currentPlanDetails?.plan.name !==
                              CompanyPlanName.PRO && (
                              <div
                                className="cancel-subscription"
                                onClick={() =>
                                  setShowCancelReverseMarketModal(true)
                                }
                              >
                                <Button
                                  onClick={() => true}
                                  variant="primary"
                                  text="Remove Subscription"
                                />
                              </div>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {subscriptionType !== null && (
                          <div className="subscription-action">
                            <Button
                              onClick={() =>
                                setShowReverseMarketPlaceToggleModal(true)
                              }
                              variant="primary"
                              text="Subscribe"
                            />
                          </div>
                        )}
                      </>
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
                  Standard Plan Inclusions
                </Typography>
                <InclusionsList
                  selectedPlan={currentPlanDetails?.plan.name}
                  currentMarketSector={currentMarketSector}
                />

                {!flags?.hasCancelledPlan && subscriptionType !== null && (
                  <div
                    className="cancel-subscription"
                    onClick={() => setShowCancelModal(true)}
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
        actionText={`Upgrade (${proRataPrice})`} // todo get upgrade cost
        onClickClose={() => {
          setShowProToggleModal(false);
          // setIsMonthly(!isMonthly);
        }}
        action={() => {
          if (proPlanDetails?.id) {
            setSelectedPlan('Pro');
            updateSubscription(proPlanDetails.id);
          }
          setShowProToggleModal(false);
        }}
        style={{ width: '686px' }}
      >
        <Typography color="shade6">
          The ongoing monthly cost will be:
          <Typography variant="body" component="span">
            &nbsp;{proPrice}
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
          <Typography variant="title5" weight="500">
            {proRataPrice}
          </Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography variant="body" color="shade6">
            This is a pro rata cost to have the Pro features for the remainder
            of your current payment period. All future costs will be
            <Typography component="span" color="shade9">
              &nbsp;{proPrice}
            </Typography>
            <Typography variant="caption" component="span" color="shade6">
              &nbsp;/{isMonthly ? 'Month' : 'Year'}
            </Typography>
          </Typography>
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        isOpen={showDowngradeToggleModal}
        title="Are you sure you want to switch plans?"
        actionText="Confirm"
        cancelText="Back"
        onClickClose={() => {
          setShowDowngradeToggleModal(false);
        }}
        action={() => {
          // setShowBaseToggleModal(false);
          // setIsMonthly(!isMonthly);

          if (basePlanDetails?.id && remainingFreeTrialDays > 0) {
            downgradeSubscription();
          } else {
            downgradeSubscription();
            if (basePlanDetails?.id) {
              setSelectedPlan('Essential');
              updateSubscription(basePlanDetails.id);
            }
          }
          setShowDowngradeToggleModal(false);
        }}
        style={{ width: '686px' }}
      >
        <Typography color="shade6">
          You will be charged the ongoing monthly cost of
          <Typography variant="body" component="span">
            &nbsp;{basePrice ? toPrice(basePrice) : 0}/month{' '}
          </Typography>
          <Typography
            variant="body"
            weight="500"
            color="shade6"
            component="span"
          >
            on{' '}
          </Typography>
          <Typography variant="body" component="span">
            {withinFreeTrial && remainingFreeTrialDays > 0
              ? moment(seventhFreeDay).format('MMMM Do, YYYY')
              : moment().format('MMMM Do, YYYY')}
          </Typography>
        </Typography>

        <Typography variant="body" weight="500" color="shade6" component="span">
          {' '}
          as the Essentials plan free period is 7 days.
        </Typography>

        <div style={{ display: 'flex', marginTop: 24 }}>
          <Typography variant="body" color="shade6">
            By pressing Confirm, you are agreeing to being charged{' '}
            <Typography variant="body" component="span">
              &nbsp;{basePrice ? toPrice(basePrice) : 0}/month{' '}
            </Typography>
            <Typography color="shade6" variant="body" component="span">
              with the first payment on{' '}
            </Typography>
            <Typography variant="body" component="span">
              {withinFreeTrial && remainingFreeTrialDays > 0
                ? moment.utc(seventhFreeDay).format('MMMM Do, YYYY')
                : moment.utc().format('MMMM Do, YYYY')}
              .
            </Typography>
          </Typography>
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        isOpen={showBaseToggleModal}
        title="Are you sure you want to switch plans?"
        actionText="Confirm"
        cancelText="Back"
        onClickClose={() => {
          setShowBaseToggleModal(false);
        }}
        action={() => {
          // setShowBaseToggleModal(false);
          // setIsMonthly(!isMonthly);
          if (basePlanDetails?.id) {
            downgradeSubscription();
          }
          setShowBaseToggleModal(false);
        }}
        style={{ width: '686px' }}
      >
        <Typography color="shade6">
          The ongoing monthly cost will be:
          <Typography variant="body" component="span">
            &nbsp;{basePrice ? toPrice(basePrice) : 0}/month
          </Typography>
          <Typography
            variant="body"
            weight="500"
            color="shade6"
            component="span"
          >
            &nbsp;effective from the next payment period.
          </Typography>
        </Typography>

        <div style={{ display: 'flex', marginTop: 24 }}>
          <Typography variant="body" color="shade6">
            By pressing Confirm, you will have the Pro features until the end of
            this payment period and will be downgraded as of the{' '}
            <Typography variant="body" component="span">
              {withinFreeTrial && remainingFreeTrialDays > 0
                ? moment(seventhFreeDay).format('MMMM Do, YYYY')
                : moment(currentPlanDetails?.subscription.renews_at)
                    .startOf('D')
                    .format('MMMM Do, YYYY')}
            </Typography>
            .
          </Typography>
        </div>
      </ConfirmationModal>

      <ConfirmationModal
        isOpen={showCancelModal}
        title={`Are you sure you want to cancel your ${
          theme.isSFM ? 'SFMblue' : 'ShoreTrade'
        } account?`}
        description="Your account will be deactivated on your next payment date and you will not be able to access any data in your account."
        actionText="No"
        cancelText="Cancel Subscription"
        onClickClose={() => setShowCancelModal(false)}
        action={() => setShowCancelModal(false)}
        cancel={() => {
          if (currentPlanDetails) {
            cancelSubscription(currentPlanDetails.plan.id);
          }
          setShowCancelModal(false);
        }}
        style={{ width: '686px' }}
      />
      <ConfirmationModal
        isOpen={showReverseMarketPlaceToggleModal}
        title="Add Reverse Marketplace package"
        actionText="Confirm"
        hideCancel
        onClickClose={() => setShowReverseMarketPlaceToggleModal(false)}
        action={() => {
          if (reverseMarketDetails) {
            updateSubscription(reverseMarketDetails?.id);
            setShowReverseMarketPlaceToggleModal(false);
          }
        }}
        style={{ width: '686px' }}
      >
        <Typography color="shade6">
          The ongoing monthly cost will be an additional:
          <Typography variant="body" component="span">
            &nbsp;
            {reverseMarketPrice ? toPrice(reverseMarketPrice) : 0}
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
          Pay the amount below to unlock your access now.
        </Typography>
        <div style={{ display: 'flex', margin: '8px 0' }}>
          <Typography variant="title5" weight="500">
            {reverseMarketDetails
              ? toPrice(reverseMarketDetails.remaining_price)
              : 0}
          </Typography>
        </div>
        <div style={{ display: 'flex', marginTop: 12 }}>
          <Typography variant="body" color="shade6">
            This is a pro rata cost to have Reverse Marketplace access for the
            remainder of your current payment period. Your total future monthly
            cost will be
            <Typography variant="body" component="span">
              &nbsp;
              {reverseMarketPrice &&
              currentPlanDetails &&
              basePlanDetails &&
              proPlanDetails
                ? toPrice(reverseMarketPrice + Number(currentMainPlanPrice))
                : 0}
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
        </div>
      </ConfirmationModal>
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

      {/* ==== Free Trial Pop Up Modals */}
      <ConfirmationModal
        isOpen={showFreeTrialPopUp.upgrade}
        title="Can't change subscription during free trial period"
        actionText="Ok"
        hideCancel
        onClickClose={() => {
          setShowFreeTrialPopUp({ ...showFreeTrialPopUp, upgrade: false });
        }}
        action={() => {
          setShowFreeTrialPopUp({ ...showFreeTrialPopUp, upgrade: false });
        }}
        style={{ width: '686px' }}
      >
        <div>
          <Typography color="shade6">
            You will be able to change your subscription at the end of your free
            trial.
          </Typography>
        </div>
      </ConfirmationModal>
      <ConfirmationModal
        isOpen={showFreeTrialPopUp.downgrade}
        title="Can't change subscription during free trial period"
        actionText="Ok"
        hideCancel
        onClickClose={() => {
          setShowFreeTrialPopUp({ ...showFreeTrialPopUp, downgrade: false });
        }}
        action={() => {
          setShowFreeTrialPopUp({ ...showFreeTrialPopUp, downgrade: false });
        }}
        style={{ width: '686px' }}
      >
        <div>
          <Typography color="shade6">
            You will be able to change your subscription at the end of your free
            trial.
          </Typography>
        </div>
      </ConfirmationModal>
    </Container>
  );
};
