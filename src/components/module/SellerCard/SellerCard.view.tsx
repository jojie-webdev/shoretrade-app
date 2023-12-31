import React, { useState } from 'react';

import { PlaceholderProfile } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import { parseImageUrl } from 'utils/parseImageURL';
import { SpecialColors } from 'utils/SFMTheme';
import { useTheme } from 'utils/Theme';

import { SellerCardProps } from './SellerCard.props';
import { Container } from './SellerCard.style';

const SellerCard = (props: SellerCardProps): JSX.Element => {
  const { companyName, companyImage } = props;
  const [defaultImage, setDefaultImage] = useState(companyImage);
  const theme = useTheme();
  return (
    <Container className="centered">
      <div className="card">
        {(defaultImage || '').length > 0 ? (
          <img // eslint-disable-line
            src={parseImageUrl(defaultImage)}
            alt={`${companyName}-image`}
            onError={() => {
              setDefaultImage('');
            }}
          />
        ) : (
          <div className="placeholder-image">
            <PlaceholderProfile
              fill={theme.isSFM ? SpecialColors.blue : undefined}
              width={120}
              height={120}
            />
          </div>
        )}

        <div className="card-content">
          <Typography
            color={theme.isSFM ? 'secondary' : undefined}
            variant="label"
            weight="bold"
          >
            {companyName}
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(SellerCard);
