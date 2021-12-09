import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  createBulkListingActions,
  modifyBulkUploadActions,
  uploadBulkActions,
} from 'store/actions';
import { GetCompanyAddresses } from 'store/selectors/seller/addresses';
import { Store } from 'types/store/Store';
import { UploadBulkState } from 'types/store/UploadBulkState';

import BulkUploadPreviewView from './BulkUploadPreview.view';

const BulkUploadPreview = (): JSX.Element => {
  const dispatch = useDispatch();

  const getUser = useSelector((state: Store) => state.getUser);
  const uploadBulk = useSelector((store: Store) => store.uploadBulk);

  const modifiedData = useSelector(
    (store: Store) => store.modifyBulkUpload.modifiedData
  );
  const uploadBulkData: UploadBulkState[] =
    uploadBulk.data?.data.editableListings || [];
  const actualData = uploadBulkData.map((a, i) => ({
    ...a,
    ...modifiedData[i],
  }));
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
        data: actualData,
        shippingAddress,
      })
    );
  };

  const onEdit = (
    index: number,
    step: number,
    data: Partial<UploadBulkState>
  ) => {
    dispatch(
      modifyBulkUploadActions.edit({
        index,
        currentStep: step,
        ...data,
      })
    );
  };

  const generatedProps = {
    data: actualData,
    onUploadCSV,
    onSubmit,
    isUploadingCSV: uploadBulk?.pending || false,
    isSubmitting: createBulkListing?.pending || false,
    shippingAddressOptions,
    errorMessage: createBulkListing.error || '',
    onEdit,
  };
  return <BulkUploadPreviewView {...generatedProps} />;
};

export default BulkUploadPreview;
