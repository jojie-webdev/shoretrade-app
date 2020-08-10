import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';

import { EditAddressGeneratedProps } from './EditAddress.props';
import { Container } from './EditAddress.style';

const EditAddressView = (props: EditAddressGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <InnerRouteHeader title="Edit Adresses" />

      <Row className="textfield-row">
        <Col>
          <TextField label="Address" />
        </Col>
        <Col>
          <TextField label="Unit number (optional)" />
        </Col>
      </Row>

      <Row className="checkbox-row">
        <Col className="checkbox-col">
          <div className="checkbox-container">
            <Checkbox checked />
          </div>
          <Typography variant="label" color="noshade">
            Set as default address
          </Typography>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button text="Submit" />
        </Col>
      </Row>
    </Container>
  );
};

export default EditAddressView;
