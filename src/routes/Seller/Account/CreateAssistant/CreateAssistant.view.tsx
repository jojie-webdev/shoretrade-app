import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Radio from 'components/base/Radio';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Row, Col } from 'react-grid-system';

import {
  CreateAssistantGeneratedProps,
  RoleProps,
} from './CreateAssistant.props';
import {
  Container,
  RoleContainer,
  TextFieldRow,
  RolesRow,
} from './CreateAssistant.style';

const Role = ({ children, label, checked }: RoleProps) => (
  <RoleContainer style={{ display: 'flex' }}>
    <div className="radio-container">
      <Radio checked />
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
  return (
    <Container>
      <InnerRouteHeader title="Create Fisherman / Assistant" />

      <TextFieldRow>
        <Col md={6} className="textfield-container">
          <TextField label="First Name" />
        </Col>
        <Col md={6} className="textfield-container">
          <TextField label="Last Name" />
        </Col>
        <Col md={6} className="textfield-container">
          <TextField label="Mobile" /> {/* TODO: Add Mobile flags*/}
        </Col>
        <Col md={6} className="textfield-container">
          <TextField label="Email" />
        </Col>
      </TextFieldRow>

      <RolesRow>
        <Col>
          <Typography color="noshade" className="title">
            Roles & Permissions
          </Typography>

          <Role label="Assistant" checked>
            Has the same permissions as you, the primary account holder, though
            they connect edit your bank details or add other fishermen /
            assistants. Does not appear as a fisherman on your account.
          </Role>

          <Role label="Fisherman" checked>
            Can list and edit items as fisherman using your business name. Can
            only view sales for items they have listed. Cannot edit your bank,
            address, password or linked accounts.
          </Role>
        </Col>
      </RolesRow>

      <Button text="Create Linked Account" />
    </Container>
  );
};

export default CreateAssistantView;
