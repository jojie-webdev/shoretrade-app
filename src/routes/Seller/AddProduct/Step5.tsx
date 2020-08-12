import React from 'react';

import Button from 'components/base/Button';
import { Camera, Subtract } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import { Row, Col } from 'react-grid-system';

import { Step5Wrapper, DeleteBadge } from './AddProduct.style';

function Step5() {
  return (
    <Step5Wrapper>
      <Row className="preview-row">
        <Col md={6} className="preview-col">
          <img src="" alt="Product Preview" className="img-preview" />
          <DeleteBadge>
            <Subtract />
            <Typography color="shade2" variant="label" className="badge-text">
              Delete
            </Typography>
          </DeleteBadge>
        </Col>
        <Col md={6} className="add-col">
          <Typography color="shade2" variant="label" className="text">
            Photo of the Octopus Head in the Hand
          </Typography>
          <Add onClick={() => {}} title="Add a Photo" Svg={Camera} />
        </Col>
        <Col md={6} className="add-col">
          <Typography color="shade2" variant="label" className="text">
            Photo of the Octopus Close up
          </Typography>
          <Add onClick={() => {}} title="Add a Photo" Svg={Camera} />
        </Col>
        <Col md={6} className="add-col">
          <Typography color="shade2" variant="label" className="text">
            Photo of the Octopus Packaged
          </Typography>
          <Add onClick={() => {}} title="Add a Photo" Svg={Camera} />
        </Col>
      </Row>

      <Row justify="end" style={{ padding: '0 15px' }}>
        <Button text="Skip" />
      </Row>
    </Step5Wrapper>
  );
}

export default Step5;
