import React from 'react';

// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import numeral from 'numeral';
import { Row, Col } from 'react-grid-system';

import { CashFlowGeneratedProps } from './CashFlow.props';
import { Container, HeaderRow } from './CashFlow.style';

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
      <HeaderRow align="center" justify="between">
        <InnerRouteHeader title="Cash flow" fullRow={false} />
        <Typography variant="overline" color="shade6">
          {'1 may – 16 jun 2020'}
        </Typography>
      </HeaderRow>

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
    </Container>
  );
};

export default CashFlowView;
