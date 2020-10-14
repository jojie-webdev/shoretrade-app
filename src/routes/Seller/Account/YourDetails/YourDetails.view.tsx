import React from 'react';

import Button from 'components/base/Button';
import FixedWidthContainer from 'components/layout/FixedWidthContainer';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import PhoneTextField from 'components/module/PhoneTextField';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { YourDetailsGeneratedProps } from './YourDetails.props';
import { Wrapper, InputRow, StyledAlert } from './YourDetails.style';
import { validate } from './YourDetails.validation';
const YourDetailsView = (props: YourDetailsGeneratedProps) => {
  // const theme = useTheme();

  const {
    userDetails,
    businessDetails,
    onClickSave,
    updatingUser,
    loadingUser,
    updateUserSuccess,
    callingCode,
    setCallingCode,
  } = props;

  if (loadingUser && !userDetails.firstName) {
    return <Loading />;
  }

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

  return (
    <Wrapper>
      {updateUserSuccess && (
        <StyledAlert
          content="Your account details have successfully been updated!"
          variant="success"
          alignText="center"
          fullWidth
        />
      )}
      <InnerRouteHeader title="Your Details" />
      <Formik {...formikProps}>
        <Form>
          <FixedWidthContainer>
            <InputRow>
              <Col md={12} className="input-col">
                <FormikTextField label="First Name" name="firstName" />
              </Col>
              <Col md={12} className="input-col">
                <FormikTextField label="Last Name" name="lastName" />
              </Col>
              <Col md={12} className="input-col">
                <PhoneTextField
                  label="Mobile"
                  name="mobile"
                  callingCode={callingCode}
                  setCallingCode={setCallingCode}
                />
              </Col>
              <Col md={12} className="input-col">
                <FormikTextField label="Email" name="email" />
              </Col>
              <Col md={12} className="input-col">
                <FormikTextField label="Business" name="businessName" />
              </Col>
              <Col md={12} className="input-col">
                <FormikTextField label="Business number (optional)" name="abn" />
              </Col>
            </InputRow>
          </FixedWidthContainer>
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
