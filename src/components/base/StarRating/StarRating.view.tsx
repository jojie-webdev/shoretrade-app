import React, { useState, useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import { StarRatingProps } from './StarRating.props';
import { Container, StarHolder } from './StarRating.style';
import { Star, StarFilled, StarHalfFilled } from 'components/base/SVG';

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
    return [...new Array(5).keys()].map(starCount => {

      const diff = starsFilled - starCount

      return <StarHolder 
        starSpacing={spacing} 
        editable={editable}
        onClick={() => editable && props.onChange && props.onChange(starCount + 1)}
        onMouseOver={() => editable && setTempRating(starCount + 1)}
      >
        { diff < 1 && diff > 0 ? <StarHalfFilled fill={filledColor || theme.brand.alert} stroke={unfilledColor} width={starSize} height={starSize}/>
          : diff > 0 ? <StarFilled fill={filledColor || theme.brand.alert} width={starSize} height={starSize}/>
          : <Star fill={unfilledColor} width={starSize} height={starSize}/>
        }
      </StarHolder>
    }
      
    )
  }
 
  return (
    <Container 
      starSize={starSize}
      style={style}
      onMouseEnter={() => editable && setUseTemp(true)} 
      onMouseLeave={() => editable && setUseTemp(false)}
    >
      {renderStars()}
    </Container>
  );
};

export default React.memo(StarRating);
