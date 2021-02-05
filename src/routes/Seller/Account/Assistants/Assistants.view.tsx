import React from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { AssistantsGeneratedProps } from './Assistants.props';
import { Container, AccountName, StyledInteaction } from './Assistants.style';

const AssistantsView = (props: AssistantsGeneratedProps) => {
  const theme = useTheme();

  const {
    pending,
    goToCreateAssistant,
    accounts,
    onClickAssistant,
    currentCompanyName,
    notifMsg,
  } = props;

  if (pending) {
    return <Loading />;
  }

  return (
    <Container>
      <InnerRouteHeader title="Fisherman / Assistant" />

      {notifMsg && (
        <Alert
          content={notifMsg}
          variant="success"
          fullWidth
          style={{
            marginBottom: 16,
          }}
        />
      )}

      {!notifMsg && (
        <Alert
          variant="infoAlert"
          fullWidth
          content={`You can give others access to list seafood under “${currentCompanyName}” by adding them as assistants.`}
          style={{ marginBottom: 24 }}
        />
      )}

      {accounts.map((account) => (
        <StyledInteaction
          onClick={() => onClickAssistant(account.userId)}
          key={account.userId}
          leftComponent={
            <div>
              <Typography color="shade6" variant="overline">
                {account.relationship}
              </Typography>
              <AccountName color="noshade">
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
          <Button
            text="Add a fisherman / assistant"
            onClick={goToCreateAssistant}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AssistantsView;
