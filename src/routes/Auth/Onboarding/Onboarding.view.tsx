import React from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import EmptyState from 'components/module/EmptyState';
import Pagination from 'components/module/Pagination';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { OnboardingGeneratedProps } from './Onboarding.props';
import {
  Container,
  SvgContainer,
  TextContainer,
  Description,
  ButtonContainer,
  PrevButton,
  Footer,
} from './Onboarding.style';

const OnboardingView = (props: OnboardingGeneratedProps) => {
  const {
    currentPage,
    onClickNext,
    onClickPrev,
    currentData,
    onClickSkip,
  } = props;
  const theme = useTheme();

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <AuthContainer
      logoContainerMarginBottomHeight={20}
      onSkipAction={onClickSkip}
      mobileFooter={
        <Footer>
          <Pagination
            variant="dots"
            currentValue={currentPage + 1}
            numPages={4}
            spacing={8}
          />
          <Button text="Next" onClick={onClickNext} />
        </Footer>
      }
    >
      <Container>
        <SvgContainer>
          <EmptyState
            Svg={currentData.Svg}
            height={currentData.height}
            width={currentData.width}
            fluid
          />
          {!isSmallScreen && (
            <Pagination
              variant="dots"
              currentValue={currentPage + 1}
              numPages={4}
              spacing={8}
            />
          )}
        </SvgContainer>

        <TextContainer>
          <Typography
            variant="title4"
            color={theme.appType === 'seller' ? 'noshade' : 'shade9'}
          >
            {currentData.title}
          </Typography>
          <Description color="shade6">{currentData.description}</Description>
        </TextContainer>
        {!isSmallScreen && (
          <ButtonContainer>
            {currentPage > 0 ? (
              <PrevButton text="Prev" variant="outline" onClick={onClickPrev} />
            ) : null}
            <Button text="Next" onClick={onClickNext} />
          </ButtonContainer>
        )}
      </Container>
    </AuthContainer>
  );
};

export default OnboardingView;
