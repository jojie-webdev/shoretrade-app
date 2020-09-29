import React from 'react';

import { Close } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
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
  HeaderContent,
  BackIcon,
  CloseButtonContainer,
  Title,
  HeaderSpacer,
  ProgressIndicator,
} from './AuthContainer.style';

const AuthContainerView = (props: AuthContainerProps): JSX.Element => {
  const theme = useTheme();

  const {
    children,
    onCloseAction,
    title = '',
    onBackAction,
    currentStep,
    totalSteps,
  } = props;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  return (
    <Container>
      <Background />
      <Wrapper>
        <Content>
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
              <HeaderContent>
                <Title>{title}</Title>
              </HeaderContent>
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
          {currentStep !== undefined && totalSteps !== undefined && (
            <ProgressIndicator
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          )}
          {children}
        </Content>
      </Wrapper>
    </Container>
  );
};

export default React.memo(AuthContainerView);
