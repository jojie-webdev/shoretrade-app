import React from 'react';

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
import { yourPlanFeaturesList } from 'consts/subcriptionPlan';
import { Col, Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { Container } from './PlanFeatures.style';

const PlanFeatures = (): JSX.Element => {
  const theme = useTheme();

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
    <Container isSeller={theme.appType === 'seller'}>
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
    </Container>
  );
};

export default React.memo(PlanFeatures);
