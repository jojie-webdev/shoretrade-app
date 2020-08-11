import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';

import { BankDetailsGeneratedProps } from './BankDetails.props';
import { Container, TextFieldRow } from './BankDetails.style';

const BankDetailsView = (props: BankDetailsGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <InnerRouteHeader title="Bank Details" />

      <Typography variant="label" color="shade1">
        Your earnings will be transfered here. Australian banks only.
      </Typography>

      <TextFieldRow>
        <Col md={6} className="textfield-col">
          <TextField label="Account name" />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField label="BSB" />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField label="Account number" />
        </Col>
      </TextFieldRow>

      <Button text="Save" />
    </Container>
  );
};

export default BankDetailsView;
