import React from 'react';

import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';
// import { useTheme } from 'utils/Theme';

import { YourDetailsGeneratedProps } from './YourDetails.props';
import { Wrapper, InputRow } from './YourDetails.style';

const YourDetailsView = (props: YourDetailsGeneratedProps) => {
  // const theme = useTheme();

  return (
    <Wrapper>
      <InnerRouteHeader title="Your Details" />

      <InputRow>
        <Col md={6} className="input-col">
          <TextField label="First Name" />
        </Col>
        <Col md={6} className="input-col">
          <TextField label="Last Name" />
        </Col>
        <Col md={6} className="input-col">
          <TextField label="Mobile" />
        </Col>
        <Col md={6} className="input-col">
          <TextField label="Email" />
        </Col>
        <Col md={6} className="input-col">
          <TextField label="Business" />
        </Col>
        <Col md={6} className="input-col">
          <TextField label="Business number (optional)" />
        </Col>
      </InputRow>

      <Row>
        <Col>
          <Button text="Save"></Button>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default YourDetailsView;
