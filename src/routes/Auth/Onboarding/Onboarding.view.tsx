import React from 'react';

import Button from 'components/base/Button';
import { ShoretradeLogo, ArrowRight, Logo } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import EmptyState from 'components/module/EmptyState';
import Pagination from 'components/module/Pagination';
import { Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { OnboardingGeneratedProps } from './Onboarding.props';
import {
  Container,
  SvgContainer,
  LogoContainer,
  SkipButton,
  TextContainer,
  Description,
  ButtonContainer,
  PrevButton,
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
  const isSeller = theme.appType === 'seller';
  return (
    <AuthContainer logoContainerMarginBottomHeight={40}>
      <Container>
        <SvgContainer>
          <EmptyState
            // circleHeight={280}
            // circleWidth={280}
            Svg={currentData.Svg}
            height={currentData.height}
            width={currentData.width}
            fluid
          />
          <Pagination
            variant="dots"
            currentValue={currentPage + 1}
            numPages={4}
            spacing={8}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClickButton={() => {}}
          />
        </SvgContainer>

        <TextContainer>
          <Typography
            variant="title4"
            color={theme.appType === 'seller' ? 'noshade' : 'shade8'}
          >
            {currentData.title}
          </Typography>
          <Description color={theme.appType === 'seller' ? 'shade5' : 'shade6'}>
            {currentData.description}
          </Description>
        </TextContainer>
        <ButtonContainer>
          {currentPage > 0 ? (
            <PrevButton text="Prev" variant="outline" onClick={onClickPrev} />
          ) : null}
          <Button text="Next" onClick={onClickNext} />
        </ButtonContainer>
      </Container>
    </AuthContainer>
  );
};

export default OnboardingView;
