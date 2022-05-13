import React from 'react';

// import { useTheme } from 'utils/Theme';
import { Net, Hook } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { additionalSubscriptionPlan } from 'consts/additionalSubscriptionPlan';
import { MARKET_GROUP_1 } from 'consts/markets';
import { Col, Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { AdditionalPlanFeaturesProps } from './AdditionalPlanFeatures.props';
import { Container } from './AdditionalPlanFeatures.style';

const AdditionalPlanFeatures = (
  props: AdditionalPlanFeaturesProps
): JSX.Element => {
  const { selectedPlan, currentMarketSector } = props;
  const theme = useTheme();

  const getIcon = (featureName: string) => {
    switch (featureName) {
      case 'MARKETPLACE':
        return <Net width={14} height={14} fill={theme.brand.primary} />;
      case 'SUSTAINABILITY':
        return <Hook width={14} height={14} fill={theme.brand.primary} />;
    }
  };

  type additionalPlanFeatureListType = typeof additionalSubscriptionPlan;

  const buyerPlanHandler = () => {
    const marketSector =
      currentMarketSector && MARKET_GROUP_1.includes(currentMarketSector)
        ? 'group_1'
        : 'group_2';

    return theme.appType && selectedPlan && marketSector
      ? `${theme.appType}_${selectedPlan?.toLocaleLowerCase()}_${marketSector}`
      : 'buyer_standard_group_1';
  };

  const additionalPlanFeatureList =
    theme.appType === 'buyer' ? buyerPlanHandler() : theme.appType;

  return (
    <Container isSeller={theme.appType === 'seller'}>
      {additionalSubscriptionPlan[
        additionalPlanFeatureList as keyof additionalPlanFeatureListType
      ].map((feat) => (
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
      ))}
    </Container>
  );
};

export default React.memo(AdditionalPlanFeatures);
