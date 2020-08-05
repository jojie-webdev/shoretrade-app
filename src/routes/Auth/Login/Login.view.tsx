import React from 'react';

// import { useTheme } from 'utils/Theme';

import Button from 'components/base/Button';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import { useFormik } from 'formik';

import { LoginGeneratedProps } from './Login.props';
import {
  Container,
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
  const { login, pending } = props;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: login,
  });

  return (
    <AuthContainer>
      <Container>
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
          <form onSubmit={formik.handleSubmit}>
            <Email
              id="email"
              type="email"
              label="EMAIL"
              {...formik.getFieldProps('email')}
              error={formik.touched.email ? formik.errors.email : undefined}
            />
            <Password
              secured
              id="password"
              label="PASSWORD"
              {...formik.getFieldProps('password')}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />
            <LoginButtonContainer>
              <Button type="submit" text="LOG IN" />
            </LoginButtonContainer>
          </form>
        </Content>
        <Footer>
          <Touchable
            dark
            onPress={() => console.log('LOG_ACTION: Forgot Password')}
          >
            <ForgotPasswordContainer>
              <ForgotPasswordIcon />
              <ForgotPasswordText color="noshade">
                Forgot Password?
              </ForgotPasswordText>
            </ForgotPasswordContainer>
          </Touchable>
        </Footer>
      </Container>
    </AuthContainer>
  );
};

export default LoginView;
