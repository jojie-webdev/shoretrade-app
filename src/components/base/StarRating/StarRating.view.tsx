import React, { useState, useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import { StarRatingProps } from './StarRating.props';
import { Container, StarHolder } from './StarRating.style';
import { Star, StarFilled } from 'components/base/SVG';

import { useTheme } from 'utils/Theme';

const StarRating = (props: StarRatingProps): JSX.Element => {
  const theme = useTheme();
  const [tempRating, setTempRating] = useState(0)
  const [useTemp, setUseTemp] = useState(false)
  const { 
    starSize, unfilledColor, filledColor, spacing, style, editable 
  } = props

  const renderStars = () => {
    const starsFilled = useTemp ? tempRating : props.rating
    return [...new Array(5).keys()].map(starCount =>
      <StarHolder 
        editable={editable}
        onClick={() => editable && props.onChange && props.onChange(starCount + 1)}
        onMouseOver={() => editable && setTempRating(starCount + 1)}
      >
        { starCount < starsFilled ? 
          <StarFilled fill={filledColor || theme.brand.alert} width={starSize || 14} height={starSize || 14}/>
          : <Star fill={unfilledColor || theme.grey.shade5} width={starSize || 14} height={starSize || 14}/>            
        }
      </StarHolder>
    )
  }
 
  return (
    <Container 
      style={style}
      starSpacing={spacing || 3} 
      onMouseEnter={() => editable && setUseTemp(true)} 
      onMouseLeave={() => editable && setUseTemp(false)}
    >
      {renderStars()}
    </Container>
  );
};

export default React.memo(StarRating);
