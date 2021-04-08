import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Visa, Mastercard, Zippay, Paypal, Amex } from 'components/base/SVG';
import { BoxContainer } from 'components/layout/BoxContainer';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { Formik } from 'formik';

// import { useTheme } from 'utils/Theme';
import { CardGeneratedProps, CardDetails } from './Card.props';
import {
  Container,
  FormAddCard,
  CCImageRow,
  CCImage,
  ButtonContainer,
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
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
              {
                label: 'Balance & Payments',
                link: BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
              },
              { label: isExisting ? 'Update Card' : 'Add Card' },
            ]}
          />
        </div>

        {addCardResult?.error && (
          <Alert
            variant="error"
            fullWidth
            content="Cannot add Credit Card at the moment."
            style={{ marginBottom: 16 }}
          />
        )}

        <CCImageRow>
          <CCImage>
            <Visa height={32} />
          </CCImage>
          <CCImage>
            <Mastercard height={32} />
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
            <div className="form-card-checkbox">
              <Checkbox
                label="Set as default card"
                name="isDefault"
                checked={cardDetails.isDefault}
                onClick={() => {
                  setCardDetails({ isDefault: !cardDetails.isDefault });
                }}
              />
            </div>
            <ButtonContainer>
              {isExisting && (
                <Button
                  variant="outline"
                  loading={isRemoving}
                  text="Remove Card"
                  style={{ marginRight: '8px' }}
                  onClick={() => onRemoveCard()}
                />
              )}
              <Button type="submit" loading={isLoading} text="Save" />
            </ButtonContainer>
          </FormAddCard>
        </Formik>
      </BoxContainer>
    </Container>
  );
};

export default CardView;
