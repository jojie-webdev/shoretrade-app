import React from 'react';

import Button from 'components/base/Button';
import { InfoFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { AssistantsGeneratedProps } from './Assistants.props';
import { Container, SmallAlertContainer } from './Assistants.style';

const AssistantsView = (props: AssistantsGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();

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

      <Row>
        <Col>
          <Button
            text="Add a fisherman / assistant"
            onClick={() => history.push(SELLER_ACCOUNT_ROUTES.CREATE_ASSISTANT)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AssistantsView;
