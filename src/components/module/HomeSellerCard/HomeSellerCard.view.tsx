import React, { useState } from 'react';

import { PlaceholderProfile } from 'components/base/SVG';

import { HomeSellerCardProps } from './HomeSellerCard.props';
import { Container, StyledTypography } from './HomeSellerCard.style';

const HomeSellerCard = (props: HomeSellerCardProps): JSX.Element => {
  const { companyName, companyImage } = props;
  const [defaultImage, setDefaultImage] = useState(props.companyImage);

  return (
    <Container className="centered">
      <div className="card">
        {(defaultImage || '').length > 0 ? (
          <img
            src={defaultImage}
            alt={`${companyName}-image`}
            onError={() => {
              setDefaultImage('');
            }}
          />
        ) : (
          <div className="placeholder-image">
            <PlaceholderProfile width={120} height={120} />
          </div>
        )}

        <div className="card-content">
          <StyledTypography variant="label">{companyName}</StyledTypography>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(HomeSellerCard);
