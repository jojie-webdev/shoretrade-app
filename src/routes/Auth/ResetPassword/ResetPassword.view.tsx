import React from 'react';

import Alert from 'components/base/Alert';
import { Variants } from 'components/base/Alert/Alert.props';
import Button from 'components/base/Button';
import AuthContainer from 'components/layout/AuthContainer';
import MobileHeader from 'components/layout/MobileNav';
import FormikTextField from 'components/module/FormikTextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik, Form } from 'formik';
import { useMediaQuery } from 'react-responsive';

import { MESSAGES } from './ResetPassword.consts';
import { ResetPasswordGeneratedProps } from './ResetPassword.props';
import {
  MobileContainer,
  TitleContainer,
  Title,
  PasswordField,
  ResetPasswordButtonContainer,
} from './ResetPassword.style';
import { validate } from './ResetPassword.validation';

const ResetPasswordView = (props: ResetPasswordGeneratedProps): JSX.Element => {
  const { savePassword, pending, isError, noAppFound } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const formikProps = {
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validate,
    onSubmit: savePassword,
  };

  const ErrMsgAlert = (message: string, variant: Variants) => (
    <Alert
      content={message}
      variant={variant}
      fullWidth
      style={{
        marginTop: 16,
      }}
    />
  );

  return isSmallScreen ? (
    <MobileHeader titleOverride={'Reset Password?'}>
      <MobileContainer>
        <Formik {...formikProps}>
          <Form>
            <FormikTextField label="New Password" name="newPassword" secured />
            <PasswordField
              label="Confirm New Password"
              name="confirmNewPassword"
              secured
            />
            <ResetPasswordButtonContainer>
              <Button
                type="submit"
                text="UPDATE PASSWORD"
                loading={pending}
                variant={'primary'}
                takeFullWidth
              />
            </ResetPasswordButtonContainer>
          </Form>
        </Formik>

        {isError && ErrMsgAlert(MESSAGES[0], 'error')}
        {noAppFound && ErrMsgAlert(MESSAGES[1], 'warning')}
      </MobileContainer>
    </MobileHeader>
  ) : (
    <AuthContainer>
      <TitleContainer>
        <Title variant="title5" color="shade8">
          Reset Password
        </Title>
      </TitleContainer>

      <Formik {...formikProps}>
        <Form>
          <PasswordField label="New Password" name="newPassword" secured />
          <PasswordField
            label="Confirm New Password"
            name="confirmNewPassword"
            secured
          />
          <ResetPasswordButtonContainer>
            <Button
              type="submit"
              text="UPDATE PASSWORD"
              loading={pending}
              variant={'primary'}
            />
          </ResetPasswordButtonContainer>
        </Form>
      </Formik>
      {isError && ErrMsgAlert(MESSAGES[0], 'error')}
      {noAppFound && ErrMsgAlert(MESSAGES[1], 'warning')}
    </AuthContainer>
  );
};

export default ResetPasswordView;
