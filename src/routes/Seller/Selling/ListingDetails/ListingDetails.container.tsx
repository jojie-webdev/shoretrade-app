import React, { useEffect } from 'react';

import { SELLER_ROUTES, SELLING_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  editSelectedListingActions,
  endListingActions,
  getAllListingsActions,
} from 'store/actions';
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
  const history = useHistory();

  const listingId = props.match?.params.listingId || '';

  const currentListing = GetListingSelector(listingId);

  const listing = listingToListingProps(currentListing);

  const onEdit = () => {
    dispatch(
      editSelectedListingActions.update({
        id: listingId,
      })
    );
  };

  const onRemove = () => {
    dispatch(
      endListingActions.request({
        listingId,
        companyId: currentListing?.coopId || '',
      })
    );
  };

  useEffect(() => {
    if (!currentListing) {
      dispatch(getAllListingsActions.request());
    }
  }, []);

  const sellingDetailsBreadCrumbs = [
    { label: 'Selling', link: SELLER_ROUTES.SELLING },
    {
      label: listing.productDetails.title,
    },
  ];

  const generatedProps: ListingDetailsGeneratedProps = {
    // generated props here
    listing,
    onEdit,
    onRemove,
    sellingDetailsBreadCrumbs,
  };
  return <ListingDetailsView {...props} {...generatedProps} />;
};

export default ListingDetailsContainer;
