import React from 'react';

import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import { Col } from 'react-grid-system';

export const FieldsetBankAccount = () => (
  <>
    <Col md={6}>
      <Typography variant="overline" color="shade6">
        Credit Balance
      </Typography>
      <Typography variant="body" color="shade9">
        It is very important that you enter the correct details into your bank
        transfer page, or your deposit will not go through. We use the reference
        number to match deposits to your ShoreTrade account. Bank transfers
        normally take 2 days to clear.
      </Typography>
    </Col>

    <Col md={6}>
      <FormikTextField
        type="text"
        name="acctName"
        id="acctName"
        label="BANK ACCOUNT NAME OR PAYEE"
        value="ShoreTrade Pty Ltd"
        readOnly
      />
    </Col>

    <Col md={6}>
      <FormikTextField
        type="text"
        name="bsb"
        id="bsb"
        label="BSB NUMBER"
        value="062-000"
        readOnly
      />
    </Col>

    <Col md={6}>
      <FormikTextField
        type="text"
        name="acctNum"
        id="acctNum"
        label="ACCOUNT NUMBER"
        value="17215848"
        readOnly
      />
    </Col>

    <Col md={6}>
      <FormikTextField
        type="text"
        name="description"
        id="description"
        label="DESCRIPTION OR REFERENCE"
        placeholder=""
        value="005140"
        readOnly
      />
    </Col>
  </>
);