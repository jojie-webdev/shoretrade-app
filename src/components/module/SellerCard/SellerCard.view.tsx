import React from 'react';

// import { useTheme } from 'utils/Theme';
import { SellerCardProps } from './SellerCard.props';
import { Container, StyledTypography } from './SellerCard.style';

const SellerCard = (props: SellerCardProps): JSX.Element => {
  // const theme = useTheme();
  const { companyName, companyImage } = props;

  return (
    <Container className="centered">
      <div className="card">
        <img src={companyImage} alt={companyImage} />
        <div className="card-content">
          <StyledTypography variant="label">{companyName}</StyledTypography>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(SellerCard);
