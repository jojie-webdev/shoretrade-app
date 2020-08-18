import React from 'react';

// import { useTheme } from 'utils/Theme';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import numeral from 'numeral';
import { Row, Col } from 'react-grid-system';

import { CashFlowGeneratedProps } from './CashFlow.props';
import { Container } from './CashFlow.style';

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

const CashFlowView = (props: CashFlowGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <Row>
        <InnerRouteHeader title="Cash flow" />
      </Row>

      <Row style={{ marginBottom: '56px' }}>
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

      <Row>
        <Col>
          <LineChart
            title="Pending"
            data={MOCK_DATA}
            yAxisLabelFormat={(v) =>
              `${v === 0 ? '' : `$${numeral(v).format('0a')}`}`
            }
            cHeight={164}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CashFlowView;
