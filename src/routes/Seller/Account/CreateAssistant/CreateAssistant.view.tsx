import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Radio from 'components/base/Radio';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import PhoneTextField from 'components/module/PhoneTextField';
import { Formik, Form } from 'formik';
import { Col } from 'react-grid-system';

import {
  CreateAssistantGeneratedProps,
  RoleProps,
} from './CreateAssistant.props';
import {
  Container,
  RoleContainer,
  TextFieldRow,
  RolesRow,
  StyledAlert,
} from './CreateAssistant.style';
import { isValid } from './CreateAssistant.validation';

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

const CreateAssistantView = (props: CreateAssistantGeneratedProps) => {
  // const theme = useTheme();
  const {
    role,
    setRole,
    callingCode,
    setCallingCode,
    onClickCreate,
    success,
    error,
    pending,
  } = props;

  const formikInitial = {
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
    },
    validate: isValid,
    onSubmit: onClickCreate,
  };

  return (
    <Container>
      <InnerRouteHeader title="Create Fisherman / Assistant" />

      {success && (
        <StyledAlert
          content="Fisherman / Assistant successfully created!"
          variant="success"
          alignText="center"
          fullWidth
        />
      )}

      {error && (
        <StyledAlert
          content="An error has occurred while creating an assistant! Try again later."
          variant="error"
          alignText="center"
          fullWidth
        />
      )}

      <Formik {...formikInitial}>
        <Form>
          <TextFieldRow>
            <Col md={6} className="textfield-container">
              <FormikTextField label="First Name" name="firstName" />
            </Col>
            <Col md={6} className="textfield-container">
              <FormikTextField label="Last Name" name="lastName" />
            </Col>
            <Col md={6} className="textfield-container">
              <PhoneTextField
                label="Mobile"
                name="mobile"
                callingCode={callingCode}
                setCallingCode={setCallingCode}
              />
            </Col>
            <Col md={6} className="textfield-container">
              <FormikTextField label="Email" name="email" />
            </Col>
          </TextFieldRow>

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
                Can only view sales for items they have listed. Cannot edit your
                bank, address, password or linked accounts.
              </Role>
            </Col>
          </RolesRow>

          <Button
            text="Create Linked Account"
            type="submit"
            loading={pending}
          />
        </Form>
      </Formik>
    </Container>
  );
};

export default CreateAssistantView;
