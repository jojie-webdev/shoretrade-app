import React, { useRef } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import MobileFooter from 'components/layout/MobileFooter';
import FormikTextField from 'components/module/FormikTextField';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { ChangePasswordGeneratedProps } from './ChangePassword.props';
import { Wrapper, TextFieldRow } from './ChangePassword.style';
import { isValid } from './ChangePassword.validation';

const InfoAlert = () => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Alert
      variant="infoAlert"
      header="Your Password must:"
      content={
        <Typography
          variant={isMobile ? 'label' : 'body'}
          color="shade6"
          weight="400"
        >
          • Be at least 8 characters long <br />
          • Include at least 1 number <br />
          • Include at least 1 upper case character <br />
          • Include at least 1 special character <br />
        </Typography>
      }
      fullWidth
    />
  );
};

const Alerts = (props: ChangePasswordGeneratedProps) => {
  const { isSuccess, isError } = props;

  return (
    <>
      {isSuccess && (
        <div className="alert-container">
          <Alert
            content="Your account details have successfully been updated!"
            variant="success"
            alignText="center"
            fullWidth
          />
        </div>
      )}
      {isError && (
        <div className="alert-container">
          <Alert
            content="Current password is incorrect!"
            variant="error"
            alignText="center"
            fullWidth
          />
        </div>
      )}
    </>
  );
};

const ChangePasswordView = (props: ChangePasswordGeneratedProps) => {
  const { pending, errorMessage } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const formRef = useRef();

  const formikProps = {
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: isValid,
    onSubmit: props.onClickSave,
  };

  return (
    <Wrapper>
      <BoxContainer>
        <>
          <div className="breadcrumb-container">
            <Breadcrumbs
              sections={[
                {
                  label: 'Account',
                  link: BUYER_ACCOUNT_ROUTES.LANDING,
                },
                { label: 'Change Password' },
              ]}
            />
          </div>

          {!isMobile && (
            <>
              <Alerts {...props} />
              <Row style={{ marginBottom: 24 }}>
                <Col md={12} xl={8}>
                  <InfoAlert />
                </Col>
              </Row>
            </>
          )}

          {/*
            // @ts-ignore*/}
          <Formik innerRef={formRef} {...formikProps}>
            <Form>
              <TextFieldRow>
                <Col md={12} xl={8} className="textfield-col">
                  <FormikTextField
                    label="Current Password"
                    name="oldPassword"
                    secured
                  />
                </Col>
                <Col xl={4} />
                <Col md={12} xl={4} className="textfield-col">
                  <FormikTextField
                    label="New Password"
                    name="newPassword"
                    secured
                  />
                </Col>
                <Col md={12} xl={4} className="textfield-col">
                  <FormikTextField
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    secured
                  />
                </Col>
              </TextFieldRow>

              {!isMobile && (
                <Row>
                  <Col>
                    <Button
                      text="Save new password"
                      type="submit"
                      loading={pending}
                    />
                  </Col>
                </Row>
              )}
            </Form>
          </Formik>

          {isMobile && (
            <div style={{ marginTop: 24 }}>
              <Alerts {...props} />
              <InfoAlert />
            </div>
          )}
        </>
        <MobileFooter>
          <Button
            text="Save new password"
            takeFullWidth
            onClick={() => {
              if (formRef.current) {
                // @ts-ignore
                formRef.current.handleSubmit();
              }
            }}
            loading={pending}
          />
        </MobileFooter>
      </BoxContainer>
    </Wrapper>
  );
};

export default ChangePasswordView;
