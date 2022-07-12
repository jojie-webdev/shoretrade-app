import React, { useState } from 'react';

import Checkbox from 'components/base/Checkbox';
import Typography from 'components/base/Typography';
import AdditionalPlanFeatures from 'components/module/AdditionalPlanFeatures';
import MarketSectorIcon from 'components/module/MarketSectorIcon';
import PlanFeatures from 'components/module/PlanFeatures';
import { MARKET_GROUP_1 } from 'consts/markets';
import { REVERSE_MARKETPLACE_PRICE } from 'consts/prices';
import { Col } from 'react-grid-system';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionPlansActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import { BUYER_VARIATIONS, SELLER_VARIATIONS } from '../Register.constants';
import { YourPlanGeneratedProps } from './YourPlan.props';
import {
  Container,
  FlexContainer,
  TopSection,
  ChangeMarketSector,
  AdditionalSubscription,
  CheckboxContainer,
  Footer,
  BenefitsList,
  ReverseMarketFreePerks,
  ReverseMarketPerkItems,
} from './YourPlan.style';

const YourPlanView = ({
  currentMarketSector,
  previousStep,
  currentPlan,
  selectedPlan,
  additionalSubscriptionHandler,
  hasReverseMarketPlace,
  step,
}: YourPlanGeneratedProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const marketSectors = isSeller ? SELLER_VARIATIONS : BUYER_VARIATIONS;

  const [additionalSubs, setadditionalSubs] = useState(hasReverseMarketPlace);

  const setAdditionalSubscription = (hasAddOn: boolean) => {
    setadditionalSubs(hasAddOn);
    additionalSubscriptionHandler(hasAddOn);
  };

  const [highlight, setHighlight] = useState('1 Month Free');
  const highlighthandler = (value: string) => {
    setHighlight(value);
  };

  return (
    <Container>
      {!isSeller && step !== 4 && step !== 5 && (
        <TopSection>
          <div className="left">
            <Typography
              variant="title4"
              color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
            >
              {highlight}
            </Typography>
            <FlexContainer>
              <Typography variant="label" color="shade6" weight="400">
                then
              </Typography>
              <Typography
                variant="label"
                color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
                weight="400"
              >
                &nbsp;${currentPlan?.price}*
              </Typography>
              <Typography variant="label" color="shade6" weight="400">
                &nbsp;/ month
              </Typography>
            </FlexContainer>
            <Typography variant="caption" color="shade6" weight="400">
              *Price based on your Market Sector
            </Typography>
          </div>

          <div className="right">
            <ChangeMarketSector isSeller={isSeller}>
              <MarketSectorIcon variant={currentMarketSector} width={40} />
              <Typography
                variant="label"
                color={isSeller ? 'noshade' : 'shade9'}
              >
                {
                  marketSectors.find(
                    (sector) => sector.key === currentMarketSector
                  )?.label
                }
              </Typography>
            </ChangeMarketSector>
          </div>
        </TopSection>
      )}
      {/* 
      {!isSeller && (
        <PlanFeatures
          selectedPlan={selectedPlan}
          currentMarketSector={currentMarketSector}
          highlighthandler={highlighthandler}
        />
      )} */}

      {isSeller && !theme.isSFM && (
        <AdditionalSubscription>
          <CheckboxContainer>
            <Checkbox
              checked={hasReverseMarketPlace}
              onClick={() => {
                setAdditionalSubscription(!additionalSubs);
              }}
            />
          </CheckboxContainer>
          <Typography
            variant="body"
            color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
          >
            {!isSeller
              ? `Additional subscription for $${REVERSE_MARKETPLACE_PRICE.BUYER.toFixed(
                  2
                )}/month`
              : `Additional subscription for $${REVERSE_MARKETPLACE_PRICE.SELLER.toFixed(
                  2
                )}/month`}
          </Typography>
        </AdditionalSubscription>
      )}

      {isSeller && theme.isSFM && (
        <ReverseMarketFreePerks>
          <Typography
            variant="label"
            weight="400"
            color={theme.appType === 'seller' ? 'shade6' : 'shade9'}
          >
            FREE to signup to sell your products. Get commission on each sale
            depending on the product type.
          </Typography>
          <ReverseMarketPerkItems>
            <Typography
              variant="label"
              weight="400"
              color={theme.appType === 'seller' ? 'shade6' : 'shade9'}
            >
              7% for whole products
            </Typography>
            <Typography
              variant="label"
              weight="400"
              color={theme.appType === 'seller' ? 'shade6' : 'shade9'}
            >
              4% for processed products
            </Typography>
          </ReverseMarketPerkItems>
          <Typography
            variant="label"
            weight="400"
            color={theme.appType === 'seller' ? 'shade6' : 'shade9'}
          >
            Would you like to get access to Reverse Marketplace?
          </Typography>
        </ReverseMarketFreePerks>
      )}

      {isSeller && (
        <AdditionalPlanFeatures
          selectedPlan={selectedPlan}
          currentMarketSector={currentMarketSector}
        />
      )}

      {!isSeller && (
        <Footer>
          <Typography
            variant="label"
            weight="400"
            color={theme.appType === 'seller' ? 'shade6' : 'shade9'}
          >
            *The Transaction Value is the total value of the products in your
            order excluding any crate fees and shipping costs.
          </Typography>
        </Footer>
      )}

      {isSeller && (
        <BenefitsList>
          <li>
            <Typography color="shade6" variant="label">
              Gain more sales by offering your products directly to individual
              Buyers.
            </Typography>
          </li>
          <li>
            <Typography color="shade6" variant="label">
              Tailor your products based on known demand and reduce your product
              wastage.
            </Typography>
          </li>
          <li>
            <Typography color="shade6" variant="label">
              Make offers and negotiate in real time with Buyers.
            </Typography>
          </li>
          <li>
            <Typography color="shade6" variant="label">
              Get notified for new Buyer Requests and snap up the sales.
            </Typography>
          </li>
          <li>
            <Typography color="shade6" variant="label">
              While waiting for bites on your existing listings, make offers
              straight to Buyers that want the product.
            </Typography>
          </li>
        </BenefitsList>
      )}

      {isSeller && theme.isSFM && (
        <AdditionalSubscription>
          <CheckboxContainer>
            <Checkbox
              checked={hasReverseMarketPlace}
              onClick={() => {
                setAdditionalSubscription(!additionalSubs);
              }}
            />
          </CheckboxContainer>
          <Typography
            variant="body"
            color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
          >
            {!isSeller
              ? `Additional subscription for $${REVERSE_MARKETPLACE_PRICE.BUYER.toFixed(
                  2
                )}/month`
              : `Additional subscription for $${REVERSE_MARKETPLACE_PRICE.SELLER.toFixed(
                  2
                )}/month`}
          </Typography>
        </AdditionalSubscription>
      )}
    </Container>
  );
};

export default YourPlanView;
