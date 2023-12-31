import React from 'react';

import Button from 'components/base/Button';
import {
  ArrowRight,
  Close,
  ShoretradeLogo,
  ShoretradeLogo2,
  SfmLogo,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { SFM_BLUE_HOME, SHORETRADE_HOME } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { AuthContainerProps } from './AuthContainer.props';
import {
  Container,
  Background,
  Content,
  Wrapper,
  HeaderContainer,
  BackIcon,
  CloseButtonContainer,
  HeaderSpacer,
  ProgressIndicator,
  LogoContainer,
  ProgressContainer,
  BackgroundContainer,
  MobileFooter,
  PoweredByContainer,
} from './AuthContainer.style';

const AuthContainerView = (props: AuthContainerProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const {
    children,
    title = '',
    onCloseAction,
    onBackAction,
    onSkipAction,
    currentStep,
    totalSteps,
    containerBackground,
    minHeight,
    noLogo,
    horizontalLogo,
    isRegister,
    isLogin,
    mobileFooter,
  } = props;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  return (
    <Container>
      <BackgroundContainer sm={3} md={5} lg={6} xl={7} xxl={7}>
        <Background />
      </BackgroundContainer>
      <Wrapper xs={12} sm={9} md={7} lg={6} xl={5} xxl={5}>
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
          isLogin={isLogin}
        >
          {!noLogo && (
            <LogoContainer
              logoContainerMarginBottomHeight={
                props.logoContainerMarginBottomHeight
              }
            >
              <a
                href={theme.isSFM ? SFM_BLUE_HOME : SHORETRADE_HOME}
                style={{ cursor: 'pointer' }}
              >
                {!theme.isSFM && (
                  <>
                    {!horizontalLogo ? (
                      <ShoretradeLogo2 fill={!isSeller ? 'black' : 'white'} />
                    ) : (
                      <ShoretradeLogo height={24} width={190} />
                    )}
                  </>
                )}

                {theme.isSFM && (
                  <SfmLogo
                    fill={!isSeller ? theme.brand.secondary : 'white'}
                    height={52}
                    width={200}
                  />
                )}
              </a>

              {onSkipAction && (
                <Button
                  text="Skip"
                  variant="unselected"
                  size="sm"
                  icon={<ArrowRight fill={theme.brand.primary} />}
                  style={{ maxHeight: 32 }}
                  onClick={() => onSkipAction()}
                />
              )}
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
          {theme.isSFM && (
            <PoweredByContainer>
              <Typography
                color={theme.appType === 'buyer' ? 'secondary' : 'noshade'}
                variant="small"
              >
                Powered by
              </Typography>
              <ShoretradeLogo />
            </PoweredByContainer>
          )}
        </Content>
      </Wrapper>
      {mobileFooter && isSmallScreen && (
        <MobileFooter>{mobileFooter}</MobileFooter>
      )}
    </Container>
  );
};

export default React.memo(AuthContainerView);
