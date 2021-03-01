import React, { useRef } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import { Check } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import { Formik, Form } from 'formik';
import theme, { useTheme } from 'utils/Theme';

import { ResetPasswordGeneratedProps } from './ResetPassword.props';
import {
  Container,
  ContentWrapper,
  Content,
  TitleContainer,
  Title,
  PasswordField,
  ResetPasswordButtonContainer,
} from './ResetPassword.style';
import { validate } from './ResetPassword.validation';

const ResetPasswordView = (props: ResetPasswordGeneratedProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = true;
  // const isSeller = theme.appType === 'seller';
  const { savePassword, pending, isError } = props;

  const formikProps = {
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validate,
    onSubmit: savePassword,
  };

  return (
    <AuthContainer>
      <Container>
        <ContentWrapper>
          <Content>
            <TitleContainer>
              <Title variant="title5" color={isSeller ? 'noshade' : 'shade8'}>
                Reset Password
              </Title>
            </TitleContainer>

            <Formik {...formikProps}>
              <Form>
                <PasswordField
                  label="New Password"
                  name="newPassword"
                  secured
                />
                <PasswordField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  secured
                />
                <ResetPasswordButtonContainer>
                  <Button
                    type="submit"
                    text="UPDATE PASSWORD"
                    loading={pending}
                    variant={'primary'}
                  />
                </ResetPasswordButtonContainer>
                {isError && (
                  <Alert
                    content={'Updating Password Failed! Please try again.'}
                    variant="error"
                    fullWidth
                    style={{
                      marginTop: 16,
                    }}
                  />
                )}
              </Form>
            </Formik>
          </Content>
        </ContentWrapper>
      </Container>
    </AuthContainer>
  );
};

export default ResetPasswordView;
