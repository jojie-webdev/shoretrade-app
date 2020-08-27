import React from 'react';

import SellerDetailsView from './SellerDetails.view';

const SellerDetails = (): JSX.Element => {
  const generatedProps = {
    // generated props here
    loading: false,
    id: 'x',
    companyName: 'Test',
    companyImage: 'https://images.generated.photos/Xm1kjxyIRVKaGQWKUR1Zm-FX7GH0EzZ_M5y97YFZOwM/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyODA5NDAuanBn.jpg',
    companyLocation: {
      state: '',
      countryCode: '',
    },
    rating: 5,
    isFavourite: true,
    onFavorite: () => new Promise(() => {}),
  };

  return <SellerDetailsView {...generatedProps} />;
};

export default SellerDetails;
