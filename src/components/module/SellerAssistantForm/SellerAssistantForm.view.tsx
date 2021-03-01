import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Radio from 'components/base/Radio';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import FormikTextField from 'components/module/FormikTextField';
import PhoneTextField from 'components/module/PhoneTextField';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Formik, Form } from 'formik';
import qs from 'qs';
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
} from './SellerAssistantForm.style';

const Role = ({ children, label, checked, onClick }: RoleProps) => (
  <RoleContainer>
    <Radio checked={checked} onClick={onClick} />
    <div className="text-container">
      <Typography color="shade6" className="overline">
        {label}
      </Typography>
      <Typography variant="label" color="noshade">
        {children}
      </Typography>
    </div>
  </RoleContainer>
);

const SellerAssistantFormView = (props: SellerAssistantFormProps) => {
  // const theme = useTheme();
  const {
    companyId,
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
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Fisherman / Assistant',
              link: `${SELLER_ACCOUNT_ROUTES.ASSISTANTS}${qs.stringify(
                { companyId },
                { addQueryPrefix: true }
              )}`,
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
                name="mobile"
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

          {role && setRole && (
            <RolesRow>
              <Col>
                <Typography variant="title6" color="noshade" className="title">
                  Roles & Permissions
                </Typography>

                <Role
                  label="Assistant"
                  checked={role === 'ASSISTANT'}
                  onClick={() => setRole('ASSISTANT')}
                >
                  Has the same permission and user rights as you, the primary
                  account holder, however they cannot edit your bank details or
                  add other fishermen/assistants. User does not appear as a
                  fishermen on your account.
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
