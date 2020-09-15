import React from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Select from 'components/base/Select';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';

import { Step4Props } from './Step4.props';
import { Container } from './Step4.style';

function Step4({ onClickNext }: Step4Props) {
  return (
    <Container>
      <Row className="select-row">
        <Col md={6} className="select-col">
          <Select options={['One', 'Two']} label="Size From" />
        </Col>
        <Col md={6}>
          <Select options={['One', 'Two']} label="Size To" />
        </Col>
      </Row>

      <Row className="or-row">
        <Col className="or-col">
          <div className="line left" />
          <Typography variant="overline" color="shade6">
            {' '}
            OR
          </Typography>
          <div className="line right" />
        </Col>
      </Row>

      <Row className="checkbox-row">
        <Col className="checkbox-col">
          <Checkbox />
          <Typography color="noshade" className="text">
            Ungraded
          </Typography>
        </Col>
      </Row>

      <Row justify="end" style={{ padding: '0 15px' }}>
        <Button text="Next" onClick={onClickNext}></Button>
      </Row>
    </Container>
  );
}

export default Step4;
