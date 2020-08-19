import React from 'react';

import { Close } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import { useTheme } from 'utils/Theme';

import { AuthContainerProps } from './AuthContainer.props';
import {
  Container,
  Background,
  Content,
  Grid,
  Row,
  HeaderContainer,
  HeaderContent,
  BackIcon,
  CloseButtonContainer,
  Title,
  HeaderSpacer,
  ProgressIndicator,
  Scroll,
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
  return (
    <Container>
      <Background />
      <Grid>
        <Row justify="center" align="center" nogutter>
          <Content xs={12} sm={12} md={8} lg={6} xl={6} xxl={4}>
            {onCloseAction && (
              <CloseButtonContainer>
                <Touchable
                  circle
                  width={'100%'}
                  onPress={() => onCloseAction()}
                >
                  <Close width={9.5} height={9.5} fill={theme.grey.shade7} />
                </Touchable>
              </CloseButtonContainer>
            )}
            {((title || '').length > 0 || onBackAction) && (
              <HeaderContainer>
                <HeaderSpacer>
                  {onBackAction && (
                    <Touchable
                      width={'32px'}
                      dark
                      onPress={() => onBackAction()}
                    >
                      <BackIcon
                        width={12}
                        height={12}
                        fill={theme.grey.noshade}
                      />
                    </Touchable>
                  )}
                </HeaderSpacer>
                <HeaderContent>
                  <Title>{title}</Title>
                </HeaderContent>
                <HeaderSpacer />
              </HeaderContainer>
            )}
            {currentStep !== undefined && totalSteps !== undefined && (
              <ProgressIndicator
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            )}
            {children}
          </Content>
        </Row>
      </Grid>
    </Container>
  );
};

export default React.memo(AuthContainerView);
