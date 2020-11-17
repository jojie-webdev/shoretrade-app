import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

const getCompanies = (state: Store) =>
  state.getUser.data?.data.user.companies || [];

export const GetCompanyAddresses = (companyName: string) => {
  return (
    (useSelector(getCompanies) || []).find(
      (company) => company.name === companyName
    )?.addresses || []
  ).filter((address) => address.approved === 'APPROVED');
};
