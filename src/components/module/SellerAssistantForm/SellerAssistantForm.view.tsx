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

import {
  SellerAssistantFormProps,
  RoleProps,
} from './SellerAssistantForm.props';
import {
  Container,
  RoleContainer,
  TextFieldRow,
  RolesRow,
  StyledAlert,
} from './SellerAssistantForm.style';

const Role = ({ children, label, checked, onClick }: RoleProps) => (
  <RoleContainer style={{ display: 'flex' }}>
    <div className="radio-container">
      <Radio checked={checked} onClick={onClick} />
    </div>
    <div className="text-container">
      <Typography color="shade6" variant="overline" className="overline">
        {label}
      </Typography>
      <Typography color="noshade">{children}</Typography>
    </div>
  </RoleContainer>
);

const SellerAssistantFormView = (props: SellerAssistantFormProps) => {
  // const theme = useTheme();
  const {
    role,
    setRole,
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
    routeHeader = 'Create Fisherman / Assistant';
    successContent = 'Fisherman / Assistant successfully created!';
    buttonText = 'Create Linked Account';
  } else if (type === 'EDIT') {
    routeHeader = 'Update Fisherman / Assistant';
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

          {role && setRole && (
            <RolesRow>
              <Col>
                <Typography color="noshade" className="title">
                  Roles & Permissions
                </Typography>

                <Role
                  label="Assistant"
                  checked={role === 'ASSISTANT'}
                  onClick={() => setRole('ASSISTANT')}
                >
                  Has the same permissions as you, the primary account holder,
                  though they connect edit your bank details or add other
                  fishermen / assistants. Does not appear as a fisherman on your
                  account.
                </Role>

                <Role
                  label="Fisherman"
                  checked={role === 'FISHERMAN'}
                  onClick={() => setRole('FISHERMAN')}
                >
                  Can list and edit items as fisherman using your business name.
                  Can only view sales for items they have listed. Cannot edit
                  your bank, address, password or linked accounts.
                </Role>
              </Col>
            </RolesRow>
          )}

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

export default SellerAssistantFormView;
