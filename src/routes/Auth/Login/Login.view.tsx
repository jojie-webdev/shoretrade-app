import React from 'react';

// import { useTheme } from 'utils/Theme';
import { LoginGeneratedProps } from './Login.props';
import { Container } from './Login.style';

const LoginView = (props: LoginGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>Login Screen</h1>
    </Container>
  );
};

export default LoginView;
