import React from 'react';

// import { useTheme } from 'utils/Theme';
import TypographyView from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';

import { CardProps } from './Card.props';
import {
  CardContainer,
  TopCardContainer,
  BottomCardContainer,
} from './Card.style';

const Card = (props: CardProps): JSX.Element => {
  return (
    <Row style={{ marginRight: 290 }}>
      <Col>
        <CardContainer>
          <Row>
            <TopCardContainer src={props.image}></TopCardContainer>
          </Row>
          <Row>
            <BottomCardContainer>
              <TypographyView
                style={{ paddingLeft: '10px' }}
                variant="label"
                color="primary"
              >
                {props.label}
              </TypographyView>
            </BottomCardContainer>
          </Row>
        </CardContainer>
      </Col>
    </Row>
  );
};

export default React.memo(Card);
