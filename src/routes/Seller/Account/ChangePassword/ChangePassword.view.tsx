import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import FormikTextField from 'components/module/FormikTextField';
import { BUYER_ACCOUNT_ROUTES, SELLER_ACCOUNT_ROUTES } from 'consts';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { ChangePasswordGeneratedProps } from './ChangePassword.props';
import { Wrapper, TextFieldRow } from './ChangePassword.style';
import { isValid } from './ChangePassword.validation';

const ChangePasswordView = (props: ChangePasswordGeneratedProps) => {
  const theme = useTheme();
  const { onClickSave, pending, isError, isSuccess, errorMessage } = props;

  const formikProps = {
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: isValid,
    onSubmit: onClickSave,
  };

  return (
    <Wrapper>
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              {
                label: 'Account',
                link:
                  theme.appType === 'seller'
                    ? SELLER_ACCOUNT_ROUTES.LANDING
                    : BUYER_ACCOUNT_ROUTES.LANDING,
              },
              { label: 'Change Password' },
            ]}
          />
        </div>

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

        <Row>
          <Col md={12} lg={8}>
            <Alert
              variant="infoAlert"
              header="Your Password must:"
              content={
                <Typography color="shade6" weight="400">
                  • Be at least 8 characters long <br />
                  • Include at least 1 number <br />
                  • Include at least 1 upper case character <br />
                  • Include at least 1 special character <br />
                </Typography>
              }
              fullWidth
              style={{
                marginBottom: 24,
              }}
            />
          </Col>
        </Row>

        <Formik {...formikProps}>
          <Form>
            <TextFieldRow>
              <Col md={12} lg={8} className="textfield-col">
                <FormikTextField
                  label="Current Password"
                  name="oldPassword"
                  secured
                />
              </Col>
              <Col lg={4} />
              <Col md={12} lg={4} className="textfield-col">
                <FormikTextField
                  label="New Password"
                  name="newPassword"
                  secured
                />
              </Col>
              <Col md={12} lg={4} className="textfield-col">
                <FormikTextField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  secured
                />
              </Col>
            </TextFieldRow>

            <Row>
              <Col>
                <Button
                  text="Save new password"
                  type="submit"
                  loading={pending}
                />
              </Col>
            </Row>
          </Form>
        </Formik>
      </BoxContainer>
    </Wrapper>
  );
};

export default ChangePasswordView;
