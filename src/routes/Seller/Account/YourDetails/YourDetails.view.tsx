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

  const {
    userDetails,
    businessDetails,
    onChangeUserDetails,
    onChangeBusinessDetails,
  } = props;

  return (
    <Wrapper>
      <InnerRouteHeader title="Your Details" />

      <InputRow>
        <Col md={6} className="input-col">
          <TextField
            label="First Name"
            onChange={onChangeUserDetails('firstName')}
            value={userDetails.firstName}
          />
        </Col>
        <Col md={6} className="input-col">
          <TextField
            label="Last Name"
            onChange={onChangeUserDetails('lastName')}
            value={userDetails.lastName}
          />
        </Col>
        <Col md={6} className="input-col">
          <TextField
            label="Mobile"
            onChange={onChangeUserDetails('mobile')}
            value={userDetails.mobile}
          />
        </Col>
        <Col md={6} className="input-col">
          <TextField
            label="Email"
            onChange={onChangeUserDetails('email')}
            value={userDetails.email}
          />
        </Col>
        <Col md={6} className="input-col">
          <TextField
            label="Business"
            onChange={onChangeBusinessDetails('businessName')}
            value={businessDetails.businessName}
          />
        </Col>
        <Col md={6} className="input-col">
          <TextField
            label="Business number (optional)"
            onChange={onChangeBusinessDetails('abn')}
            value={businessDetails.abn}
          />
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
