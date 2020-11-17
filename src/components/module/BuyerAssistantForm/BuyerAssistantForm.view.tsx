import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Radio from 'components/base/Radio';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import PhoneTextField from 'components/module/PhoneTextField';
import { Formik, Form } from 'formik';
import { Col } from 'react-grid-system';

import { BuyerAssistantFormProps } from './BuyerAssistantForm.props';
import {
  Container,
  TextFieldRow,
  StyledAlert,
} from './BuyerAssistantForm.style';

const BuyerAssistantForm = (props: BuyerAssistantFormProps): JSX.Element => {
  const {
    callingCode,
    setCallingCode,
    success,
    error,
    pending,
    formikInitial,
    type,
    onClickDelete,
  } = props;

  let routeHeader = '';
  let successContent = '';
  let buttonText = '';

  if (type === 'CREATE') {
    routeHeader = 'Create Assistant';
    successContent = 'Assistant successfully created!';
    buttonText = 'Create Linked Account';
  } else if (type === 'EDIT') {
    routeHeader = 'Update Assistant';
    buttonText = 'Delete Linked Account';
  }

  const [showDelete, setShowDelete] = useState(false);

  return (
    <Container>
      <InnerRouteHeader title={routeHeader} />

      {(error || '')?.length > 0 && (
        <StyledAlert
          content={
            error ||
            'An error has occurred while creating an assistant! Try again later.'
          }
          variant="error"
          alignText="center"
          fullWidth
        />
      )}

      <Formik
        initialValues={formikInitial.initialValues}
        onSubmit={formikInitial.onSubmit}
        validate={formikInitial?.validate}
        enableReinitialize
      >
        <Form>
          <TextFieldRow>
            <Col md={6} className="textfield-container">
              <FormikTextField
                label="First Name"
                name="firstName"
                readOnly={type === 'EDIT'}
              />
            </Col>
            <Col md={6} className="textfield-container">
              <FormikTextField
                label="Last Name"
                name="lastName"
                readOnly={type === 'EDIT'}
              />
            </Col>
            <Col md={6} className="textfield-container">
              <PhoneTextField
                label="Mobile"
                name="mobile"
                callingCode={callingCode}
                setCallingCode={(cc) => setCallingCode && setCallingCode(cc)}
                readOnly={type === 'EDIT'}
              />
            </Col>
            <Col md={6} className="textfield-container">
              <FormikTextField
                label="Email"
                name="email"
                readOnly={type === 'EDIT'}
              />
            </Col>
          </TextFieldRow>

          <Button
            text={buttonText}
            type={type === 'CREATE' ? 'submit' : 'button'}
            loading={pending}
            onClick={() => {
              if (type === 'EDIT') {
                setShowDelete(true);
              }
            }}
          />
        </Form>
      </Formik>

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
