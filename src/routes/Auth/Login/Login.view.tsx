import React from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik, Form } from 'formik';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { LoginGeneratedProps } from './Login.props';
import {
  ContentWrapper,
  Content,
  Footer,
  RegisterLinkContainer,
  RegisterLinkPrefix,
  RegisterLink,
  Email,
  Password,
  LoginButtonContainer,
  ForgotPasswordContainer,
  ForgotPasswordIcon,
  RegisterLinkAction,
  SignupContainer,
  Signup,
  SignupIcon,
} from './Login.style';
import { validate } from './Login.validation';

const LoginView = (props: LoginGeneratedProps): JSX.Element => {
  const theme = useTheme();
  // preserve logic just in case a separate buyer login
  // is implemented.
  const isSeller = theme.appType === 'seller';
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const { login, pending, goToForgotPassword, isError, goToRegister } = props;

  const formikProps = {
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: login,
  };

  return (
    <AuthContainer
      isLogin
      horizontalLogo={isSmallScreen}
      mobileFooter={
        <SignupContainer>
          <SignupIcon
            fill={isSeller ? theme.grey.noshade : theme.grey.shade8}
          />
          <Typography
            variant="label"
            weight="400"
            color={isSeller ? 'noshade' : 'shade8'}
          >
            Don’t have an account?
          </Typography>
          <Signup
            variant="label"
            color={isSeller ? 'noshade' : 'shade8'}
            onClick={() => goToRegister()}
          >
            Sign up
          </Signup>
        </SignupContainer>
      }
    >
      <ContentWrapper>
        <Content>
          {!isSmallScreen && (
            <>
              <Typography
                variant="title3"
                weight="bold"
                color={isSeller ? 'noshade' : 'shade8'}
              >
                {isSeller ? 'Seller' : 'Buyer'} Log in
              </Typography>
              <RegisterLinkContainer>
                <RegisterLinkPrefix color="shade6">
                  New user?
                </RegisterLinkPrefix>
                <RegisterLinkAction onClick={() => goToRegister()}>
                  <RegisterLink color="primary">Create an Account</RegisterLink>
                </RegisterLinkAction>
              </RegisterLinkContainer>
            </>
          )}

          <Formik {...formikProps}>
            <Form>
              <Email name="email" type="email" label="EMAIL" />
              <Password secured name="password" label="PASSWORD" />
              <LoginButtonContainer>
                <Button
                  type="submit"
                  text="LOG IN"
                  loading={pending}
                  takeFullWidth={isSmallScreen}
                />
              </LoginButtonContainer>
            </Form>
          </Formik>

          {isSmallScreen && (
            <Touchable
              dark={isSeller}
              onPress={() => goToForgotPassword()}
              className="touchable"
            >
              <ForgotPasswordContainer>
                <ForgotPasswordIcon
                  fill={isSeller ? theme.grey.noshade : theme.grey.shade9}
                />
                <Typography
                  variant="label"
                  color={isSeller ? 'noshade' : 'shade9'}
                >
                  Forgot Password?
                </Typography>
              </ForgotPasswordContainer>
            </Touchable>
          )}

          {isError && (
            <Alert
              content="Verification Failed! Your email or password were incorrect."
              variant="error"
              fullWidth
              style={{
                marginTop: 16,
              }}
            />
          )}
        </Content>
        {!isSmallScreen && (
          <Footer>
            <Touchable dark={isSeller} onPress={() => goToForgotPassword()}>
              <ForgotPasswordContainer>
                <ForgotPasswordIcon
                  fill={isSeller ? theme.grey.noshade : theme.grey.shade9}
                />
                <Typography
                  variant="label"
                  color={isSeller ? 'noshade' : 'shade9'}
                >
                  Forgot Password?
                </Typography>
              </ForgotPasswordContainer>
            </Touchable>
          </Footer>
        )}
      </ContentWrapper>
    </AuthContainer>
  );
};

export default LoginView;
