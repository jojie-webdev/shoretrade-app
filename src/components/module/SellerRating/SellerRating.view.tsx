import React from 'react';

import { Heart, HeartFilled, Star, StarFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';

// import { useTheme } from 'utils/Theme';
import { SellerRatingProps } from './SellerRating.props';
import {
  Row,
  AvatarContainer,
  PreviewDetails,
  AvatarPreview,
  AvatarPlaceholder,
  StarContainer,
  Favorite,
} from './SellerRating.style';

const SellerRating = (props: SellerRatingProps): JSX.Element => {
  // const theme = useTheme();
  const { name, location, uri, isFavorite, onFavorite, rating } = props;
  return (
    <Row>
      {uri ? (
        <AvatarContainer>
          <AvatarPreview src={uri} alt="profile picture"/>
          <Favorite>
            {isFavorite ? <HeartFilled /> : <Heart />}
          </Favorite>
        </AvatarContainer>
      ) : (
        <AvatarContainer>
          <AvatarPlaceholder />
          <Favorite>
            {isFavorite ? <HeartFilled /> : <Heart />}
          </Favorite>
        </AvatarContainer>
      )}

      <PreviewDetails>
        <Typography variant="title5" color="shade9">
          {name}
        </Typography>
        <Typography variant="label" color="shade5">
          {location}
        </Typography>
        <Row>
          {[...Array(5).keys()].map((r) => (
            <StarContainer key={r}>
              {Number(rating) > r ? <StarFilled /> : <Star />}
            </StarContainer>
          ))}
        </Row>
      </PreviewDetails>
  </Row>
  );
};

export default React.memo(SellerRating);
