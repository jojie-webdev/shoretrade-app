import React from 'react';

// import { useTheme } from 'utils/Theme';

import Button from 'components/base/Button';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import { Formik, Form } from 'formik';

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
} from './Login.style';
import { validate } from './Login.validation';

const LoginView = (props: LoginGeneratedProps): JSX.Element => {
  // const theme = useTheme();
  const { login, pending, goToForgotPassword } = props;

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
      <Container>
        <ContentWrapper>
          <Content>
            <Title variant="title3" color="noshade">
              Seller Log in
            </Title>
            <RegisterLinkContainer>
              <RegisterLinkPrefix color="shade6">New user?</RegisterLinkPrefix>
              <Touchable
                dark
                onPress={() => console.log('LOG_ACTION: Create account')}
              >
                <RegisterLink color="primary">Create an account</RegisterLink>
              </Touchable>
            </RegisterLinkContainer>
            <Formik {...formikProps}>
              <Form>
                <Email name="email" type="email" label="EMAIL" />
                <Password secured name="password" label="PASSWORD" />
                <LoginButtonContainer>
                  <Button type="submit" text="LOG IN" loading={pending} />
                </LoginButtonContainer>
              </Form>
            </Formik>
          </Content>
          <Footer>
            <Touchable dark onPress={() => goToForgotPassword()}>
              <ForgotPasswordContainer>
                <ForgotPasswordIcon />
                <ForgotPasswordText color="noshade">
                  Forgot Password?
                </ForgotPasswordText>
              </ForgotPasswordContainer>
            </Touchable>
          </Footer>
        </ContentWrapper>
      </Container>
    </AuthContainer>
  );
};

export default LoginView;
