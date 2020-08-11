import React from 'react';

import Button from 'components/base/Button';
import { InfoFilled } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { ChangePasswordGeneratedProps } from './ChangePassword.props';
import {
  Wrapper,
  TextFieldRow,
  SmallAlertContainer,
} from './ChangePassword.style';

const ChangePasswordView = (props: ChangePasswordGeneratedProps) => {
  const theme = useTheme();
  return (
    <Wrapper>
      <InnerRouteHeader title="Change Password" />

      <SmallAlertContainer>
        <div className="icon-container">
          <InfoFilled fill={theme.brand.alert} height={16} width={16} />
        </div>
        <Typography color="alert" variant="caption" className="text">
          Your Password must: <br />
          • Be at least 8 characters long <br />
          • Include at least 1 number <br />
          • Include at least 1 upper case character <br />
          • Include at least 1 special character <br />
        </Typography>
      </SmallAlertContainer>

      <TextFieldRow>
        <Col md={12} className="textfield-col">
          <TextField label="Current Password" secured />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField label="New Password" secured />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField label="Confirm New Password" secured />
        </Col>
      </TextFieldRow>

      <Row>
        <Col>
          <Button text="Save"></Button>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ChangePasswordView;
