import React, { useEffect } from 'react';

import {
  ArrowGrowth,
  Bell,
  BoxOutline,
  Cog,
  DashboardOutline,
  ListOutline,
  SearchOutline,
  Swatchbook,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MarketSectorIcon from 'components/module/MarketSectorIcon';
import { yourPlanFeaturesList } from 'consts/subcriptionPlan';
import { Col, Row } from 'react-grid-system';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptionPlansActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import { BUYER_VARIATIONS, SELLER_VARIATIONS } from '../Register.constants';
import { YourPlanProps } from './YourPlan.props';
import {
  Container,
  FlexContainer,
  FeaturesContainer,
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

  const getIcon = (featureName: string) => {
    switch (featureName) {
      case 'DASHBOARD':
        return (
          <DashboardOutline width={14} height={14} fill={theme.brand.primary} />
        );
      case 'LISTINGS':
      case 'OPTIMISED':
        return (
          <ListOutline width={14} height={14} fill={theme.brand.primary} />
        );
      case 'AUTOMATION':
        return <Cog width={14} height={14} fill={theme.brand.primary} />;
      case 'SHIPPING':
        return <BoxOutline width={14} height={14} fill={theme.brand.primary} />;
      case 'PRODUCT_RANGE':
        return <Swatchbook width={14} height={14} fill={theme.brand.primary} />;
      case 'INSIGHT':
        return (
          <SearchOutline width={14} height={14} fill={theme.brand.primary} />
        );
      case 'SALES':
        return (
          <ArrowGrowth width={14} height={14} fill={theme.brand.primary} />
        );
      case 'NOTIFICATIONS':
        return <Bell width={14} height={14} fill={theme.brand.primary} />;
    }
  };

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
            <div className="change-btn" onClick={() => previousStep()}>
              <Typography variant="caption" color="primary">
                <u>Change</u>
              </Typography>
            </div>
          </ChangeMarketSector>
        </div>
      </TopSection>

      <FeaturesContainer isSeller={isSeller}>
        {yourPlanFeaturesList[theme.appType].map((feat) => (
          <Row key={feat.alias} gutterWidth={16}>
            <Col xs="content">
              <div className="icon-holder">{getIcon(feat.alias)}</div>
            </Col>
            <Col>
              <Typography
                variant="body"
                color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
              >
                {feat.name}
              </Typography>
              <Typography
                variant="label"
                color={theme.appType === 'seller' ? 'shade3' : 'shade7'}
                weight="400"
              >
                {feat.description}
              </Typography>
            </Col>
          </Row>
        ))}
      </FeaturesContainer>
    </Container>
  );
};
