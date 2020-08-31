import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { Formik, Form } from 'formik';
import { Col } from 'react-grid-system';

import { BankDetailsGeneratedProps } from './BankDetails.props';
import { Container, TextFieldRow, StyledAlert } from './BankDetails.style';
import { isValid } from './BankDetails.validation';

const BankDetailsView = (props: BankDetailsGeneratedProps) => {
  // const theme = useTheme();

  const {
    loading,
    onClickSave,
    bankDetails,
    submitting,
    isSuccess,
    isError,
  } = props;

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
    <Container>
      <InnerRouteHeader title="Bank Details" />

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

      <Typography variant="label" color="shade1">
        Your earnings will be transfered here. Australian banks only.
      </Typography>

      <Formik {...formikProps} enableReinitialize>
        <Form>
          <TextFieldRow>
            <Col md={6} className="textfield-col">
              <FormikTextField label="Account name" name="accountName" />
            </Col>
            <Col md={6} className="textfield-col">
              <FormikTextField label="BSB" name="bsb" maxLength={6} />
            </Col>
            <Col md={6} className="textfield-col">
              <FormikTextField
                label="Account number"
                name="accountNumber"
                maxLength={10}
              />
            </Col>
          </TextFieldRow>
          <Button text="Save" type="submit" loading={submitting} />
        </Form>
      </Formik>
    </Container>
  );
};

export default BankDetailsView;
