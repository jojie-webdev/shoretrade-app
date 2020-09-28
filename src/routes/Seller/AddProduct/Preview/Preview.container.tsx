import React, { useEffect } from 'react';

import { SELLING_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  createCustomListingActions,
  createListingActions,
  editSelectedListingActions,
  endListingActions,
  getAllListingsActions,
  getCustomFormDataActions,
  getListingFormDataActions,
  updateListingActions,
} from 'store/actions';
import { GetCategoryData } from 'store/selectors/seller/categories';
import {
  GetListingFormDataSelector,
  GetListingSelector,
} from 'store/selectors/seller/listings';
import { Store } from 'types/store/Store';

import {
  ListingDetailsPublicProps,
  ListingDetailsGeneratedProps,
} from '../../Selling/ListingDetails/ListingDetails.props';
import ListingDetailsView from '../../Selling/ListingDetails/ListingDetails.view';
import { editableListingToListingProps } from './Preview.transform';

const PreviewContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const editableListing = useSelector((state: Store) => state.editableListing);

  const getFormData = () => {
    dispatch(
      getListingFormDataActions.request({
        typeId: editableListing.type || '',
        currentListingId: editableListing.currentListingId || '',
      })
    );
  };

  const getCustomFormData = () => {
    dispatch(getCustomFormDataActions.request());
  };

  const listingFormData = GetListingFormDataSelector();
  const categoryData = GetCategoryData(
    editableListing?.customTypeData?.categoryId || ''
  );
  const isCustomType = editableListing?.isCustomType || false;

  const currentUser = useSelector(
    (state: Store) => state.getUser.data?.data.user
  );

  const sellerImage = currentUser?.profileImage;

  const listing = editableListingToListingProps(
    editableListing,
    listingFormData,
    categoryData,
    sellerImage
  );

  const isPendingCreateListing =
    useSelector((state: Store) => state.createListing.pending) || false;
  const isPendingCreateCustomListing =
    useSelector((state: Store) => state.createCustomListing.pending) || false;
  const isPendingUpdateListing =
    useSelector((state: Store) => state.updateListing.pending) || false;
  const isPending =
    isPendingCreateListing ||
    isPendingCreateCustomListing ||
    isPendingUpdateListing;

  const isExisting = (editableListing?.currentListingId || '').length > 0;

  const onCreate = () => {
    if (!isPending) {
      if (isExisting) {
        dispatch(updateListingActions.request());
      } else if (isCustomType) {
        dispatch(createCustomListingActions.request());
      } else {
        dispatch(createListingActions.request());
      }
    }
  };

  useEffect(() => {
    if (!listingFormData) {
      getFormData();
    }

    if (!categoryData) {
      getCustomFormData();
    }
  }, []);

  const generatedProps: ListingDetailsGeneratedProps = {
    // generated props here
    listing,
    onCreate,
    isExisting,
  };
  return <ListingDetailsView {...generatedProps} />;
};

export default PreviewContainer;
