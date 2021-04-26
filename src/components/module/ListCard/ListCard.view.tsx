import React from 'react';

import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { Col, Row } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { ListCardProps } from './ListCard.props';
import { Container, RightIconContainer, ListCardTotal } from './ListCard.style';

const ListCard = (props: ListCardProps): JSX.Element => {
  // const theme = useTheme();
  const { title, icon, listItems, totalCount } = props;
  return (
    <Container>
      <Row style={{ marginBottom: 16 }} justify="between">
        <Col>
          <Typography color="shade6" variant="overline">
            {title}
          </Typography>
        </Col>
        <Col>
          <RightIconContainer>{icon}</RightIconContainer>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListCardTotal color="shade9" variant="title3">
            {totalCount}
          </ListCardTotal>
        </Col>
      </Row>
      <Row>
        <Col>{listItems}</Col>
      </Row>
    </Container>
  );
};

export default React.memo(ListCard);
