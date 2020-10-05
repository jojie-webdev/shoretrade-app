import React from 'react';

import AlertInfoView from 'components/base/AlertInfo';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { AssistantsGeneratedProps } from './LinkedAccounts.props';
import {
  Container,
  SmallAlertContainer,
  AccountName,
  StyledInteaction,
} from './LinkedAccounts.style';

const AssistantsView = (props: AssistantsGeneratedProps) => {
  const theme = useTheme();
  const {
    pending,
    addAssistant,
    accounts,
    editAssistant,
    currentCompanyName,
  } = props;

  if (pending) {
    return <Loading />;
  }

  return (
    <Container>
      <InnerRouteHeader title="Linked Accounts" />
      <Row nogutter style={{ marginBottom: 24 }}>
        <Col>
          <AlertInfoView
            dark
            label={`You can give others access to list seafood under “${currentCompanyName}” by adding them as assistants.`}
          />
        </Col>
      </Row>

      {accounts.map((account) => (
        <StyledInteaction
          onClick={() => editAssistant(account.userId)}
          key={account.userId}
          leftComponent={
            <div>
              <Typography color="shade6" variant="overline">
                {account.relationship}
              </Typography>
              <AccountName>
                {account.firstName} {account.lastName}
              </AccountName>
              <Typography color="shade5" variant="caption">
                {account.email}
              </Typography>
            </div>
          }
        />
      ))}

      <Row nogutter>
        <Col>
          <Button text="Add assistant" onClick={addAssistant} />
        </Col>
      </Row>
    </Container>
  );
};

export default AssistantsView;
