import React from 'react';

// import { useTheme } from 'utils/Theme';
import { FavoriteButtonProps } from './FavoriteButton.props';
import {
  HeartFilled,
  Heart,
} from 'components/base/SVG';
import { Container, SvgContainer } from './FavoriteButton.style';

const FavoriteButton = (props: FavoriteButtonProps): JSX.Element => {
  // const theme = useTheme();
  const { isFavorite, onClick } = props;
  return (
    <Container onPress={onClick} onClick={onClick}>
      <SvgContainer>
      {isFavorite ? (
        <HeartFilled width={22} height={22} />
        ) : (
          <Heart width={22} height={22} />
          )}
      </SvgContainer>
  </Container>
  );
};

export default React.memo(FavoriteButton);
