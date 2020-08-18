import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import LinePath from 'components/module/LinePath';
import { Row, Col } from 'react-grid-system';

import { DashboardGeneratedProps } from './Dashboard.props';
import {
  Container,
  FilterRow,
  SalesCard,
  TotalSalesRow,
  MonthlyRow,
} from './Dashboard.style';

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

const FilterHeader = () => (
  <FilterRow>
    <Col className="filter-col">
      <Button text="Custom" size="sm" variant="unselected" className="btn" />
      <Button text="FY19/20" size="sm" variant="unselected" className="btn" />
      <Button text="Q4" size="sm" variant="unselected" className="btn" />
      <Button text="Q3" size="sm" variant="unselected" className="btn" />
      <Button text="Q2" size="sm" variant="unselected" className="btn" />
      <Button text="Q1" size="sm" variant="unselected" className="btn" />
      <Button text="FY18/19" size="sm" variant="unselected" className="btn" />
      <Button text="FY17/18" size="sm" variant="unselected" className="btn" />
    </Col>
  </FilterRow>
);

const TotalSales = () => (
  <TotalSalesRow gutterWidth={24}>
    <Col md={12} className="title-col">
      <Typography variant="label" color="shade6">
        Total Sales
      </Typography>
    </Col>
    <Col md={5}>
      <SalesCard>
        <Typography variant="overline" color="shade6" className="overline">
          Paid
        </Typography>
        <Typography variant="title4" color="noshade">
          $1350k
        </Typography>
      </SalesCard>
    </Col>
    <Col md={5}>
      <SalesCard>
        <Typography variant="overline" color="shade6" className="overline">
          Pending
        </Typography>
        <Typography variant="title4" color="noshade">
          $1350k
        </Typography>
      </SalesCard>
    </Col>
  </TotalSalesRow>
);

const MonthlySales = () => (
  <div style={{ overflow: 'auto' }}>
    <Row>
      <Col md={12} className="title-col">
        <Typography variant="label" color="shade6">
          Total Sales
        </Typography>
      </Col>
    </Row>
    <MonthlyRow nowrap gutterWidth={24}>
      {[1, 2, 3, 4, 5].map((num) => (
        <Col md={3} key={num}>
          <SalesCard>
            <Typography variant="overline" color="shade6" className="overline">
              May
            </Typography>
            <Typography variant="title4" color="noshade">
              $5.5k
            </Typography>

            <div>
              {/* <UpArrow /> */}

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
            </div>
          </SalesCard>
        </Col>
      ))}
    </MonthlyRow>
  </div>
);

const DashboardView = (props: DashboardGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <FilterHeader />
      <TotalSales />
      <MonthlySales />
    </Container>
  );
};

export default DashboardView;
