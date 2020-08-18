import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import { Row, Col } from 'react-grid-system';

import { DashboardGeneratedProps } from './Dashboard.props';
import { Container, FilterRow } from './Dashboard.style';

const DashboardView = (props: DashboardGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <FilterRow>
        <Col className="filter-col">
          <Button
            text="Custom"
            size="sm"
            variant="unselected"
            className="btn"
          />
          <Button
            text="FY19/20"
            size="sm"
            variant="unselected"
            className="btn"
          />
          <Button text="Q4" size="sm" variant="unselected" className="btn" />
          <Button text="Q3" size="sm" variant="unselected" className="btn" />
          <Button text="Q2" size="sm" variant="unselected" className="btn" />
          <Button text="Q1" size="sm" variant="unselected" className="btn" />
          <Button
            text="FY18/19"
            size="sm"
            variant="unselected"
            className="btn"
          />
          <Button
            text="FY17/18"
            size="sm"
            variant="unselected"
            className="btn"
          />
        </Col>
      </FilterRow>
      <h1>Dashboard Screen</h1>
    </Container>
  );
};

export default DashboardView;
