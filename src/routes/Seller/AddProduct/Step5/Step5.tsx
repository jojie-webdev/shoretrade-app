import React from 'react';

import Button from 'components/base/Button';
import { Camera, Subtract } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { Step5Props } from './Step5.props';
import { Container, DeleteBadge } from './Step5.style';

function Step5({ onClickNext }: Step5Props) {
  const theme = useTheme();

  return (
    <Container>
      <Row className="preview-row">
        <Col md={6} className="preview-col">
          <img src="" alt="Product Preview" className="img-preview" />
          <DeleteBadge>
            <Subtract fill={theme.grey.noshade} />
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
        <Button text="Skip" onClick={onClickNext} />
      </Row>
    </Container>
  );
}

export default Step5;
