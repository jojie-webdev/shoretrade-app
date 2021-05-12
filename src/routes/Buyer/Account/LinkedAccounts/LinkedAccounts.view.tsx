import React from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import { CheckFilled, CloseFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
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
      <BoxContainer>
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
              {`If you want to give others access to you account, you can add a “linked account”.`}
            </Typography>
            <Typography variant="label" className="text-people" color="shade9">
              {`People with linked account…`}
            </Typography>
            <TextContainer>
              <CheckFilled fill={theme.brand.success} />
              <Typography variant="label" color="shade9">
                {`Linked Accounts can make purchases and track orders using your stored credit cards or existing credit balance.`}
              </Typography>
            </TextContainer>

            <TextContainer>
              <CloseFilled fill={theme.brand.error} />
              <Typography variant="label" color="shade9">
                {`Linked Accounts cannot add other linked accounts or use your stored credit card.`}
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
      </BoxContainer>
    </Container>
  );
};

export default AssistantsView;
