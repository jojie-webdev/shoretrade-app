import { Store } from 'types/store/Store';

import useSelectorSafe from '../useSelectorSafe';

const getAddresses = (state: Store) =>
  state.getAddresses.data?.data.addresses || [];

export const GetAddressOptions = () => {
  return (useSelectorSafe(getAddresses) || []).map((address) => {
    const streetNumber = address.unitNumber
      ? `${address.unitNumber}/${address.streetNumber}`
      : address.streetNumber;
    return {
      label: `${streetNumber} ${address.streetName}, ${address.suburb}, ${address.state} ${address.postcode}`,
      value: address.id,
    };
  });
};
