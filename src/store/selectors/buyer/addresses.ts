import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

const getAddresses = (state: Store) =>
  state.getAddresses.data?.data.addresses || [];

export const GetAddressOptions = () => {
  return (useSelector(getAddresses) || [])
    .filter((a) => a.approved === 'APPROVED')
    .map((address) => {
      const streetNumber = address.unitNumber
        ? `${address.unitNumber}/${address.streetNumber}`
        : address.streetNumber;
      return {
        label: `${streetNumber} ${address.streetName}, ${address.suburb}, ${address.state} ${address.postcode}`,
        value: address.id,
      };
    });
};
