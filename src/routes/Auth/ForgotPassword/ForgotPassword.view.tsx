import React from 'react';

import Button from 'components/base/Button';
import { Check, ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import MobileHeader from 'components/layout/MobileHeader';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik, Form } from 'formik';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { ForgotPasswordGeneratedProps } from './ForgotPassword.props';
import {
  MobileContainer,
  TitleContainer,
  Email,
  ForgotPasswordButtonContainer,
} from './ForgotPassword.style';
import { validate } from './ForgotPassword.validation';

const ForgotPasswordView = (
  props: ForgotPasswordGeneratedProps
): JSX.Element => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const isSeller = theme.appType === 'seller';
  const isMain = !pathname.includes('seller') && !pathname.includes('buyer');
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const { resetPassword, pending, backToLogin, success } = props;

  const formikProps = {
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: resetPassword,
  };

  return isSmallScreen ? (
    <MobileHeader>
      <MobileContainer>
        <Typography weight="400" color={isSeller ? 'shade5' : 'shade8'}>
          Please enter your registered email address. Login details will be
          emailed to you.
        </Typography>
        <Formik {...formikProps}>
          <Form>
            <Email name="email" type="email" label="EMAIL" />
            <ForgotPasswordButtonContainer>
              <Button
                type="submit"
                text="RESET PASSWORD"
                loading={pending}
                variant={success ? 'success' : 'primary'}
                icon={success ? <Check fill="#fff" /> : undefined}
                takeFullWidth
              />
            </ForgotPasswordButtonContainer>
          </Form>
        </Formik>
      </MobileContainer>
    </MobileHeader>
  ) : (
    <AuthContainer>
      <TitleContainer>
        {!isMain && (
          <Touchable dark={isSeller} onPress={() => backToLogin()}>
            <div style={{ marginRight: 8 }}>
              <ArrowLeft width={16} height={16} fill={theme.brand.primary} />
            </div>
          </Touchable>
        )}
        <Typography variant="title5" color={isSeller ? 'noshade' : 'shade8'}>
          Forgot Password?
        </Typography>
      </TitleContainer>
      <Formik {...formikProps}>
        <Form>
          <Email name="email" type="email" label="EMAIL" />
          <ForgotPasswordButtonContainer>
            <Button
              type="submit"
              text="RESET PASSWORD"
              loading={pending}
              variant={success ? 'success' : 'primary'}
              icon={success ? <Check fill="#fff" /> : undefined}
            />
          </ForgotPasswordButtonContainer>
        </Form>
      </Formik>
    </AuthContainer>
  );
};

export default ForgotPasswordView;
