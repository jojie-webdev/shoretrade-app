import React, { useRef } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import FormikTextField from 'components/module/FormikTextField';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik, Form } from 'formik';
import { isIOS } from 'react-device-detect';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { BankDetailsGeneratedProps } from './BankDetails.props';
import { Container, TextFieldRow, StyledAlert } from './BankDetails.style';
import { isValid } from './BankDetails.validation';

const BankDetailsView = (props: BankDetailsGeneratedProps) => {
  const {
    loading,
    onClickSave,
    bankDetails,
    submitting,
    isSuccess,
    isError,
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const formRef = useRef();

  if (loading) {
    return <Loading />;
  }

  const formikProps = {
    initialValues: {
      accountName: bankDetails.accountName,
      bsb: bankDetails.bsb,
      accountNumber: bankDetails.accountNumber,
    },
    validate: isValid,
    onSubmit: onClickSave,
  };

  return (
    <Container isIOS={isIOS}>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            { label: 'Bank Details' },
          ]}
        />
      </div>

      {isError && (
        <StyledAlert
          content="An error has occurred. Please check your account details or try again later"
          variant="error"
          alignText="center"
          fullWidth
        />
      )}

      {isSuccess && (
        <StyledAlert
          content="Your account details have successfully been updated!"
          variant="success"
          alignText="center"
          fullWidth
        />
      )}

      <Typography color="shade1">
        Your earnings will be transferred here. Australian banks only.
      </Typography>

      {/*
            // @ts-ignore*/}
      <Formik innerRef={formRef} {...formikProps} enableReinitialize>
        <Form>
          <TextFieldRow>
            <Col md={12} xl={4} className="textfield-col">
              <FormikTextField label="Account name" name="accountName" />
            </Col>
            <Col md={12} xl={4} className="textfield-col">
              <FormikTextField label="BSB" name="bsb" maxLength={6} />
            </Col>
            <Col xl={4} />
            <Col md={12} xl={4} className="textfield-col">
              <FormikTextField
                label="Account number"
                name="accountNumber"
                maxLength={10}
              />
            </Col>
          </TextFieldRow>
          {!isMobile && (
            <Button text="Save" type="submit" loading={submitting} />
          )}
        </Form>
      </Formik>

      <MobileFooter>
        <Button
          text="Save"
          onClick={() => {
            if (formRef.current) {
              // @ts-ignore
              formRef.current.handleSubmit();
            }
          }}
          loading={submitting}
          takeFullWidth
        />
      </MobileFooter>
    </Container>
  );
};

export default BankDetailsView;
