import React from 'react';

import Typography from 'components/base/Typography/Typography.view';
import CategoryImageView from 'components/module/CategoryImage';
import { SpecialColors, useTheme } from 'utils/SFMTheme';

import { CardProps } from './Card.props';
import { CardContainer } from './Card.style';

const Card = (props: CardProps): JSX.Element => {
  const theme = useTheme();
  return (
    <CardContainer responsive={props.responsive}>
      <div className="card">
        <CategoryImageView
          id={props.id}
          maxHeight={112}
          containerHeight={112}
          cBorderRadius={'8px 8px 0px 0px'}
          customSVGSize={2}
          circled={true}
          fill={theme.isSFM ? SpecialColors.blue : undefined}
        />
        <div className="card-content">
          <Typography
            color={theme.isSFM ? 'secondary' : undefined}
            variant="label"
            weight="bold"
          >
            {props.label}
          </Typography>
        </div>
      </div>
    </CardContainer>
  );
};

export default React.memo(Card);
