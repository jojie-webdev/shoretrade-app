import React from 'react';

// import { useTheme } from 'utils/Theme';
import TypographyView from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';

import { CardProps } from './Card.props';
import { CardContainer } from './Card.style';

const Card = (props: CardProps): JSX.Element => {
  return (
    <CardContainer className="centered">
      <div className="card">
        <picture className="thumbnail">
          <img src={props.image} alt="A banana that looks like a bird" />
        </picture>
        <div className="card-content">
          <TypographyView variant="label" color="primary">
            {props.label}
          </TypographyView>
        </div>
      </div>
    </CardContainer>
  );
};

export default React.memo(Card);
