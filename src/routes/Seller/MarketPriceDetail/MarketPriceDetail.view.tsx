import React from 'react';

import { Filter } from 'components/base/SVG/';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { MarketPriceDetailGeneratedProps } from './MarketPriceDetail.props';
import { Container, FilterButton } from './MarketPriceDetail.style';

const MarketPriceDetailView = (props: MarketPriceDetailGeneratedProps) => {
  const theme = useTheme();

  return (
    <Container>
      <Row justify="between" align="center">
        <InnerRouteHeader title="Pale Octopus" fullRow={false} />

        <FilterButton>
          <Typography
            variant="label"
            color="noshade"
            weight="500"
            className="btn-text"
          >
            Filters
          </Typography>

          <Filter />
        </FilterButton>
      </Row>

      <h1>MarketPriceDetail Screen</h1>
    </Container>
  );
};

export default MarketPriceDetailView;
