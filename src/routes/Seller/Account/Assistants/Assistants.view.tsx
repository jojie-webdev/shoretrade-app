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

import { AssistantsGeneratedProps } from './Assistants.props';
import {
  Container,
  SmallAlertContainer,
  AccountName,
  StyledInteaction,
} from './Assistants.style';

const AssistantsView = (props: AssistantsGeneratedProps) => {
  const theme = useTheme();

  const {
    pending,
    goToCreateAssistant,
    accounts,
    onClickAssistant,
    currentCompanyName,
  } = props;

  if (pending) {
    return <Loading />;
  }

  return (
    <Container>
      <InnerRouteHeader title="Fisherman / Assistant" />

      <SmallAlertContainer>
        <div className="icon-container">
          <InfoFilled
            fill={
              theme.appType === 'seller' ? theme.brand.alert : theme.grey.shade8
            }
            height={14}
            width={14}
          />
        </div>
        <Typography variant="caption" className="text" color="alert">
          {`You can give others access to list seafood under “${currentCompanyName}” by adding them as assistants.`}
        </Typography>
      </SmallAlertContainer>

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
