import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import { BREAKPOINTS } from 'consts/breakpoints';
import numeral from 'numeral';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { CashFlowGeneratedProps } from './CashFlow.props';
import { Container, HeaderRow } from './CashFlow.style';

const CashFlowView = (props: CashFlowGeneratedProps) => {
  const { breadCrumbSections, paidCashFlow, pendingCashFlow } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      <HeaderRow align="center" justify="between">
        {isSmallScreen ? (
          <>
            <InnerRouteHeader title={props.innerRouteTitle} fullRow={false} />
          </>
        ) : (
          <div className="padding-bread">
            <Breadcrumbs sections={breadCrumbSections} />
          </div>
        )}
      </HeaderRow>

      <Row style={{ marginBottom: '56px' }}>
        <Col>
          <LineChart
            title="Paid"
            data={paidCashFlow}
            yAxisLabelFormat={(v) =>
              `${v === 0 ? '' : `$${numeral(v).format('0.0a')}`}`
            }
            cHeight={263}
            stroke="success"
            strokeWidth={1.5}
            dotSize={2}
          />

          <LineChart
            title="Pending"
            data={pendingCashFlow}
            yAxisLabelFormat={(v) =>
              `${v === 0 ? '' : `$${numeral(v).format('0.0a')}`}`
            }
            cHeight={263}
            stroke="warning"
            strokeWidth={1.5}
            dotSize={2}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CashFlowView;
