import React from 'react';

import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { YourDetailsGeneratedProps } from './YourDetails.props';
import { Wrapper, InputRow } from './YourDetails.style';
import { validate } from './YourDetails.validation';
const YourDetailsView = (props: YourDetailsGeneratedProps) => {
  // const theme = useTheme();

  const {
    userDetails,
    businessDetails,
    onChangeUserDetails,
    onChangeBusinessDetails,
  } = props;

  const formikProps = {
    initialValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      businessName: '',
      abn: '',
    },
    validate,
    onSubmit: () => {},
  };

  return (
    <Wrapper>
      <InnerRouteHeader title="Your Details" />
      <Formik {...formikProps}>
        <Form>
          <InputRow>
            <Col md={6} className="input-col">
              <FormikTextField
                label="First Name"
                name="firstName"
                onChange={onChangeUserDetails('firstName')}
                value={userDetails.firstName}
              />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField
                label="Last Name"
                name="lastName"
                onChange={onChangeUserDetails('lastName')}
                value={userDetails.lastName}
              />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField
                label="Mobile"
                name="mobile"
                onChange={onChangeUserDetails('mobile')}
                value={userDetails.mobile}
              />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField
                label="Email"
                name="email"
                onChange={onChangeUserDetails('email')}
                value={userDetails.email}
              />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField
                label="Business"
                name="businessName"
                onChange={onChangeBusinessDetails('businessName')}
                value={businessDetails.businessName}
              />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField
                label="Business number (optional)"
                name="abn"
                onChange={onChangeBusinessDetails('abn')}
                value={businessDetails.abn}
              />
            </Col>
          </InputRow>
        </Form>
      </Formik>

      <Row>
        <Col>
          <Button text="Save"></Button>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default YourDetailsView;
