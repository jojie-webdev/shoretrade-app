import React from 'react';

import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import { Row } from 'react-grid-system';

import { Field } from './AddCredit.style';

export const FieldsetBankAccount = () => (
  <>
    <Row>
      <Field md={12} xl={6}>
        <Typography variant="overline" color="shade6">
          Bank Transfer Instructions
        </Typography>
        <Typography variant="label">
          It is very important that you enter the correct details into your bank
          transfer page, or your deposit will not go through. We use the
          reference number to match deposits to your ShoreTrade account. Bank
          transfers normally take 2 days to clear.
        </Typography>
      </Field>
    </Row>

    <Row>
      <Field md={12} xl={4}>
        <FormikTextField
          type="text"
          name="acctName"
          id="acctName"
          label="BANK ACCOUNT NAME OR PAYEE"
          value="ShoreTrade Pty Ltd"
          readOnly
        />
      </Field>

      <Field md={12} xl={4}>
        <FormikTextField
          type="text"
          name="bsb"
          id="bsb"
          label="BSB NUMBER"
          value="062-000"
          readOnly
        />
      </Field>
    </Row>

    <Row className="form-spacer">
      <Field md={12} xl={4}>
        <FormikTextField
          type="text"
          name="acctNum"
          id="acctNum"
          label="ACCOUNT NUMBER"
          value="17215848"
          readOnly
        />
      </Field>

      <Field md={12} xl={4}>
        <FormikTextField
          type="text"
          name="description"
          id="description"
          label="DESCRIPTION OR REFERENCE"
          placeholder=""
          value="005140"
          readOnly
        />
      </Field>
    </Row>
  </>
);
