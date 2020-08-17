import React from 'react';

import Interactions from 'components/base/Interactions';
import { Filter, UpArrow } from 'components/base/SVG/';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import LinePath from 'components/module/LinePath';
import numeral from 'numeral';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { MarketPriceDetailGeneratedProps } from './MarketPriceDetail.props';
import {
  Container,
  FilterButton,
  StockContainer,
} from './MarketPriceDetail.style';

const MOCK_DATA = {
  dates: [
    '2019-06-23',
    '2019-06-26',
    '2019-06-30',
    '2019-07-05',
    '2019-07-08',
    '2019-07-14',
    '2019-07-21',
    '2019-07-22',
    '2019-07-27',
  ],
  values: [
    3773.7,
    6081.6,
    6081.6,
    11331.6,
    10523.6,
    8263.1,
    6081.8,
    10806.7,
    11856.1,
  ],
};

const MarketPriceDetailView = (props: MarketPriceDetailGeneratedProps) => {
  const theme = useTheme();

  return (
    <Container>
      <Row justify="between" align="center" className="header-row">
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

      <Row className="stock-summary-row">
        <Col>
          <Interactions
            label="Paid"
            leftComponent={
              <Typography variant="title4" color="noshade">
                {'$12.79 – $17.25'}
              </Typography>
            }
            rightComponent={
              <StockContainer>
                <UpArrow />
                <Typography variant="caption" color="success" className="text">
                  +1.25%
                </Typography>
                <LinePath
                  width={60}
                  height={15}
                  data={MOCK_DATA}
                  cHeight={15}
                  cWidth={60}
                  cStyle={{ alignSelf: 'center' }}
                />
              </StockContainer>
            }
            onClick={() => {}}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <LineChart
            title="Paid"
            data={MOCK_DATA}
            yAxisLabelFormat={(v) =>
              `${v === 0 ? '' : `$${numeral(v).format('0a')}`}`
            }
            cHeight={263}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MarketPriceDetailView;
