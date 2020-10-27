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
  StyledAlert,
} from './LinkedAccounts.style';

const AssistantsView = (props: AssistantsGeneratedProps) => {
  const theme = useTheme();
  const {
    pending,
    addAssistant,
    accounts,
    editAssistant,
    currentCompanyName,
    notifMsg
  } = props;

  if (pending) {
    return <Loading />;
  }

  return (
    <Container>
      <InnerRouteHeader title="Linked Accounts" />

      {notifMsg && (
        <StyledAlert content={notifMsg} variant="success" fullWidth />
      )}

      {!notifMsg && (
        <SmallAlertContainer>
          <div className="icon-container">
            <InfoFilled fill={theme.grey.shade8} height={20} width={20} />
          </div>
          <Typography variant="caption" className="text" color="shade8">
            {`You can give others access to list seafood under “${currentCompanyName}” by adding them as assistants.`}
          </Typography>
        </SmallAlertContainer>
      )}

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
