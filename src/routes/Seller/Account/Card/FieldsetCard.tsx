import React from 'react';

import FormikTextField from 'components/module/FormikTextField';
import { connect } from 'formik';
import { Col, Row } from 'react-grid-system';
// import { useTheme } from 'utils/Theme';
import { cardExpiryInputFilter } from 'utils/InputFilters/cardExpiryInputFilter';
import { cardNumberInputFilter } from 'utils/InputFilters/cardNumberInputFilter';

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
            inputType="numeric"
            name="number"
            id="number"
            label="CARD NUMBER"
            placeholder="•••• •••• •••• ••••"
            maxLength={19}
            onChangeText={(value) =>
              cardNumberInputFilter('number', value, formik)
            }
          />
        </Col>
      </Row>

      <Row>
        <Col className="form-card-col" xs={6} md={6} lg={4} xl={2}>
          <FormikTextField
            readOnly={isExisting}
            type="text"
            inputType="numeric"
            name="exp"
            id="exp"
            label="EXPIRY DATE"
            placeholder="MM / YY"
            onChangeText={(value) =>
              cardExpiryInputFilter('exp', value, formik)
            }
            onKeyUp={(e) => {
              if (e.key === 'Backspace' || e.key === 'Delete') {
                formik.setFieldValue('exp', '', false);
              }
            }}
          />
        </Col>
        <Col className="form-card-col" xs={6} md={6} lg={4} xl={2}>
          <FormikTextField
            readOnly={isExisting}
            type="text"
            inputType="numeric"
            name="cvc"
            id="cvc"
            label="CVC"
            placeholder="CVC"
          />
        </Col>

        <Col className="form-card-col" md={6} lg={4} xl={4}>
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
