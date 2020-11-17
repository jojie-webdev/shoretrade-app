import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

const getAllListings = (state: Store) =>
  state.getAllListings.data?.data?.orders || [];

export const GetAllListingsSelector = () => {
  return useSelector(getAllListings) || [];
};

export const GetListingSelector = (id: string) => {
  return GetAllListingsSelector().find((data) => data.id === id) || null;
};

const getListingFormData = (state: Store) =>
  state.getListingFormData.data?.data || null;

export const GetListingFormDataSelector = () => {
  return useSelector(getListingFormData) || null;
};
