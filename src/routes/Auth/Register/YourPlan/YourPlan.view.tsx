import React, { useState } from 'react';

import Checkbox from 'components/base/Checkbox';
import Typography from 'components/base/Typography';
import AdditionalPlanFeatures from 'components/module/AdditionalPlanFeatures';
import MarketSectorIcon from 'components/module/MarketSectorIcon';
import PlanFeatures from 'components/module/PlanFeatures';
import { MARKET_GROUP_1 } from 'consts/markets';
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
} from './YourPlan.style';

const YourPlanView = ({
  currentMarketSector,
  previousStep,
  currentPlan,
  selectedPlan,
  additionalSubscriptionHandler,
  step,
}: YourPlanGeneratedProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const marketSectors = isSeller ? SELLER_VARIATIONS : BUYER_VARIATIONS;

  const [additionalSubs, setadditionalSubs] = useState(false);

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
      {!isSeller && step !== 4 && (
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

      <PlanFeatures
        selectedPlan={selectedPlan}
        currentMarketSector={currentMarketSector}
        highlighthandler={highlighthandler}
      />

      <AdditionalSubscription>
        <CheckboxContainer>
          <Checkbox
            checked={additionalSubs}
            allowTransparency
            onClick={() => {
              setAdditionalSubscription(!additionalSubs);
            }}
          />
        </CheckboxContainer>
        <Typography variant="body">
          Additonal subscription for $49.99/month
        </Typography>
      </AdditionalSubscription>

      <AdditionalPlanFeatures
        selectedPlan={selectedPlan}
        currentMarketSector={currentMarketSector}
      />

      {selectedPlan === 'Standard' && (
        <Footer>
          <Typography variant="caption" weight="regular">
            *The Transaction Value is the total value of the products in your
            order excluding any crate fees and shipping costs.
          </Typography>
          {MARKET_GROUP_1.includes(currentMarketSector) && (
            <Typography variant="caption" weight="regular">
              *Minimum 3 month sign up, starting from your account approval
              date.
            </Typography>
          )}
        </Footer>
      )}
    </Container>
  );
};

export default YourPlanView;
