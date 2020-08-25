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
} from './Login.style';
import { validate } from './Login.validation';

const LoginView = (props: LoginGeneratedProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
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
    <AuthContainer>
      <Container>
        <ContentWrapper>
          <Content>
            <Title variant="title3" color={isSeller ? 'noshade' : 'shade8'}>
              {`${isSeller ? 'Seller' : 'Buyer'} Log in`}
            </Title>
            <RegisterLinkContainer>
              <RegisterLinkPrefix color="shade6">New user?</RegisterLinkPrefix>
              <Touchable dark={isSeller} onPress={() => goToRegister()}>
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
                {isError && (
                  <Alert
                    content="Verification Failed! Your email or password were incorrect."
                    variant="error"
                    style={{
                      marginTop: 16,
                      width: '100%',
                    }}
                  />
                )}
              </Form>
            </Formik>
          </Content>
          <Footer>
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
          </Footer>
        </ContentWrapper>
      </Container>
    </AuthContainer>
  );
};

export default LoginView;
