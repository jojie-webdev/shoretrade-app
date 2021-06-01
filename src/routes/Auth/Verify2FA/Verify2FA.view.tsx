import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import { ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import MobileHeader from 'components/layout/MobileNav';
import DialogModal from 'components/module/DialogModal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import ReactCodeInput from 'react-verification-code-input';
import { useTheme } from 'utils/Theme';

import { Verify2FAGeneratedProps } from './Verify2FA.props';
import {
  MobileContainer,
  ContentWrapper,
  Content,
  Footer,
  TitleContainer,
  Title,
  GuideContainer,
  GuideText,
  CodeFieldLabel,
  Verify2FAButtonContainer,
  FooterContainer,
  FooterIcon,
  FooterLink,
} from './Verify2FA.style';

const Verify2FAView = (props: Verify2FAGeneratedProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const {
    verify,
    pending,
    backToLogin,
    resendCode,
    isError,
    showSellerPendingModal,
  } = props;

  const [code, setCode] = useState('');

  const Guide = () => {
    return (
      <GuideContainer>
        <GuideText variant="label" color={isSeller ? 'shade6' : 'shade7'}>
          Please enter the 6 digit code which has been sent to your registered
          mobile phone number.
        </GuideText>
      </GuideContainer>
    );
  };

  const CodeForm = () => {
    return (
      <>
        <CodeFieldLabel variant="overline" color={'shade6'}>
          ENTER CODE
        </CodeFieldLabel>

        <ReactCodeInput
          className="code-field"
          type="number"
          fields={6}
          fieldHeight={48}
          fieldWidth={48}
          onComplete={setCode}
        />

        <Verify2FAButtonContainer>
          <Button
            onClick={() => verify(code)}
            text="VERIFY"
            loading={pending}
            takeFullWidth={isSmallScreen}
          />
        </Verify2FAButtonContainer>
      </>
    );
  };

  const FooterContent = () => {
    return (
      <FooterContainer>
        <FooterIcon fill={isSeller ? theme.grey.noshade : theme.grey.shade9} />
        <Typography
          variant="label"
          weight="400"
          color={isSeller ? 'noshade' : 'shade9'}
        >
          Haven’t received the code?
        </Typography>
        <Touchable dark={isSeller} onPress={() => resendCode()}>
          <FooterLink
            variant="label"
            weight="400"
            color={isSeller ? 'noshade' : 'primary'}
          >
            Send Again
          </FooterLink>
        </Touchable>
      </FooterContainer>
    );
  };

  const AlertView = () => {
    return (
      <>
        {isError && (
          <Alert
            content={`Verification Failed!\nYour verification code were incorrect.`}
            variant="error"
            fullWidth
            style={{
              marginTop: 16,
            }}
          />
        )}
      </>
    );
  };

  const Modal = () => {
    return (
      <>
        {isSeller && (
          <DialogModal
            title="Thanks for signing up!"
            overline="Your account is pending approval."
            isOpen={showSellerPendingModal}
            onClickClose={() => backToLogin()}
            backgroundColor={theme.grey.shade8}
          >
            <Typography
              color="shade5"
              weight="400"
              align={isSmallScreen ? 'center' : 'left'}
            >
              We need to check a few things before you can start selling.
              <br />
              <br />
              We’ll send you an email when your account is approved.
            </Typography>
          </DialogModal>
        )}
      </>
    );
  };

  return isSmallScreen ? (
    <MobileHeader>
      <MobileContainer>
        <Guide />
        <CodeForm />
        <AlertView />
        <FooterContent />
        <Modal />
      </MobileContainer>
    </MobileHeader>
  ) : (
    <AuthContainer>
      <ContentWrapper>
        <Content>
          <TitleContainer>
            <Touchable dark onPress={() => backToLogin()}>
              <ArrowLeft width={16} height={16} fill={theme.brand.primary} />
            </Touchable>
            <Title variant="title5" color={isSeller ? 'noshade' : 'shade8'}>
              2-Step Verification
            </Title>
          </TitleContainer>

          <Guide />
          <CodeForm />
        </Content>

        <AlertView />
        <Footer>
          <FooterContent />
        </Footer>
        <Modal />
      </ContentWrapper>
    </AuthContainer>
  );
};

export default Verify2FAView;
