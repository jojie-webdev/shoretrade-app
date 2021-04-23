import React from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import { Formik, Form } from 'formik';
import { useTheme } from 'utils/Theme';

import { LoginGeneratedProps } from './Login.props';
import {
  Container,
  ContentWrapper,
  Content,
  Footer,
  Title,
  RegisterLinkContainer,
  RegisterLinkPrefix,
  RegisterLink,
  Email,
  Password,
  LoginButtonContainer,
  ForgotPasswordContainer,
  ForgotPasswordIcon,
  ForgotPasswordText,
  RegisterLinkAction,
} from './Login.style';
import { validate } from './Login.validation';

const LoginView = (props: LoginGeneratedProps): JSX.Element => {
  const theme = useTheme();
  // preserve logic just in case a separate buyer login
  // is implemented.
  const isSeller = theme.appType === 'seller';
  // const isSeller = true;
  const {
    login,
    pending,
    goToForgotPassword,
    isError,
    goToRegister,
    switchType,
  } = props;

  const formikProps = {
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: login,
  };

  return (
    <AuthContainer>
      <ContentWrapper>
        <Content>
          <Title variant="title3" color={isSeller ? 'noshade' : 'shade8'}>
            {isSeller ? 'Seller' : 'Buyer'} Log in
          </Title>
          <RegisterLinkContainer>
            <RegisterLinkPrefix
              variant="label"
              color={isSeller ? 'shade6' : 'shade7'}
            >
              New user?
            </RegisterLinkPrefix>
            <RegisterLinkAction onClick={() => goToRegister()}>
              <RegisterLink variant="label" color="primary">
                Create an Account
              </RegisterLink>
            </RegisterLinkAction>
          </RegisterLinkContainer>
          <Formik {...formikProps}>
            <Form>
              <Email name="email" type="email" label="EMAIL" />
              <Password secured name="password" label="PASSWORD" />
              <LoginButtonContainer>
                <Button type="submit" text="LOG IN" loading={pending} />
              </LoginButtonContainer>
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
            </Form>
          </Formik>
        </Content>
        <Footer>
          <div className="row">
            <Touchable dark={isSeller} onPress={() => goToForgotPassword()}>
              <ForgotPasswordContainer>
                <ForgotPasswordIcon
                  fill={isSeller ? theme.grey.noshade : theme.grey.shade9}
                />
                <ForgotPasswordText color={isSeller ? 'noshade' : 'shade9'}>
                  Forgot Password?
                </ForgotPasswordText>
              </ForgotPasswordContainer>
            </Touchable>
            <Touchable dark={isSeller} onPress={() => switchType()}>
              <ForgotPasswordContainer>
                <ForgotPasswordText color={isSeller ? 'noshade' : 'shade9'}>
                  Log in as {isSeller ? 'Buyer' : 'Seller'}
                </ForgotPasswordText>
              </ForgotPasswordContainer>
            </Touchable>
          </div>
        </Footer>
      </ContentWrapper>
    </AuthContainer>
  );
};

export default LoginView;
