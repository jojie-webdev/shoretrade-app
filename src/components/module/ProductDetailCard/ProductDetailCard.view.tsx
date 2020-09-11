import React from 'react';

import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { ProductDetailCardProps } from './ProductDetailCard.props';
import {
  Row,
  HorizontalRule,
  Preview,
  VendorLocation,
  SeafoodName,
  TagsContainer,
  Tag,
  SeafoodDetails,
  TagText,
  Details,
  Value,
  Right,
} from './ProductDetailCard.style';

const ProductDetailCard = (props: ProductDetailCardProps): JSX.Element => {
  const theme = useTheme();
  const {
    uri,
    name,
    tags,
    weight,
    size,
    location,
    vendor,
    unit = 'Kg',
  } = props;

  return (
    <>
      <HorizontalRule />
      <SeafoodDetails>
        <Details>
          <Preview src={uri} />
        </Details>
        <Details>
          <SeafoodName variant="body" weight="bold" color="shade9">
            {name}
          </SeafoodName>
          <TagsContainer>
            {tags &&
              tags.length !== 0 &&
              tags.map((t) => (
                <Tag key={t.label}>
                  <TagText variant="small" color="shade9" weight="900">
                    {t.label}
                  </TagText>
                </Tag>
              ))}
          </TagsContainer>
        </Details>
      </SeafoodDetails>
      <Row>
        <Value>
          <Typography variant="body" color="shade6">
            Weight:
          </Typography>
          <Right color="shade8" variant="body" weight="bold">
            {weight} {unit}
          </Right>
        </Value>
        <Value>
          <Typography variant="body" color="shade6">
            Size:
          </Typography>
          <Right color="shade8" variant="body" weight="bold">
            {size}
          </Right>
        </Value>
      </Row>
      <VendorLocation>
        <Value>
          <Typography variant="body" color="shade6">
            Location:
          </Typography>
          <Right color="shade8" variant="body" weight="bold">
            {location}
          </Right>
        </Value>
        <Value>
          <Typography variant="body" color="shade6">
            Vendor:
          </Typography>
          <Right color="shade8" variant="body" weight="bold">
            {vendor}
          </Right>
        </Value>
      </VendorLocation>
    </>
  );
};

export default React.memo(ProductDetailCard);
