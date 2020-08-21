import React from 'react';

import Button from 'components/base/Button';
import { ShoretradeLogo, Crab, ArrowRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import EmptyState from 'components/module/EmptyState';
import Pagination from 'components/module/Pagination';
import { useTheme } from 'utils/Theme';

import { OnboardingGeneratedProps } from './Onboarding.props';
import {
  Container,
  Footer,
  SvgContainer,
  LogoContainer,
  SkipButton,
} from './Onboarding.style';

const OnboardingView = (props: OnboardingGeneratedProps) => {
  const theme = useTheme();
  return (
    <AuthContainer title="Welcome" onCloseAction={() => {}}>
      <Container>
        <LogoContainer>
          <ShoretradeLogo width={200} height={24} />
          <SkipButton>
            <Typography color="noshade" variant="caption" className="text">
              Skip
            </Typography>
            <ArrowRight height={7} width={7} fill={theme.brand.primary} />
          </SkipButton>
        </LogoContainer>

        <SvgContainer>
          <EmptyState Svg={Crab} fluid />
        </SvgContainer>

        <Typography variant="title4" color="noshade">
          Welcome to ShoreTrade.
        </Typography>

        <Typography color="shade5">
          Etiam egestas at viverra id est orci id ut pharetra. Vulputate nibh
          eros vel dolor, id diam nisi, adipiscing quam.
        </Typography>
      </Container>

      <Footer>
        <Pagination
          variant="dots"
          currentValue={0}
          numPages={4}
          onClickButton={() => {}}
        />
        <Button text="Next" onClick={() => {}} />
      </Footer>
    </AuthContainer>
  );
};

export default OnboardingView;
