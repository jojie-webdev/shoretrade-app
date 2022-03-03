import React from 'react';

import Typography from 'components/base/Typography/Typography.view';
import CategoryImageView from 'components/module/CategoryImage';
import { SpecialColors, useTheme } from 'utils/SFMTheme';

import { CardProps } from './Card.props';
import { CardContainer } from './Card.style.old';

const Card = (props: CardProps): JSX.Element => {
  const theme = useTheme();
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
            fill={theme.isSFM ? SpecialColors.blue : undefined}
          />
        </picture>
        <div className="card-content">
          <Typography
            color={theme.isSFM ? 'secondary' : undefined}
            variant="label"
            style={{ marginBottom: 4 }}
          >
            {props.label}
          </Typography>
        </div>
      </div>
    </CardContainer>
  );
};

export default React.memo(Card);
