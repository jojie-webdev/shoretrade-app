import React from 'react';

import Button from 'components/base/Button';
import { CheckFilled, CloseFilled } from 'components/base/SVG';
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
  TextContainer,
} from './LinkedAccounts.style';

const AssistantsView = (props: AssistantsGeneratedProps) => {
  const theme = useTheme();
  const { pending, addAssistant, accounts, editAssistant, notifMsg } = props;

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
          <Typography variant="body" weight="500" color="shade8">
            {`If you want to give others access to you account, you can add a “linked account”`}
          </Typography>
          <Typography
            variant="body"
            weight="500"
            className="text-people"
            color="shade8"
          >
            {`People with linked account…`}
          </Typography>
          <TextContainer>
            <CheckFilled
              fill={theme.brand.success}
              height={16.67}
              width={16.67}
            />
            <Typography
              variant="body"
              weight="500"
              className="text"
              color="shade8"
            >
              {`Can make purchases and track orders using your stored credit cards or existing credit balance`}
            </Typography>
          </TextContainer>

          <TextContainer>
            <CloseFilled
              fill={theme.brand.error}
              height={16.67}
              width={16.67}
            />
            <Typography
              variant="body"
              weight="500"
              className="text"
              color="shade8"
            >
              {`Cannot add other linked accounts`}
            </Typography>
          </TextContainer>
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
