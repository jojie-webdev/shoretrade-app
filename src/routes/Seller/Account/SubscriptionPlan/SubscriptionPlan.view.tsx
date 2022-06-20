import React, { useEffect, useState } from 'react';

import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs';
import {
  Calendar,
  Mastercard,
  ShoretradeProSellerLogo,
  DollarSign,
} from 'components/base/SVG';
import TwoWayToggle from 'components/base/TwoWayToggle';
import Typography from 'components/base/Typography';
import AdditionalPlanFeatures from 'components/module/AdditionalPlanFeatures';
import ConfirmationModal from 'components/module/ConfirmationModal';
import CreditCardLogo from 'components/module/CreditCardLogo';
import PlanFeatures from 'components/module/PlanFeatures';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { REVERSE_MARKETPLACE_PRICE } from 'consts/prices';
import moment from 'moment';
import qs from 'qs';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { toPrice } from 'utils/String';
import { getButtonTextByStatus } from 'utils/SubscriptionPlan/getButtonTextByStatus';
import { useTheme } from 'utils/Theme';

import InclusionsList from './InclusionsList/InclusionsList.view';
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
} from './SubscriptionPlan.style';

export const SubscriptionPlanView = ({
  annualPrice,
  monthlyPrice,
  nextBillingDate,
  cardBrand,
  cardNumberMasked,
  planStatus,
  planInterval,
  features,
  subscriptionType,
  currentMarketSector,
  cancelSubscription,
  updateSubscription,
  renewSubscription,
  company,
}: SubscriptionPlanGeneratedProps) => {
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

  const reverseMarketPlace = features.find(
    (feature) => feature.alias === 'REVERSED_MARKETPLACE'
  );

  const getNextBillingAmount = () => {
    const reverseMarketPlacePrice = reverseMarketPlace
      ? REVERSE_MARKETPLACE_PRICE.SELLER
      : 0;

    return reverseMarketPlacePrice;
  };

  useEffect(() => {
    setIsMonthly(planInterval !== 'ANNUAL');
  }, [planInterval]);

  const ifForRenewal = ['CANCELLED', 'OVERDUE'].includes(planStatus);
  const interval = isMonthly ? 'MONTHLY' : 'ANNUAL';

  const selectedPlan = subscriptionType === 'STANDARD' ? 'Standard' : 'Premium';

  return (
    <Container>
      <BreadcrumbsContainer>
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Plan',
              link: SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
            },
          ]}
        />
      </BreadcrumbsContainer>

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
                  <CreditCardLogo type={cardBrand} />
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
                  <b>{getNextBillingAmount().toFixed(2)}</b>
                </Typography>
              </div>

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
            </BillingSection>
          </Col>

          <Col md={12} lg={8}>
            <PlanContainer>
              <Row gutterWidth={20} style={{ width: '100%' }}>
                <Col md={12}>
                  <IncusionSection>
                    <Typography
                      variant="title6"
                      weight="400"
                      customFont={theme.isSFM ? 'Canela' : 'Media Sans'}
                      color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
                    >
                      What's included in your subscription
                    </Typography>
                    <InclusionsList
                      selectedPlan={selectedPlan}
                      currentMarketSector={currentMarketSector}
                    />
                    <div>
                      <Typography
                        variant="label"
                        color="primary"
                        weight="400"
                        style={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel Subscription
                      </Typography>
                    </div>
                  </IncusionSection>

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
                            REVERSE_MARKETPLACE_PRICE.SELLER.toFixed(2)}
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
                        Marketpalce!
                      </Typography>
                    </ReverseMarketplace>

                    {reverseMarketPlace ? (
                      <div>
                        <Typography
                          variant="label"
                          color="primary"
                          weight="400"
                          style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                        >
                          Cancel Subscription
                        </Typography>
                      </div>
                    ) : (
                      <div>
                        <Typography
                          variant="label"
                          color="primary"
                          weight="400"
                          style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                        >
                          Update Subscription
                        </Typography>
                      </div>
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
