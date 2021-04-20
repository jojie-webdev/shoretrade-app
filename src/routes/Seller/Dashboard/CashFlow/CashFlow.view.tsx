import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Spinner from 'components/base/Spinner/Spinner.view';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import numeral from 'numeral';
import { Row, Col } from 'react-grid-system';

import { CashFlowGeneratedProps } from './CashFlow.props';
import { Container, HeaderRow, SpinnerContainer } from './CashFlow.style';

const CashFlowView = (props: CashFlowGeneratedProps) => {
  const { breadCrumbSections } = props;
  return (
    <Container>
      <HeaderRow align="center" justify="between">
        <Breadcrumbs sections={breadCrumbSections} />
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
                `${v === 0 ? '' : `$${numeral(v).format('0.0a')}`}`
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
