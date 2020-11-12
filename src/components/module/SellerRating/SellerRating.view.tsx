import React, { useState } from 'react';

import {
  Heart,
  HeartFilled,
  PlaceholderProfile,
  Star,
  StarFilled,
} from 'components/base/SVG';
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
  const {
    companyName,
    companyLocation,
    companyImage,
    isFavorite,
    onFavorite,
    rating,
  } = props;

  const hasLocation =
    companyLocation?.state !== '' && companyLocation?.countryCode !== '';

  const [defaultImage, setDefaultImage] = useState(companyImage);

  return (
    <Row>
      <AvatarContainer>
        {(defaultImage || '').length > 0 ? (
          <AvatarPreview
            src={defaultImage}
            alt={`${companyName}-image`}
            onError={() => {
              setDefaultImage('');
            }}
          />
        ) : (
          <AvatarPlaceholder>
            <PlaceholderProfile width={96} height={96} />
          </AvatarPlaceholder>
        )}
        <Favorite onClick={onFavorite}>
          {isFavorite ? (
            <HeartFilled width={22} height={22} />
          ) : (
            <Heart width={22} height={22} />
          )}
        </Favorite>
      </AvatarContainer>

      <PreviewDetails>
        <Typography variant="title5" color="shade9">
          {companyName}
        </Typography>
        <Typography variant="label" color="shade5">
          {companyLocation?.state}
          {companyLocation?.countryCode && `, ${companyLocation?.countryCode}`}
        </Typography>
        <Row>
          {[...Array(5).keys()].map((r) => (
            <StarContainer hasLocation={hasLocation} key={r}>
              {Number(rating) > r ? <StarFilled /> : <Star />}
            </StarContainer>
          ))}
        </Row>
      </PreviewDetails>
    </Row>
  );
};

export default React.memo(SellerRating);
