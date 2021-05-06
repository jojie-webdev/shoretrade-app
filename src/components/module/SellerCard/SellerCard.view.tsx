import React, { useState } from 'react';

import { PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import { parseImageUrl } from 'utils/parseImageURL';

import { SellerCardProps } from './SellerCard.props';
import { Container } from './SellerCard.style';

const SellerCard = (props: SellerCardProps): JSX.Element => {
  const { companyName, companyImage } = props;
  const [defaultImage, setDefaultImage] = useState(props.companyImage);

  return (
    <Container className="centered">
      <div className="card">
        {(defaultImage || '').length > 0 ? (
          <img
            src={parseImageUrl(defaultImage)}
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
          <Typography variant="label" weight="bold">
            {companyName}
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(SellerCard);
