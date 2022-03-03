import React, { useEffect } from 'react';

import Typography from 'components/base/Typography';
import MarketSectorIcon from 'components/module/MarketSectorIcon';
import PlanFeatures from 'components/module/PlanFeatures';
import { Col } from 'react-grid-system';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionPlansActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import { BUYER_VARIATIONS, SELLER_VARIATIONS } from '../Register.constants';
import { YourPlanProps } from './YourPlan.props';
import {
  Container,
  FlexContainer,
  TopSection,
  ChangeMarketSector,
} from './YourPlan.style';

export const YourPlanView = ({
  currentMarketSector,
  previousStep,
}: YourPlanProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSeller = theme.appType === 'seller';
  const marketSectors = isSeller ? SELLER_VARIATIONS : BUYER_VARIATIONS;
  const plans = useSelector(
    (store: Store) => store.getSubscriptionPlans.data?.data || []
  );
  const currentPlan = plans.find(
    (plan) => plan.alias === `STANDARD_${currentMarketSector}`
  );

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
  }, []);

  return (
    <Container>
      <TopSection>
        <div className="left">
          <Typography
            variant="title4"
            color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
          >
            1 Month Free!
          </Typography>
          <FlexContainer>
            <Typography variant="label" color="shade6" weight="400">
              Then
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
            <Typography variant="label" color={isSeller ? 'noshade' : 'shade9'}>
              {
                marketSectors.find(
                  (sector) => sector.key === currentMarketSector
                )?.label
              }
            </Typography>
          </ChangeMarketSector>
        </div>
      </TopSection>

      <PlanFeatures />
    </Container>
  );
};
