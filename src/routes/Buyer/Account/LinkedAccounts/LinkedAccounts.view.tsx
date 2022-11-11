import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import { CheckFilled, CloseFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter/MobileFooter.view';
import Loading from 'components/module/Loading';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { AssistantsGeneratedProps } from './LinkedAccounts.props';
import {
  Container,
  InfoContainer,
  AccountName,
  StyledInteraction,
  TextContainer,
} from './LinkedAccounts.style';

const AssistantsView = (props: AssistantsGeneratedProps) => {
  const theme = useTheme();
  const { pending, addAssistant, accounts, editAssistant, notifMsg } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  if (pending) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="breadcrumb-container">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            { label: 'Linked Accounts' },
          ]}
        />
      </div>

      {notifMsg && (
        <Alert
          content={notifMsg}
          variant="success"
          fullWidth
          style={{ marginBottom: 16 }}
        />
      )}

      {!notifMsg && (
        <InfoContainer>
          <Typography variant="label" color="shade9">
            {`Add multiple users to your ${
              theme.isSFM ? 'SFMblue' : 'ShoreTrade'
            } by adding Linked Accounts.`}
          </Typography>
          <Typography variant="label" className="text-people" color="shade9">
            {`At no extra charge to you, these Linked Accounts can transact on your behalf.`}
          </Typography>
          <Typography variant="label" className="text-people" color="shade9">
            {`A Linked Account has the same abilities as you, the Primary Account holder, except;`}
          </Typography>
          <TextContainer>
            <CloseFilled fill={theme.brand.error} />
            <Typography variant="label" color="shade9">
              The ability to add other Linked Accounts.
            </Typography>
          </TextContainer>
          <TextContainer>
            <CloseFilled fill={theme.brand.error} />
            <Typography variant="label" color="shade9">
              The ability to access Your Plan and manage your subscription.
            </Typography>
          </TextContainer>
          <TextContainer>
            <CloseFilled fill={theme.brand.error} />
            <Typography variant="label" color="shade9">
              The ability to change Business Name and Business Number.
            </Typography>
          </TextContainer>
        </InfoContainer>
      )}

      {accounts.map((account) => (
        <StyledInteraction
          onClick={() => editAssistant(account.userId)}
          key={account.userId}
          leftComponent={
            <div>
              <Typography color="shade5" variant="overlineSmall">
                {account.relationship}
              </Typography>
              <AccountName>
                {account.firstName} {account.lastName}
              </AccountName>
              <Typography color="shade6" variant="caption">
                {account.email}
              </Typography>
            </div>
          }
        />
      ))}

      {!isMobile && (
        <Row className="btn-add-account">
          <Col>
            <Button text="Add Linked Account" onClick={addAssistant} />
          </Col>
        </Row>
      )}

      <MobileFooter>
        <Button
          text="Add Linked Account"
          takeFullWidth
          onClick={addAssistant}
        />
      </MobileFooter>
    </Container>
  );
};

export default AssistantsView;
