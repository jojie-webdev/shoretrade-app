import React from 'react';

import Button from 'components/base/Button';
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

  const { userDetails, businessDetails, onClickSave, updatingUser } = props;

  const formikProps = {
    initialValues: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      mobile: userDetails.mobile,
      email: userDetails.email,
      businessName: businessDetails.businessName,
      abn: businessDetails.abn,
    },
    validate,
    onSubmit: onClickSave,
  };

  if (!userDetails.firstName) {
    return <></>;
  }

  return (
    <Wrapper>
      <InnerRouteHeader title="Your Details" />
      <Formik {...formikProps}>
        <Form>
          <InputRow>
            <Col md={6} className="input-col">
              <FormikTextField label="First Name" name="firstName" />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField label="Last Name" name="lastName" />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField label="Mobile" name="mobile" />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField label="Email" name="email" />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField label="Business" name="businessName" />
            </Col>
            <Col md={6} className="input-col">
              <FormikTextField label="Business number (optional)" name="abn" />
            </Col>
          </InputRow>

          <Row>
            <Col>
              <Button text="Save" type="submit" loading={updatingUser} />
            </Col>
          </Row>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default YourDetailsView;
