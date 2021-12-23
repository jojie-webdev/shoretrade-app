import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  createCustomListingActions,
  createListingActions,
  getCustomFormDataActions,
  getListingFormDataActions,
  updateListingActions,
} from 'store/actions';
import { GetCompanyAddresses } from 'store/selectors/seller/addresses';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { GetListingFormDataSelector } from 'store/selectors/seller/listings';
import { Store } from 'types/store/Store';

import { ListingDetailsGeneratedProps } from '../../Selling/ListingDetails/ListingDetails.props';
import ListingDetailsView from '../../Selling/ListingDetails/ListingDetails.view';
import { editableListingToListingProps } from './Preview.transform';

const PreviewContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const editableListing = useSelector((state: Store) => state.editableListing);
  const creatingListingStatus = useSelector(
    (state: Store) => state.createListing
  );
  const isCreatListingSuccess =
    creatingListingStatus.data?.status === 200 ? true : false;

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
  const companyAddresses = GetCompanyAddresses(editableListing?.company || '');
  const productShippingAddress = companyAddresses.find(
    (addr) => addr.id === editableListing.addressId
  );
  const isCustomType = editableListing?.isCustomType || false;

  const currentUser = useSelector(
    (state: Store) => state.getUser.data?.data.user
  );

  const sellerImage = currentUser?.profileImage;

  const companyAddress = {
    suburb: productShippingAddress?.suburb,
    state: productShippingAddress?.state,
    postcode: productShippingAddress?.postcode,
    countryCode: productShippingAddress?.countryCode,
  };

  const listing = editableListingToListingProps(
    editableListing,
    listingFormData,
    categoryData,
    sellerImage,
    companyAddress
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
    // eslint-disable-next-line
  }, []);

  const generatedProps: ListingDetailsGeneratedProps = {
    // generated props here
    listing,
    onCreate,
    isExisting,
    isCreatListingSuccess,
  };
  return <ListingDetailsView {...generatedProps} />;
};

export default PreviewContainer;
