import React from 'react';

import Button from 'components/base/Button';
import { ShoretradeLogo, ArrowRight } from 'components/base/SVG';
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
  const { currentPage, onClickNext, currentData, onClickSkip } = props;
  const theme = useTheme();
  return (
    <AuthContainer title="Welcome" onCloseAction={onClickSkip}>
      <Container>
        <LogoContainer>
          <ShoretradeLogo width={200} height={24} />
          <SkipButton onClick={onClickSkip}>
            <Typography color="noshade" variant="caption" className="text">
              Skip
            </Typography>
            <ArrowRight height={7} width={7} fill={theme.brand.primary} />
          </SkipButton>
        </LogoContainer>

        <SvgContainer>
          <EmptyState Svg={currentData.Svg} fluid />
        </SvgContainer>

        <Typography variant="title4" color="noshade">
          {currentData.title}
        </Typography>

        <Typography color="shade5">{currentData.description}</Typography>
      </Container>

      <Footer>
        <Pagination
          variant="dots"
          currentValue={currentPage + 1}
          numPages={4}
          spacing={8}
          onClickButton={() => {}}
        />
        <Button text="Next" onClick={onClickNext} />
      </Footer>
    </AuthContainer>
  );
};

export default OnboardingView;
