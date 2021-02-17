import React from 'react';

import FormikTextField from 'components/module/FormikTextField';
import { connect } from 'formik';
import { Col, Row } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { FieldsetCardProps } from './Card.props';

const CardView = (props: FieldsetCardProps) => {
  // const theme = useTheme();
  const { isExisting, formik } = props;

  return (
    <>
      <Row>
        <Col md={12} xl={8}>
          <FormikTextField
            readOnly={isExisting}
            type="text"
            name="number"
            id="number"
            label="CARD NUMBER"
            placeholder="•••• •••• •••• ••••"
            maxLength={19}
            onChangeText={(value) => {
              const digits = value.trim().replace(/\s/g, '');
              const isMaxLen = digits.length > 16;

              if (digits.length == 16) {
                // formik.setFieldValue('number', value, false);
                const visaString =
                  digits.substring(0, 4) +
                  ' ' +
                  digits.substring(4, 8) +
                  ' ' +
                  digits.substring(8, 12) +
                  ' ' +
                  digits.substring(12);
                formik.setFieldValue('number', visaString.trim(), false);
              } else if (digits.length === 15) {
                const amexString =
                  digits.substring(0, 4) +
                  ' ' +
                  digits.substring(4, 10) +
                  ' ' +
                  digits.substring(10, 15) +
                  ' ' +
                  digits.substring(15);
                formik.setFieldValue('number', amexString.trim(), false);
              } else if (isMaxLen) {
                // Prevent value to exceed 16 digits + 3 spaces

                formik.setFieldValue(
                  'number',
                  value.slice(0, 19).trim(),
                  false
                );
              }
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col className="form-card-col" md={12} lg={6} xl={2}>
          <FormikTextField
            readOnly={isExisting}
            type="text"
            name="exp"
            id="exp"
            label="EXPIRY DATE"
            placeholder="MM / YY"
            onChangeText={(value) => {
              const text = value.trim().replace(/\s/g, '');
              const isFirstHalf = value.length === 2;
              const isMaxLen = text.replace('/', '').length >= 4;

              if (isFirstHalf) {
                formik.setFieldValue('exp', value + ' / ', false);
              } else if (isMaxLen) {
                formik.setFieldValue('exp', value.substr(0, 7), false);
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Backspace' || e.key === 'Delete') {
                formik.setFieldValue('exp', '', false);
              }
            }}
          />
        </Col>
        <Col className="form-card-col" md={12} lg={6} xl={2}>
          <FormikTextField
            readOnly={isExisting}
            type="text"
            name="cvc"
            id="cvc"
            label="CVC"
            placeholder="CVC"
          />
        </Col>

        <Col className="form-card-col" md={12} lg={6} xl={4}>
          <FormikTextField
            readOnly={isExisting}
            type="text"
            name="name"
            id="name"
            label="NAME ON CARD"
            placeholder="Name on Card"
          />
        </Col>
      </Row>
    </>
  );
};

export default connect(CardView);
