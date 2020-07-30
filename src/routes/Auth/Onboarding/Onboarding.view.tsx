import React from 'react';

// import { useTheme } from 'utils/Theme';
import { OnboardingGeneratedProps } from './Onboarding.props';
import { Container } from './Onboarding.style';

const OnboardingView = (props: OnboardingGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>Onboarding Screen</h1>
    </Container>
  );
};

export default OnboardingView;
