import React from 'react';

// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography/Typography.view';
import CategoryImageView from 'components/module/CategoryImage';

import { CardProps } from './Card.props';
import { CardContainer } from './Card.style';

const Card = (props: CardProps): JSX.Element => {
  return (
    <CardContainer>
      <div className="card">
        <CategoryImageView
          id={props.id}
          maxHeight={112}
          containerHeight={112}
          cBorderRadius={'8px 8px 0px 0px'}
          customSVGSize={2}
          circled={true}
        />
        <div className="card-content">
          <Typography variant="label" weight="bold">
            {props.label}
          </Typography>
        </div>
      </div>
    </CardContainer>
  );
};

export default React.memo(Card);
