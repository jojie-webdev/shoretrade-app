import React from 'react';

import Interactions from 'components/base/Interactions';
import { Row, Col } from 'react-grid-system';

import { Step8Props } from './Step8.props';
import { Container } from './Step8.style';

function Step8({ onClickNext }: Step8Props) {
  return (
    <Container>
      <Row>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Type"
            value="Baby Octopus"
            type="edit"
            onClick={() => {}}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Specifications"
            value="Fresh, While, Not Tenderised"
            type="edit"
            onClick={() => {}}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Size"
            value="Baby → Medium"
            type="edit"
            onClick={() => {}}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Boxes"
            value="2"
            type="edit"
            onClick={() => {}}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Photos"
            value="5"
            type="edit"
            onClick={() => {}}
          />
        </Col>
        <Col md={12} className="interaction-col">
          <Interactions
            label="Catch details"
            value="Mon 17 Apr 2020"
            type="edit"
            onClick={() => {}}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Step8;
