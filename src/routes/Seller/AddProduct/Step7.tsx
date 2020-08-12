import React from 'react';

import DollarSign from 'components/base/SVG/DollarSign';
import TextField from 'components/base/TextField';
import { Row, Col } from 'react-grid-system';

import { Step7Wrapper } from './AddProduct.style';

function Step7() {
  return (
    <Step7Wrapper>
      <Row>
        <Col md={6} className="textfield-col">
          <TextField />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField />
        </Col>
        <Col md={12} className="textfield-col">
          <TextField />
        </Col>
      </Row>
    </Step7Wrapper>
  );
}

export default Step7;
