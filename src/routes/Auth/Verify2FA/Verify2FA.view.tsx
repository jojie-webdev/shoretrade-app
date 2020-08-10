import React, { useRef } from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import { useFormik } from 'formik';
import theme from 'utils/Theme';

import { Verify2FAGeneratedProps } from './Verify2FA.props';
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
  CodeFieldLabel,
  CodeFieldRow,
  CodeField,
  CodeFieldContainer,
  Verify2FAButtonContainer,
  FooterContainer,
  FooterIcon,
  FooterText,
  FooterLink,
} from './Verify2FA.style';

const CODE_LENGTH = 6;
const initialValues = [...Array(CODE_LENGTH).keys()].reduce(
  (values, key) => ({
    ...values,
    [`code${key}`]: '',
  }),
  {}
);

const Verify2FAView = (props: Verify2FAGeneratedProps): JSX.Element => {
  // const theme = useTheme();
  const { verify, pending, backToLogin, resendCode } = props;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formik = useFormik({
    initialValues,
    onSubmit: (record: Record<string, string>) => {
      verify(Object.values(record).join(''));
    },
  });

  return (
    <AuthContainer>
      <Container>
        <ContentWrapper>
          <Content>
            <TitleContainer>
              <Touchable dark onPress={() => backToLogin()}>
                <BackIcon width={16} height={16} fill={theme.brand.primary} />
              </Touchable>
              <Title variant="title5" color="noshade">
                2-Step Verification
              </Title>
            </TitleContainer>
            <GuideContainer>
              <GuideText color="shade5">
                Please enter the 6 digit code which has been sent to your
                registered mobile phone number.
              </GuideText>
            </GuideContainer>

            <form onSubmit={formik.handleSubmit}>
              <CodeFieldLabel variant="overline" color={'shade6'}>
                ENTER CODE
              </CodeFieldLabel>
              <CodeFieldRow>
                {Object.keys(initialValues).map((key, index) => {
                  return (
                    <CodeFieldContainer key={key}>
                      <CodeField
                        ref={(el) => (inputRefs.current[index] = el)}
                        id={key}
                        maxLength={1}
                        {...formik.getFieldProps(key)}
                        onInput={(e) => {
                          const value = e.currentTarget.value;
                          if (value.length >= 1 && index < CODE_LENGTH - 1) {
                            const nextTarget = inputRefs.current[index + 1];
                            if (nextTarget) {
                              nextTarget.focus();
                            }
                          }
                        }}
                      />
                    </CodeFieldContainer>
                  );
                })}
              </CodeFieldRow>

              <Verify2FAButtonContainer>
                <Button type="submit" text="VERIFY" loading={pending} />
              </Verify2FAButtonContainer>
            </form>
          </Content>
          <Footer>
            <FooterContainer>
              <FooterIcon />
              <FooterText color="noshade">
                Haven’t received the code?
              </FooterText>
              <Touchable dark onPress={() => resendCode()}>
                <FooterLink color="noshade">Send Again</FooterLink>
              </Touchable>
            </FooterContainer>
          </Footer>
        </ContentWrapper>
      </Container>
    </AuthContainer>
  );
};

export default Verify2FAView;
