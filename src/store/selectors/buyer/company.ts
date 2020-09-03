import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

const getCompanies = (state: Store) =>
  state.getUser.data?.data.user.companies || [];

export const GetDefaultCompany = () => {
  const companies = useSelector(getCompanies) || [];
  return (
    companies.find((company) => company.relationship === 'ADMIN') ||
    // Fallback if company have no admin relationship
    companies.find(
      (company) =>
        company.relationship === 'ASSISTANT' ||
        company.relationship === 'SECONDARY'
    )
  );
};
