import React from 'react';

import Spinner from 'components/base/Spinner';
import SellerRating from 'components/module/SellerRating';
import Typography from 'components/base/Typography';

// import { useTheme } from 'utils/Theme';
import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import { Container, SpinnerContainer, ListingContainer, ListingCounter } from './SellerDetails.style';

const SellerDetailsView = (props: SellerDetailsGeneratedProps) => {
  // const theme = useTheme();
  const { loading, listings } = props;

  return (
    <Container>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <SellerRating {...props} />

          <ListingContainer>
            <Typography variant="title5" color="shade9">
              Active Listing <ListingCounter>{listings?.length}</ListingCounter>
            </Typography>
          </ListingContainer>
        </>
      )}
    </Container>
  );
};

export default SellerDetailsView;
