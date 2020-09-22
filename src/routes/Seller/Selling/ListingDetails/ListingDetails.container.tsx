import React, { useEffect } from 'react';

import { SELLING_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GetListingSelector } from 'store/selectors/seller/listings';
import { Store } from 'types/store/Store';

import {
  ListingDetailsPublicProps,
  ListingDetailsGeneratedProps,
} from './ListingDetails.props';
import { listingToListingProps } from './ListingDetails.transform';
import ListingDetailsView from './ListingDetails.view';

const ListingDetailsContainer = (
  props: ListingDetailsPublicProps
): JSX.Element => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const { listingId } = props.match.params;

  const currentListing = GetListingSelector(listingId);

  const listing = listingToListingProps(currentListing);

  // const onRemove = () => {
  //   dispatch(
  //     endListingActions.request({
  //       listingId,
  //       companyId: currentListing?.coopId || '',
  //     })
  //   );
  // };

  // if (!currentListing) {
  //   history.push(SELLING_ROUTES.LANDING);
  // }

  const generatedProps: ListingDetailsGeneratedProps = {
    // generated props here
    listing,
  };
  return <ListingDetailsView {...props} {...generatedProps} />;
};

export default ListingDetailsContainer;
