import React from 'react';

import Spinner from 'components/base/Spinner/Spinner.view';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import numeral from 'numeral';
import { Row, Col } from 'react-grid-system';

import { CashFlowGeneratedProps } from './CashFlow.props';
import { Container, HeaderRow, SpinnerContainer } from './CashFlow.style';

const CashFlowView = (props: CashFlowGeneratedProps) => {
  return (
    <Container>
      <HeaderRow align="center" justify="between">
        <InnerRouteHeader title={props.innerRouteTitle} fullRow={false} />
        <Typography variant="overline" color="shade6">
          {props.name}
        </Typography>
      </HeaderRow>

      {props.isLoading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Row style={{ marginBottom: '56px' }}>
          <Col>
            <LineChart
              title="Paid"
              data={props.data}
              yAxisLabelFormat={(v) =>
                `${v === 0 ? '' : `$${numeral(v).format('0a')}`}`
              }
              cHeight={263}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CashFlowView;
