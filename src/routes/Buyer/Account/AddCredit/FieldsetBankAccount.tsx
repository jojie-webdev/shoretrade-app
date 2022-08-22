import React from 'react';

import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import { Row } from 'react-grid-system';
import { useTheme } from 'utils/SFMTheme';

import { Field } from './AddCredit.style';

export const FieldsetBankAccount = (props: { aasNumber: string }) => {
  const theme = useTheme();

  return (
    <>
      <Row>
        <Field md={12} xl={6}>
          <Typography variant="overline" color="shade6">
            Bank Transfer Instructions
          </Typography>
          <Typography variant="label">
            It is very important that you enter the correct details into your
            bank transfer page, or your deposit will not go through. We use the
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
            value={
              theme.isSFM ? 'Sydney Fish Market Pty Ltd' : 'ShoreTrade Pty Ltd'
            }
            readOnly
          />
        </Field>

        <Field md={12} xl={4}>
          <FormikTextField
            type="text"
            name="bsb"
            id="bsb"
            label="BSB NUMBER"
            value={theme.isSFM ? '062-010' : '062-000'}
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
            value={theme.isSFM ? '28000863' : '17215848'}
            readOnly
          />
        </Field>

        <Field md={12} xl={4}>
          <FormikTextField
            type="text"
            name="description"
            id="description"
            label="DESCRIPTION OR REFERENCE"
            placeholder="AAS Number"
            value={theme.isSFM ? props.aasNumber : '005140'}
            readOnly
          />
        </Field>
      </Row>
    </>
  );
};
