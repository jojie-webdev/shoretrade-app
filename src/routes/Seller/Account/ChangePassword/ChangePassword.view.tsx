import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import { InfoFilled } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import FixedWidthContainer from 'components/layout/FixedWidthContainer';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { BUYER_ACCOUNT_ROUTES, SELLER_ACCOUNT_ROUTES } from 'consts';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { ChangePasswordGeneratedProps } from './ChangePassword.props';
import {
  Wrapper,
  TextFieldRow,
  SmallAlertContainer,
  StyledAlert,
} from './ChangePassword.style';
import { isValid } from './ChangePassword.validation';

const ChangePasswordView = (props: ChangePasswordGeneratedProps) => {
  const theme = useTheme();
  const { onClickSave, pending, isError, isSuccess, errorMessage } = props;

  const formikProps = {
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: isValid,
    onSubmit: onClickSave,
  };

  return (
    <Wrapper>
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              {
                label: 'Account',
                link:
                  theme.appType === 'seller'
                    ? SELLER_ACCOUNT_ROUTES.LANDING
                    : BUYER_ACCOUNT_ROUTES.LANDING,
              },
              { label: 'Change Password' },
            ]}
          />
        </div>

        {isSuccess && (
          <div className="alert-container">
            <StyledAlert
              content="Your account details have successfully been updated!"
              variant="success"
              alignText="center"
              fullWidth
            />
          </div>
        )}

        {isError && (
          <div className="alert-container">
            <StyledAlert
              content="Current password is incorrect!"
              variant="error"
              alignText="center"
              fullWidth
            />
          </div>
        )}

        {/*<FixedWidthContainer width={320}>*/}
        {/*  <SmallAlertContainer>*/}
        {/*    <div className="icon-container">*/}
        {/*      <InfoFilled*/}
        {/*        fill={*/}
        {/*          theme.appType === 'seller'*/}
        {/*            ? theme.brand.alert*/}
        {/*            : theme.grey.shade8*/}
        {/*        }*/}
        {/*        height={theme.appType === 'seller' ? 14 : 20}*/}
        {/*        width={theme.appType === 'seller' ? 14 : 20}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <Typography*/}
        {/*      variant="caption"*/}
        {/*      className="text"*/}
        {/*      color={theme.appType === 'seller' ? 'alert' : 'shade8'}*/}
        {/*    >*/}
        {/*      Your Password must: <br />*/}
        {/*      • Be at least 8 characters long <br />*/}
        {/*      • Include at least 1 number <br />*/}
        {/*      • Include at least 1 upper case character <br />*/}
        {/*      • Include at least 1 special character <br />*/}
        {/*    </Typography>*/}
        {/*  </SmallAlertContainer>*/}
        {/*</FixedWidthContainer>*/}

        <Formik {...formikProps}>
          <Form>
            <TextFieldRow>
              <Col md={12} lg={8} className="textfield-col">
                <FormikTextField
                  label="Current Password"
                  name="oldPassword"
                  secured
                />
              </Col>
              <Col lg={4} />
              <Col md={12} lg={4} className="textfield-col">
                <FormikTextField
                  label="New Password"
                  name="newPassword"
                  secured
                />
              </Col>
              <Col md={12} lg={4} className="textfield-col">
                <FormikTextField
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  secured
                />
              </Col>
            </TextFieldRow>

            <Row>
              <Col>
                <Button
                  text="Save new password"
                  type="submit"
                  loading={pending}
                />
              </Col>
            </Row>
          </Form>
        </Formik>
      </BoxContainer>
    </Wrapper>
  );
};

export default ChangePasswordView;
