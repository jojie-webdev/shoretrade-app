import React, { useEffect } from 'react';

import {
  Home2,
  Account,
  Net,
  Union,
  Fishes,
  CreditCardOutline,
  TagAlt,
  Truck,
  ListOutline,
  Anchor,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { MARKET_GROUP_1 } from 'consts/markets';
import { yourPlanFeaturesList } from 'consts/subcriptionPlan';
import { Col, Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { PlanFeaturesProps } from './PlanFeatures.props';
import { Container } from './PlanFeatures.style';

const PlanFeatures = (props: PlanFeaturesProps): JSX.Element => {
  const { selectedPlan, currentMarketSector } = props;
  const theme = useTheme();

  const getIcon = (featureName: string) => {
    switch (featureName) {
      case 'FREE_MONTH':
        return <Anchor width={14} height={14} fill={theme.brand.primary} />;
      case 'LISTINGS':
      case 'COST':
        return (
          <CreditCardOutline
            width={14}
            height={14}
            fill={theme.brand.primary}
          />
        );
      case 'PLUS':
        return <TagAlt width={14} height={14} fill={theme.brand.primary} />;
      case 'DIRECT_SALES':
        return <Union width={14} height={14} fill={theme.brand.primary} />;
      case 'PRE_AUCTION':
        return (
          <ListOutline width={14} height={14} fill={theme.brand.primary} />
        );
      case 'AQUAFUTURE':
        return <Fishes width={14} height={14} fill={theme.brand.primary} />;
      case 'DELIVERY':
        return <Truck width={14} height={14} fill={theme.brand.primary} />;
      case 'BUYING_ADDRESSES':
        return <Home2 width={14} height={14} fill={theme.brand.primary} />;
      case 'LINKED_ACCOUNTS':
        return <Account width={14} height={14} fill={theme.brand.primary} />;
      case 'MARKETPLACE':
        return <Net width={14} height={14} fill={theme.brand.primary} />;
      case 'PROFILE':
        return <Account width={14} height={14} fill={theme.brand.primary} />;
    }
  };

  type planFeatureListType = typeof yourPlanFeaturesList;

  const buyerPlanHandler = () => {
    return selectedPlan === 'Standard'
      ? `${theme.appType}_base`
      : `${theme.appType}_pro`;
  };

  const planFeatureList =
    theme.appType === 'buyer' ? buyerPlanHandler() : theme.appType;

  return (
    <Container isSeller={theme.appType === 'seller'}>
      {yourPlanFeaturesList[planFeatureList as keyof planFeatureListType].map(
        (feat: any) => (
          <Row key={feat.alias} gutterWidth={16}>
            <Col xs="content">
              <div className="icon-holder">{getIcon(feat.alias)}</div>
            </Col>
            <Col>
              <Typography
                variant="body"
                color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
              >
                {feat.title}
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
        )
      )}
    </Container>
  );
};

export default React.memo(PlanFeatures);
