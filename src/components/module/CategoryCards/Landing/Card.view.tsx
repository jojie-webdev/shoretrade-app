import React from 'react';

// import { useTheme } from 'utils/Theme';
import TypographyView from 'components/base/Typography';
import CategoryImageView from 'components/module/CategoryImage';
import { Row, Col } from 'react-grid-system';

import { CardProps } from './Card.props';
import { CardContainer, Text } from './Card.style';

const Card = (props: CardProps): JSX.Element => {
  return (
    <CardContainer className="centered">
      <div className="card">
        <picture className="thumbnail">
          <CategoryImageView
            id={props.id}
            maxHeight={112}
            containerHeight={112}
            cBorderRadius={'4px 4px 0px 0px'}
            customSVGSize={2}
            circled={true}
          />
        </picture>
        <div className="card-content">
          <Text variant="label">{props.label}</Text>
        </div>
      </div>
    </CardContainer>
  );
};

export default React.memo(Card);
