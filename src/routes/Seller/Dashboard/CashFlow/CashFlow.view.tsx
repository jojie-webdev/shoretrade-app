import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import Loading from 'components/module/Loading';
import { BREAKPOINTS } from 'consts/breakpoints';
import numeral from 'numeral';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { CashFlowGeneratedProps } from './CashFlow.props';
import { Container, HeaderRow } from './CashFlow.style';

const CashFlowView = (props: CashFlowGeneratedProps) => {
  const { breadCrumbSections } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      <HeaderRow align="center" justify="between">
        {isSmallScreen ? (
          <>
            <InnerRouteHeader title={props.innerRouteTitle} fullRow={false} />
            <Typography
              variant="overline"
              color="shade6"
              className={
                props.innerRouteTitle === 'Cash Flow Details'
                  ? 'text-long'
                  : 'text'
              }
            >
              {props.name}
            </Typography>
          </>
        ) : (
          <div className="padding-bread">
            <Breadcrumbs sections={breadCrumbSections} />
          </div>
        )}
      </HeaderRow>

      {props.isLoading ? (
        <Loading />
      ) : (
        <Row style={{ marginBottom: '56px' }}>
          <Col>
            <LineChart
              title="Paid"
              isEarning={props.isEarning}
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
