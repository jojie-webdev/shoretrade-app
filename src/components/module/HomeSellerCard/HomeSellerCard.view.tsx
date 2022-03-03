import React, { useState } from 'react';

import { PlaceholderProfile } from 'components/base/SVG';
import { SpecialColors } from 'utils/SFMTheme';
import { useTheme } from 'utils/Theme';

import { HomeSellerCardProps } from './HomeSellerCard.props';
import { Container, StyledTypography } from './HomeSellerCard.style';

const HomeSellerCard = (props: HomeSellerCardProps): JSX.Element => {
  const { companyName, companyImage } = props;
  const theme = useTheme();
  const [defaultImage, setDefaultImage] = useState(companyImage);

  return (
    <Container className="centered">
      <div className="card">
        {(defaultImage || '').length > 0 ? (
          <img // eslint-disable-line
            src={defaultImage}
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
          <StyledTypography
            color={theme.isSFM ? 'secondary' : undefined}
            variant="label"
          >
            {companyName}
          </StyledTypography>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(HomeSellerCard);
