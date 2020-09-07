import React from 'react';

import { Expand, Heart, HeartFilled, Location } from 'components/base/SVG';

// import Tag from '../../primitives/Tag';
import { ProductDetailsCard1Props } from './ProductDetailsCard1.props';
import {
  Container,
  Header,
  Title,
  // TouchHeart,
  Row,
  TagsContainer,
  Size,
  LocationText,
} from './ProductDetailsCard1.style';

const tagProps = {
  labelColor: '#09131D',
  labelFontWeight: '700',
  labelFontSize: '11px',
  cBackgroundColor: '#EDEFFA',
  cBorderRadius: '2px',
  cPadding: '2px 8px',
  cMargin: '0 4px 4px 0',
};

const ProductDetailsCard1View = (props: ProductDetailsCard1Props) => {
  const { title, tags, size, location, isFavorite, onFavorite } = props;

  return (
    <Container {...props}>
      <Header>
        <Row>
          <Title variant="title3">
            {title}
            {onFavorite && (
              <div style={{ float: 'right' }} onClick={onFavorite}>
                {isFavorite ? <HeartFilled /> : <Heart />}
              </div>
            )}
          </Title>
        </Row>
      </Header>
      <Row>
        <Row>
          <Expand />
          {size} <Location width={14} height={16} /> {location}
        </Row>
      </Row>
    </Container>
  );
};

export default ProductDetailsCard1View;
