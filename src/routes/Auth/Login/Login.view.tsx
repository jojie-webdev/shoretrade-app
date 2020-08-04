import React from 'react';

// import { useTheme } from 'utils/Theme';

import Button from 'components/base/Button';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';

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

const LoginView = (props: LoginGeneratedProps): JSX.Element => {
  // const theme = useTheme();
  const { credentials, updateCredentials, login } = props;
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
          <Email
            label="EMAIL"
            value={credentials.email}
            onChangeText={(value) =>
              updateCredentials({
                email: value,
              })
            }
          />
          <Password
            label="PASSWORD"
            value={credentials.password}
            onChangeText={(value) =>
              updateCredentials({
                password: value,
              })
            }
            secured
          />
          <LoginButtonContainer>
            <Button text="LOG IN" onClick={() => login()} />
          </LoginButtonContainer>
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
