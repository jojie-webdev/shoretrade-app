import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Spinner from 'components/base/Spinner/Spinner.view';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import LineChart from 'components/module/LineChart';
import { BREAKPOINTS } from 'consts/breakpoints';
import numeral from 'numeral';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { CashFlowGeneratedProps } from './CashFlow.props';
import { Container, HeaderRow, SpinnerContainer } from './CashFlow.style';

const CashFlowView = (props: CashFlowGeneratedProps) => {
  const { breadCrumbSections } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  return (
    <Container>
      <HeaderRow align="center" justify="between">
        {isSmallScreen ? (
          <>
            <InnerRouteHeader title={props.innerRouteTitle} fullRow={false} />
            <Typography variant="overline" color="shade6" className="text">
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
