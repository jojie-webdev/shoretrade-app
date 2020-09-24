import React from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Visa, Mastercard, Zippay, Paypal } from 'components/base/SVG';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Formik, Form } from 'formik';
import { Col, Row } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { CardGeneratedProps, CardDetails } from './Card.props';
import { Container, FormAddCard, CCImageRow, CCImage } from './Card.style';
import { isValid } from './Card.validation';

const CardView = (props: CardGeneratedProps) => {
  // const theme = useTheme();
  const {
    cardDetails,
    setCardDetails,
    onAddCard,
    isLoading,
    isExisting,
    onUpdateCard,
    onRemoveCard,
    isRemoving,
  } = props;

  return (
    <Container>
      <InnerRouteHeader title="Add Card" />
      <CCImageRow>
        <CCImage>
          <Visa height={32} />
        </CCImage>
        <CCImage>
          <Mastercard height={32} />
        </CCImage>
        <CCImage>
          <Zippay height={32} />
        </CCImage>
        <CCImage>
          <Paypal height={32} />
        </CCImage>
      </CCImageRow>

      <Formik
        initialValues={{
          number: isExisting ? cardDetails.number : '',
          exp: isExisting ? cardDetails.exp : '',
          cvc: isExisting ? cardDetails.cvc : '',
          name: isExisting ? cardDetails.name : '',
          isDefault: isExisting ? cardDetails.isDefault : false,
        }}
        onSubmit={(values: CardDetails) => {
          setCardDetails({ ...values });
          if (isExisting) {
            onUpdateCard(values);
          } else {
            onAddCard(values);
          }
        }}
        validate={isValid}
        enableReinitialize
      >
        <FormAddCard>
          <Row>
            <Col md={4}>
              <FormikTextField
                readOnly={isExisting}
                type="text"
                name="number"
                id="number"
                label="CARD NUMBER"
                placeholder="••••••••••••••••"
              />
            </Col>
            <Col md={4}>
              <FormikTextField
                readOnly={isExisting}
                type="text"
                name="exp"
                id="exp"
                label="EXPIRY DATE"
                placeholder="MM / YY"
              />
            </Col>
            <Col md={4}>
              <FormikTextField
                readOnly={isExisting}
                type="text"
                name="cvc"
                id="cvc"
                label="CVC"
                placeholder="123"
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormikTextField
                readOnly={isExisting}
                type="text"
                name="name"
                id="name"
                label="NAME ON CARD"
                placeholder="123"
              />
            </Col>
          </Row>
          <Checkbox
            label="Set as default card"
            name="isDefault"
            checked={cardDetails.isDefault}
            onClick={() => {
              setCardDetails({ isDefault: !cardDetails.isDefault });
            }}
          />
          <Button type="submit" loading={isLoading} text="Save" />
        </FormAddCard>
      </Formik>
    </Container>
  );
};

export default CardView;
