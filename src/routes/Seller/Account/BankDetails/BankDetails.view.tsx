import React from 'react';

// import { useTheme } from 'utils/Theme';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import Loading from 'components/module/Loading';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
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
        Your earnings will be transfered here. Australian banks only.
      </Typography>

      <Formik {...formikProps} enableReinitialize>
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
          <Button text="Save" type="submit" loading={submitting} />
        </Form>
      </Formik>
    </Container>
  );
};

export default BankDetailsView;
