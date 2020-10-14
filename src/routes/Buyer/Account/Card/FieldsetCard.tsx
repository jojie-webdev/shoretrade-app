import React from 'react';

import FixedWidthContainer from 'components/layout/FixedWidthContainer';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { connect } from 'formik';
import { Col, Row } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { FieldsetCardProps } from './Card.props';

const CardView = (props: FieldsetCardProps) => {
  // const theme = useTheme();
  const { isExisting, formik } = props;

  return (
    <>
      <FixedWidthContainer width={320}>
        <Row>
          <Col md={12}>
            <FormikTextField
              readOnly={isExisting}
              type="text"
              name="number"
              id="number"
              label="CARD NUMBER"
              placeholder="•••• •••• •••• ••••"
              maxLength={16}
              onChangeText={(value) => {
                const digits = value.trim().replace(/\s/g, '');
                const isFourDigits = digits.length > 0 && digits.length % 4 === 0;
                const isMaxLen = digits.length >= 16;

                if (isFourDigits) {
                  formik.setFieldValue('number', value + ' ', false);
                } else if (isMaxLen) {
                  formik.setFieldValue('number', value.substr(0, 19), false);
                }
              }}
            />
          </Col>
        </Row>
      </FixedWidthContainer>

      <FixedWidthContainer width={320}>
        <Row>
          <Col xs={6}>
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
          <Col xs={6}>
            <FormikTextField
              readOnly={isExisting}
              type="text"
              name="cvc"
              id="cvc"
              label="CVC"
              placeholder="CVC"
            />
          </Col>
        </Row>
      </FixedWidthContainer>

      <FixedWidthContainer width={320}>
        <Row>
          <Col md={12}>
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
      </FixedWidthContainer>
    </>
  );
};

export default connect(CardView);
