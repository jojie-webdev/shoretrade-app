import React from 'react';

import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { Col, Row } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { ListCardProps } from './ListCard.props';
import { Container, RightIconContainer } from './ListCard.style';

const ListCard = (props: ListCardProps): JSX.Element => {
  // const theme = useTheme();
  const { title, icon } = props;
  return (
    <Container>
      <Row justify="between">
        <Col>
          <Typography color="shade6" variant="overline">
            {title}
          </Typography>
        </Col>
        <Col>
          <RightIconContainer>{icon}</RightIconContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(ListCard);
