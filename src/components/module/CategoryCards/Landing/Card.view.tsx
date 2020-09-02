import React from 'react';

// import { useTheme } from 'utils/Theme';
import TypographyView from 'components/base/Typography';
import CategoryImageView from 'components/module/CategoryImage';
import { Row, Col } from 'react-grid-system';

import { CardProps } from './Card.props';
import { CardContainer } from './Card.style';

const Card = (props: CardProps): JSX.Element => {
  return (
    <CardContainer className="centered">
      <div className="card">
        <picture className="thumbnail">
          <CategoryImageView id={props.id} maxHeight={150} />
        </picture>
        <div className="card-content">
          <TypographyView variant="label">{props.label}</TypographyView>
        </div>
      </div>
    </CardContainer>
  );
};

export default React.memo(Card);
