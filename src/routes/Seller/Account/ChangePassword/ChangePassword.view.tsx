import React from 'react';

import Button from 'components/base/Button';
import { InfoFilled } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { ChangePasswordGeneratedProps } from './ChangePassword.props';
import {
  Wrapper,
  TextFieldRow,
  SmallAlertContainer,
  StyledAlert,
} from './ChangePassword.style';
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
      <InnerRouteHeader title="Change Password" />

      {isSuccess && (
        <StyledAlert
          content="Your account details have successfully been updated!"
          variant="success"
          alignText="center"
          fullWidth
        />
      )}

      {isError && (
        <StyledAlert
          content="Current password is incorrect!"
          variant="error"
          alignText="center"
          fullWidth
        />
      )}

      <SmallAlertContainer>
        <div className="icon-container">
          <InfoFilled fill={theme.brand.alert} height={16} width={16} />
        </div>
        <Typography color="alert" variant="caption" className="text">
          Your Password must: <br />
          • Be at least 8 characters long <br />
          • Include at least 1 number <br />
          • Include at least 1 upper case character <br />
          • Include at least 1 special character <br />
        </Typography>
      </SmallAlertContainer>

      <Formik {...formikProps}>
        <Form>
          <TextFieldRow>
            <Col md={12} className="textfield-col">
              <FormikTextField
                label="Current Password"
                name="oldPassword"
                secured
              />
            </Col>
            <Col md={6} className="textfield-col">
              <FormikTextField
                label="New Password"
                name="newPassword"
                secured
              />
            </Col>
            <Col md={6} className="textfield-col">
              <FormikTextField
                label="Confirm New Password"
                name="confirmNewPassword"
                secured
              />
            </Col>
          </TextFieldRow>

          <Row>
            <Col>
              <Button text="Save" type="submit" loading={pending} />
            </Col>
          </Row>
        </Form>
      </Formik>
    </Wrapper>
  );
};

export default ChangePasswordView;
