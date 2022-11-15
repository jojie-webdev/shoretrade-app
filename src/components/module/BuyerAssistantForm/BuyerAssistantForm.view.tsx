import React, { useRef, useState } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import ConfirmationModal from 'components/module/ConfirmationModal';
import FormikTextField from 'components/module/FormikTextField';
import PhoneTextField from 'components/module/PhoneTextField';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik, Form } from 'formik';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { BuyerAssistantFormProps } from './BuyerAssistantForm.props';
import { Container, TextFieldRow } from './BuyerAssistantForm.style';

const BuyerAssistantForm = (props: BuyerAssistantFormProps): JSX.Element => {
  const {
    callingCode,
    setCallingCode,
    error,
    pending,
    formikInitial,
    type,
    onClickDelete,
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  let routeHeader = '';
  let buttonText = '';

  if (type === 'CREATE') {
    routeHeader = 'Create Linked Account';
    buttonText = 'Create Linked Account';
  } else if (type === 'EDIT') {
    routeHeader = 'Update Linked Account';
    buttonText = 'Delete Linked Account';
  }

  const formRef = useRef();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Linked Accounts',
              link: BUYER_ACCOUNT_ROUTES.LINKED_ACCOUNTS,
            },
            { label: routeHeader },
          ]}
        />
      </div>

      {(error || '')?.length > 0 && (
        <Alert
          content={
            error ||
            'An error has occurred while creating an assistant! Try again later.'
          }
          variant="error"
          alignText="center"
          fullWidth
          style={{
            marginBottom: 16,
          }}
        />
      )}

      <Formik
        // @ts-ignore
        innerRef={formRef}
        initialValues={formikInitial.initialValues}
        onSubmit={formikInitial.onSubmit}
        validate={formikInitial?.validate}
        enableReinitialize
      >
        <Form>
          <TextFieldRow>
            <Col md={12} xl={4} className="textfield-container">
              <FormikTextField
                label="First Name"
                name="firstName"
                readOnly={type === 'EDIT'}
              />
            </Col>
            <Col md={12} xl={4} className="textfield-container">
              <FormikTextField
                label="Last Name"
                name="lastName"
                readOnly={type === 'EDIT'}
              />
            </Col>
            <Col xl={4} />
            <Col md={12} xl={4} className="textfield-container">
              <PhoneTextField
                label="Mobile"
                name="mobile_no"
                callingCode={callingCode}
                setCallingCode={(cc) => setCallingCode && setCallingCode(cc)}
                readOnly={type === 'EDIT'}
              />
            </Col>
            <Col md={12} xl={4} className="textfield-container">
              <FormikTextField
                label="Email"
                name="email"
                readOnly={type === 'EDIT'}
              />
            </Col>
          </TextFieldRow>

          {!isMobile && (
            <Button
              text={buttonText}
              type={type === 'CREATE' ? 'submit' : 'button'}
              loading={pending}
              onClick={() => {
                if (type === 'EDIT') {
                  setShowDelete(true);
                } else if (formRef.current) {
                  // @ts-ignore
                  formRef.current.handleSubmit();
                }
              }}
            />
          )}
        </Form>
      </Formik>

      <MobileFooter>
        <Button
          text={buttonText}
          takeFullWidth
          onClick={() => {
            if (type === 'EDIT') {
              setShowDelete(true);
            } else if (formRef.current) {
              // @ts-ignore
              formRef.current.handleSubmit();
            }
          }}
          loading={pending}
        />
      </MobileFooter>

      <ConfirmationModal
        isOpen={showDelete}
        title="Delete Linked Account"
        description="Are you sure you want to delete this linked account?"
        action={() => {
          onClickDelete && onClickDelete();
        }}
        actionText="DELETE"
        onClickClose={() => setShowDelete(false)}
      />
    </Container>
  );
};

export default React.memo(BuyerAssistantForm);
