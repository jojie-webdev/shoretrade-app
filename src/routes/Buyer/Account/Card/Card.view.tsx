import React from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Visa, Mastercard, Zippay, Paypal, Amex } from 'components/base/SVG';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Formik } from 'formik';
import { Col, Row } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { CardGeneratedProps, CardDetails } from './Card.props';
import {
  Container,
  FormAddCard,
  CCImageRow,
  CCImage,
  Notification,
} from './Card.style';
import { isValid } from './Card.validation';
import FieldsetCard from './FieldsetCard';

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
    addCardResult,
  } = props;

  return (
    <Container>
      <InnerRouteHeader title={isExisting ? 'Update Card' : 'Add Card'} />

      {addCardResult?.error && (
        <Notification>
          <Alert
            variant="error"
            content="Cannot add Credit Card at the moment."
          />
        </Notification>
      )}

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
        <CCImage>
          <Amex height={32} />
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
          const payload = {
            ...cardDetails,
            ...values,
            // overrides, since this is not using formik logic
            isDefault: cardDetails.isDefault,
          };
          if (isExisting) {
            onUpdateCard(payload);
          } else {
            onAddCard(payload);
          }
        }}
        validate={isValid}
        enableReinitialize
      >
        <FormAddCard>
          <FieldsetCard {...props} />
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
