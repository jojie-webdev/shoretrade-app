import React from 'react';

import {
  DashboardOutline,
  Net,
  BoxOutline,
  Fishes,
  Swatchbook,
  SearchOutline,
  ListOutline,
  Bell,
  Sold,
  Calendar,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { MARKET_GROUP_1 } from 'consts/markets';
import { yourPlanFeaturesList } from 'consts/subcriptionPlan';
import { Col, Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

// import { useTheme } from 'utils/Theme';
import { InclusionsListGeneratedProps } from './InclusionsList.props';
import { Container } from './InclusionsList.style';

const InclusionsListView = (props: InclusionsListGeneratedProps) => {
  const { selectedPlan, currentMarketSector } = props;
  const theme = useTheme();

  const getIcon = (featureName: string) => {
    switch (featureName) {
      case 'DASHBOARD':
        return (
          <DashboardOutline width={14} height={14} fill={theme.brand.primary} />
        );
      case 'LISTINGS':
        return <BoxOutline width={14} height={14} fill={theme.brand.primary} />;
      case 'SALES':
        return <Sold width={14} height={14} fill={theme.brand.primary} />;
      case 'NOTIFICATIONS':
        return <Bell width={14} height={14} fill={theme.brand.primary} />;
      case 'CATEGORIES':
        return <Swatchbook width={14} height={14} fill={theme.brand.primary} />;
      case 'MARKET_REQUESTS':
        return <Fishes width={14} height={14} fill={theme.brand.primary} />;
      case 'AUTOMATION':
        return <Calendar width={14} height={14} fill={theme.brand.primary} />;
      case 'ORDERS':
        return (
          <ListOutline width={14} height={14} fill={theme.brand.primary} />
        );
      case 'SEARCH':
        return (
          <SearchOutline width={14} height={14} fill={theme.brand.primary} />
        );
      case 'MARKETPLACE':
        return <Net width={14} height={14} fill={theme.brand.primary} />;
    }
  };

  type planFeatureListType = typeof yourPlanFeaturesList;
  const marketSector =
    currentMarketSector && MARKET_GROUP_1.includes(currentMarketSector)
      ? 'group_1'
      : 'group_2';

  const buyerPlanHandler = () => {
    return theme.appType && selectedPlan && marketSector
      ? `${theme.appType}_${selectedPlan?.toLocaleLowerCase()}_${marketSector}`
      : 'buyer_standard_group_1';
  };

  const planFeatureList =
    theme.appType === 'buyer' ? buyerPlanHandler() : theme.appType;

  const skippedFeatures =
    marketSector === 'group_1'
      ? ['COST', 'PLUS', 'LINKED_ACCOUNTS']
      : ['COST', 'PLUS', 'BUYING_ADDRESSES', 'LINKED_ACCOUNTS'];

  return (
    <Container isSeller={theme.appType === 'seller'}>
      {yourPlanFeaturesList[planFeatureList as keyof planFeatureListType].map(
        (feat: any) => {
          if (skippedFeatures.includes(feat.alias)) return;

          return (
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
                  color={theme.appType === 'seller' ? 'shade6' : 'shade7'}
                  weight="400"
                >
                  {feat.description}
                </Typography>
              </Col>
            </Row>
          );
        }
      )}
    </Container>
  );
};

export default InclusionsListView;
