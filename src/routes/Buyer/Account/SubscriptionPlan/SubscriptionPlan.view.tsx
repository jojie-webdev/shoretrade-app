import React, { useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import {
  Calendar,
  Mastercard,
  ShoretradeProBuyerLogo,
} from 'components/base/SVG';
import Toggle from 'components/base/Toggle';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import PlanFeatures from 'components/module/PlanFeatures';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { SubscriptionPlanGeneratedProps } from './SubscriptionPlan.props';
import {
  BillingSection,
  BreadcrumbsContainer,
  Container,
  DicountContainer,
  PaymentMethodSection,
  PlanSection,
  SubscriptionContainer,
  ToggleContainer,
} from './SubscriptionPlan.style';

export const SubscriptionPlanView = ({
  plans,
  activePlan,
}: SubscriptionPlanGeneratedProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS.sm });
  const isSmallDesktop = useMediaQuery({
    query: '(min-width: 768px) and (max-width: 1439px)',
  });
  const [isAnnual, setIsAnnual] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const annualPlan = plans.find((plan) => plan.alias.includes('YEARLY'));
  const monthlyPlan = plans.find((plan) => !plan.alias.includes('YEARLY'));
  const price = (isAnnual ? annualPlan?.price : monthlyPlan?.price) || '0';
  const endDateFormatted =
    activePlan && moment(activePlan.end_date).format('D MMMM YYYY');

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

      <DicountContainer>
        <div className="discount">
          <Typography weight="400">10% OFF</Typography>
        </div>
      </DicountContainer>

      <ToggleContainer>
        <Typography variant="label" weight="400" style={{ marginRight: '8px' }}>
          Monthly
        </Typography>

        <Toggle
          checked={isAnnual}
          onClick={() => {
            setIsAnnual(!isAnnual);
            setShowToggleModal(true);
          }}
        />

        <Typography variant="label" weight="400" style={{ marginLeft: '8px' }}>
          Annually
        </Typography>
      </ToggleContainer>

      <SubscriptionContainer>
        <Row
          gutterWidth={20}
          style={{ width: isMobile ? '100%' : isSmallDesktop ? '85%' : '65%' }}
        >
          <Col xs={12} sm={6}>
            <PaymentMethodSection className="section">
              <Typography variant="body" weight="400">
                Your Payment Method
              </Typography>

              <div className="card-info">
                <div className="card-icon">
                  <Mastercard />
                </div>
                <Typography variant="body">**** **** **** 4242</Typography>
              </div>

              <Link
                className="see-payment-methods"
                to={BUYER_ACCOUNT_ROUTES.BANK_DETAILS}
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
              <Typography variant="body" weight="400">
                Next Billing Date
              </Typography>

              <div className="billing-date">
                <Calendar fill={theme.grey.shade7} />
                <Typography variant="body" style={{ marginLeft: '6px' }}>
                  {endDateFormatted}
                </Typography>
              </div>

              <Link
                className="see-payment-history"
                to={BUYER_ACCOUNT_ROUTES.BALANCE_HISTORY}
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

          <Col xs={12} sm={6}>
            <PlanSection className="section">
              <ShoretradeProBuyerLogo />
              <Typography
                variant="label"
                weight="400"
                color="shade7"
                style={{ marginTop: '8px' }}
              >
                Gain access to renowned Seafood Sellers to purchase products for
                your business.
              </Typography>

              <div className="plan-rate">
                <Typography variant="title3" weight="400">
                  ${price}
                </Typography>
                <Typography variant="label" weight="400" color="shade6">
                  &nbsp;/ {isAnnual ? 'Year' : 'Month'}
                </Typography>
              </div>

              <PlanFeatures />

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
            </PlanSection>
          </Col>
        </Row>
      </SubscriptionContainer>
      <ConfirmationModal
        isOpen={showToggleModal}
        title={`Change to ${isAnnual ? 'annual' : 'monthly'} billing?`}
        actionText="Confirm new plan"
        onClickClose={() => {
          setShowToggleModal(false);
          setIsAnnual(!isAnnual);
        }}
        action={() => setShowToggleModal(false)}
        style={{ width: '686px' }}
      >
        <Typography color="shade7">Your new plan will be:</Typography>
        <div style={{ display: 'flex', margin: '8px 0' }}>
          <Typography variant="title3" weight="400">
            ${price}
          </Typography>
          <Typography variant="label" weight="400" color="shade6">
            &nbsp;/ {isAnnual ? 'Year' : 'Month'}
          </Typography>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography variant="body" weight="400" color="shade7">
            You will be charged
          </Typography>
          <Typography variant="body" weight="700">
            &nbsp;${price}
          </Typography>
          <Typography variant="body" weight="400" color="shade7">
            &nbsp;on
          </Typography>
          <Typography variant="body" weight="700">
            &nbsp;{endDateFormatted}
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
    </Container>
  );
};
