import React, { useRef } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import MobileFooter from 'components/layout/MobileFooter';
import FormikTextField from 'components/module/FormikTextField';
import Loading from 'components/module/Loading';
import PhoneTextField from 'components/module/PhoneTextField';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { COMPANY_RELATIONSHIPS } from 'consts/companyRelationships';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { YourDetailsGeneratedProps } from './YourDetails.props';
import { Container, InputRow } from './YourDetails.style';
import { validate } from './YourDetails.validation';

const YourDetailsView = (props: YourDetailsGeneratedProps) => {
  const {
    userDetails,
    businessDetails,
    onClickSave,
    updatingUser,
    loadingUser,
    updateUserSuccess,
    callingCode,
    setCallingCode,
    companyRelationship
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isNotAdmin = companyRelationship != COMPANY_RELATIONSHIPS.ADMIN
  const formRef = useRef();

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
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            { label: 'Your Details' },
          ]}
        />
      </div>

      {updateUserSuccess && (
        <Alert
          content="Your account details have successfully been updated!"
          variant="success"
          alignText="center"
          fullWidth
          style={{
            marginBottom: 16,
          }}
        />
      )}

      {/*
            // @ts-ignore*/}
      <Formik innerRef={formRef} {...formikProps}>
        <Form>
          <InputRow>
            <Col md={12} xl={4} className="input-col">
              <FormikTextField label="First Name" name="firstName" />
            </Col>
            <Col md={12} xl={4} className="input-col">
              <FormikTextField label="Last Name" name="lastName" />
            </Col>
            <Col xl={4} />
            <Col md={12} xl={4} className="input-col">
              <PhoneTextField
                label="Mobile"
                name="mobile"
                callingCode={callingCode}
                setCallingCode={setCallingCode}
              />
            </Col>
            <Col md={12} xl={4} className="input-col">
              <FormikTextField label="Email" name="email" />
            </Col>
            <Col xl={4} />
            <Col md={12} xl={4} className="input-col">
              <FormikTextField label="Business" name="businessName" disabled={isNotAdmin}/>
            </Col>
            <Col md={12} xl={4} className="input-col">
              <FormikTextField label="Business number (optional)" name="abn" disabled={isNotAdmin}/>
            </Col>
          </InputRow>

          {!isMobile && (
            <Row justify="start">
              <Col>
                <Button text="Save" type="submit" loading={updatingUser} />
              </Col>
            </Row>
          )}
        </Form>
      </Formik>

      <MobileFooter>
        <Button
          text="Save"
          takeFullWidth
          onClick={() => {
            if (formRef.current) {
              // @ts-ignore
              formRef.current.handleSubmit();
            }
          }}
          loading={updatingUser}
        />
      </MobileFooter>
    </Container>
  );
};

export default YourDetailsView;
