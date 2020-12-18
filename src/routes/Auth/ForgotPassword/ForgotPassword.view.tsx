import React, { useRef } from 'react';

import Button from 'components/base/Button';
import { Check } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import { Formik, Form } from 'formik';
import theme, { useTheme } from 'utils/Theme';

import { ForgotPasswordGeneratedProps } from './ForgotPassword.props';
import {
  Container,
  ContentWrapper,
  Content,
  Footer,
  TitleContainer,
  BackIcon,
  Title,
  GuideContainer,
  GuideText,
  Email,
  ForgotPasswordButtonContainer,
  FooterContainer,
  FooterIcon,
  FooterText,
  FooterLink,
} from './ForgotPassword.style';
import { validate } from './ForgotPassword.validation';

const ForgotPasswordView = (
  props: ForgotPasswordGeneratedProps
): JSX.Element => {
  const theme = useTheme();
  // const isSeller = true;
  const isSeller = theme.appType === 'seller';
  const { resetPassword, pending, backToLogin, success } = props;

  const formikProps = {
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: resetPassword,
  };

  return (
    <AuthContainer>
      <Container>
        <ContentWrapper>
          <Content>
            <TitleContainer>
              <Touchable dark={isSeller} onPress={() => backToLogin()}>
                <BackIcon width={16} height={16} fill={theme.brand.primary} />
              </Touchable>
              <Title variant="title5" color={isSeller ? 'noshade' : 'shade8'}>
                Forgot Password?
              </Title>
            </TitleContainer>
            <Formik {...formikProps}>
              <Form>
                <Email name="email" type="email" label="EMAIL" />
                <ForgotPasswordButtonContainer>
                  <Button
                    type="submit"
                    text="RESET PASSWORD"
                    loading={pending}
                    variant={success ? 'success' : 'primary'}
                    icon={success ? <Check fill="#fff" /> : undefined}
                  />
                </ForgotPasswordButtonContainer>
              </Form>
            </Formik>
          </Content>
        </ContentWrapper>
      </Container>
    </AuthContainer>
  );
};

export default ForgotPasswordView;
