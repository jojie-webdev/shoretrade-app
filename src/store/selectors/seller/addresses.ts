import { useSelector } from 'react-redux';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';
import { Store } from 'types/store/Store';

const getCompanies = (state: Store) =>
  state.getUser.data?.data.user.companies || [];

export const GetCompanyAddresses = (companyName: string) => {
  return (
    (useSelector(getCompanies) || []).find((company) =>
      companyName.includes(company.name)
    )?.addresses || []
  ).filter((address) => address.approved === 'APPROVED');
};

export const GetAddressOptions = (
  sellerAddresses: GetAddressesResponseItem[]
) => {
  return sellerAddresses.map((address: GetAddressesResponseItem) => {
    const streetNumber = address.unitNumber
      ? `${address.unitNumber}/${address.streetNumber}`
      : address.streetNumber;
    return {
      label: `${streetNumber} ${address.streetName}, ${address.suburb}, ${address.state} ${address.postcode}`,
      value: address.id,
    };
  });
};
