import React from 'react';

import { Close, Logo } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { AuthContainerProps } from './AuthContainer.props';
import {
  Container,
  Background,
  Content,
  Wrapper,
  HeaderContainer,
  HeaderContent,
  BackIcon,
  CloseButtonContainer,
  Title,
  HeaderSpacer,
  ProgressIndicator,
  LogoContainer,
  ProgressContainer,
  BackgroundContainer,
} from './AuthContainer.style';

const AuthContainerView = (props: AuthContainerProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const {
    children,
    onCloseAction,
    title = '',
    onBackAction,
    currentStep,
    totalSteps,
    containerBackground,
    minHeight,
    noLogo,
    isRegister,
  } = props;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  return (
    <Container>
      <BackgroundContainer md={6} lg={7} xl={7} xxl={7}>
        <Background />
      </BackgroundContainer>
      <Wrapper xs={12} sm={12} md={6} lg={5} xl={5} xxl={5}>
        <ProgressContainer
          background={containerBackground}
          isRegister={isRegister}
        >
          {currentStep !== undefined && totalSteps !== undefined && (
            <ProgressIndicator
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          )}
        </ProgressContainer>
        <Content
          background={containerBackground}
          minHeight={minHeight}
          isRegister={isRegister}
        >
          {!noLogo && (
            <LogoContainer
              logoContainerMarginBottomHeight={
                props.logoContainerMarginBottomHeight
              }
            >
              <Logo fill={!isSeller ? 'black' : 'white'} />
            </LogoContainer>
          )}
          {!isSmallScreen && onCloseAction && (
            <CloseButtonContainer>
              <Touchable circle width={'100%'} onPress={() => onCloseAction()}>
                <Close width={9.5} height={9.5} fill={theme.grey.shade7} />
              </Touchable>
            </CloseButtonContainer>
          )}
          {((title || '').length > 0 || onBackAction) && (
            <HeaderContainer>
              <HeaderSpacer>
                {onBackAction && (
                  <Touchable width={'32px'} dark onPress={() => onBackAction()}>
                    <BackIcon
                      width={24}
                      height={24}
                      fill={theme.grey.noshade}
                    />
                  </Touchable>
                )}
              </HeaderSpacer>
              <HeaderSpacer>
                {isSmallScreen && onCloseAction && (
                  <Touchable
                    width={'32px'}
                    dark
                    onPress={() => onCloseAction()}
                  >
                    <Close width={24} height={24} fill={theme.grey.noshade} />
                  </Touchable>
                )}
              </HeaderSpacer>
            </HeaderContainer>
          )}
          {children}
        </Content>
      </Wrapper>
    </Container>
  );
};

export default React.memo(AuthContainerView);
