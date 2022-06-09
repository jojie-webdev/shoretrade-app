import React from 'react';

import Typography from 'components/base/Typography';
import { MARKET_GROUP_1 } from 'consts/markets';
import { yourPlanFeaturesList } from 'consts/subcriptionPlan';
import { Col, Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

// import { useTheme } from 'utils/Theme';
import { SpecialInclusionsListGeneratedProps } from './SpecialInclusionsList.props';
import { Container } from './SpecialInclusionsList.style';

const SpecialInclusionsListView = (
  props: SpecialInclusionsListGeneratedProps
) => {
  const { selectedPlan, currentMarketSector } = props;
  const theme = useTheme();

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
      ? ['LINKED_ACCOUNTS']
      : ['BUYING_ADDRESSES', 'LINKED_ACCOUNTS'];

  return (
    <Container isSeller={theme.appType === 'seller'}>
      {yourPlanFeaturesList[planFeatureList as keyof planFeatureListType].map(
        (feat: any) => {
          if (skippedFeatures.includes(feat.alias)) {
            return (
              <Row key={feat.alias} gutterWidth={16}>
                <Col>
                  <Typography
                    variant="label"
                    color={theme.appType === 'seller' ? 'shade6' : 'shade7'}
                    weight="400"
                  >
                    {feat.name}
                  </Typography>
                </Col>
              </Row>
            );
          }
        }
      )}
    </Container>
  );
};

export default SpecialInclusionsListView;
