import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import Loading from 'components/module/Loading';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { AssistantsGeneratedProps } from './Assistants.props';
import {
  Container,
  SmallAlertContainer,
  AccountName,
  StyledInteaction,
} from './Assistants.style';

const AssistantsView = (props: AssistantsGeneratedProps) => {
  const theme = useTheme();

  const { pending, goToCreateAssistant, accounts } = props;

  if (pending) {
    return <Loading />;
  }

  return (
    <Container>
      <InnerRouteHeader title="Fisherman / Assistant" />

      <Row>
        <Col>
          <SmallAlertContainer>
            <div className="icon-container">
              <InfoFilled fill={theme.brand.alert} height={16} width={16} />
            </div>
            <Typography color="alert" variant="caption">
              You can give others access to list seafood under “Manettas
              Seafood” by adding them as either fisherman or assistants.
            </Typography>
          </SmallAlertContainer>
        </Col>
      </Row>

      {accounts.map((account) => (
        <StyledInteaction
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

      <Row>
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
