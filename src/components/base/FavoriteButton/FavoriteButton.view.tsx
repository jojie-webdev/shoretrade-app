import React from 'react';

// import { useTheme } from 'utils/Theme';
import { HeartFilled, Heart } from 'components/base/SVG';
import { Typography } from 'components/module/CategoryCards/Landing/Card.style';

import { FavoriteButtonProps } from './FavoriteButton.props';
import { Container, SvgContainer } from './FavoriteButton.style';

const FavoriteButton = (props: FavoriteButtonProps): JSX.Element => {
  // const theme = useTheme();
  const { isFavorite, onClick, iconOnly = true } = props;

  const icon = isFavorite ? (
    <HeartFilled width={22} height={22} />
  ) : (
    <Heart width={22} height={22} />
  );

  return (
    <Container onPress={onClick} onClick={onClick}>
      <SvgContainer>{icon}</SvgContainer>{' '}
      {!iconOnly && (
        <Typography variant="overline" style={{ marginRight: 8 }}>
          {' '}
          Favourite
        </Typography>
      )}
    </Container>
  );
};

export default React.memo(FavoriteButton);
