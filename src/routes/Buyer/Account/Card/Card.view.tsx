import React, { useRef } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Visa, Mastercard, Amex } from 'components/base/SVG';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik } from 'formik';
import { useMediaQuery } from 'react-responsive';

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
  const {
    cards,
    cardDetails,
    setCardDetails,
    onAddCard,
    isLoading,
    isExisting,
    onUpdateCard,
    onRemoveCard,
    isRemoving,
    addCardResult,
    from,
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const formRef = useRef();

  const breadcrumbsSection = (() => {
    let sections = [
      { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
      {
        label: 'Your Plan',
        link: BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
      },
      {
        label: 'Credit Card',
        link: BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD,
      },
      { label: isExisting ? 'Update Card' : 'Add Card' },
    ];

    if (from === BUYER_ACCOUNT_ROUTES.BANK_DETAILS) {
      sections = [
        { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
        {
          label: 'Balance & Payments',
          link: BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
        },
        { label: isExisting ? 'Update Card' : 'Add Card' },
      ];
    }

    return sections;
  })();

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs sections={breadcrumbsSection} />
      </div>

      {addCardResult?.error?.includes('503') ? (
        <Alert
          variant="error"
          fullWidth
          header="Credit Card cannot be added"
          content="Please check your card details and card balance before trying again."
          style={{ marginBottom: 16 }}
        />
      ) : (
        addCardResult?.error && (
          <Alert
            variant="error"
            fullWidth
            content={addCardResult?.error}
            style={{ marginBottom: 16 }}
          />
        )
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
        //@ts-ignore
        innerRef={formRef}
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
          {!isMobile && (
            <ButtonContainer>
              {isExisting && cards.length > 1 && (
                <Button
                  variant="outline"
                  type="button"
                  loading={isRemoving}
                  text="Remove Card"
                  style={{ marginRight: '8px' }}
                  onClick={() => onRemoveCard()}
                />
              )}
              <Button type="submit" loading={isLoading} text="Save" />
            </ButtonContainer>
          )}
        </FormAddCard>
      </Formik>

      <MobileFooter>
        {isExisting && cards.length > 1 && (
          <Button
            variant="outline"
            type="button"
            loading={isRemoving}
            text="Remove Card"
            style={{ marginRight: '8px' }}
            onClick={() => onRemoveCard()}
            takeFullWidth
          />
        )}
        <Button
          takeFullWidth
          loading={isLoading}
          text="Save"
          onClick={() => {
            if (formRef.current) {
              // @ts-ignore
              formRef.current.handleSubmit();
            }
          }}
        />
      </MobileFooter>
    </Container>
  );
};

export default CardView;
