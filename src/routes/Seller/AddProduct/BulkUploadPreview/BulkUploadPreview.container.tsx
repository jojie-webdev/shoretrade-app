import React from 'react';

import { SELLER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBulkListingActions, uploadBulkActions } from 'store/actions';
import { GetCompanyAddresses } from 'store/selectors/seller/addresses';
import { Store } from 'types/store/Store';

import BulkUploadPreviewView from './BulkUploadPreview.view';

const BulkUploadPreview = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getUser = useSelector((state: Store) => state.getUser);
  const uploadBulk = useSelector((store: Store) => store.uploadBulk);
  const createBulkListing = useSelector(
    (store: Store) => store.createBulkListing
  );

  const companies = getUser.data?.data.user.companies || [];
  const companyId = uploadBulk.data?.data.companyId || '';
  const companyName = companies.find((c) => c.id === companyId)?.name || '';

  const shippingAddressOptions = GetCompanyAddresses(companyName).map(
    (address) => ({
      label: `${address.streetNumber || ''} ${address.streetName}, ${
        address.suburb
      }, ${address.state}, ${address.countryCode}, ${address.postcode}`,
      value: address.id,
    })
  );

  const onUploadCSV = (csv: File) => {
    const reader = new FileReader();
    reader.readAsText(csv);

    reader.onload = () => {
      dispatch(
        uploadBulkActions.request({
          companyId,
          csv: reader.result as string,
        })
      );
    };
  };

  const onSubmit = (shippingAddress: string) => {
    dispatch(
      createBulkListingActions.request({
        data: uploadBulk.data?.data.editableListings || [],
        shippingAddress,
      })
    );
  };

  if (!uploadBulk.data?.data) {
    history.replace(SELLER_ROUTES.ADD_PRODUCT);
  }

  const generatedProps = {
    data: uploadBulk.data?.data.editableListings || [],
    onUploadCSV,
    onSubmit,
    isUploadingCSV: uploadBulk?.pending || false,
    isSubmitting: createBulkListing?.pending || false,
    shippingAddressOptions,
    errorMessage: createBulkListing.error || '',
  };
  return <BulkUploadPreviewView {...generatedProps} />;
};

export default BulkUploadPreview;
