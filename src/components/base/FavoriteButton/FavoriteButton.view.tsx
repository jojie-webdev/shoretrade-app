import React from 'react';

import { HeartFilled, Heart } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { FavoriteButtonProps } from './FavoriteButton.props';
import { Container, SvgContainer } from './FavoriteButton.style';

const FavoriteButton = (props: FavoriteButtonProps): JSX.Element => {
  const theme = useTheme();
  const { isFavorite, onClick, iconOnly = true } = props;

  const icon = isFavorite ? (
    <HeartFilled fill={theme.brand.error} width={22} height={22} />
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
