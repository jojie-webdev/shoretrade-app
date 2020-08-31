import { Store } from 'types/store/Store';

import useSelectorSafe from '../useSelectorSafe';

const getCompanies = (state: Store) =>
  state.getUser.data?.data.user.companies || [];

export const GetDefaultCompany = () => {
  const companies = useSelectorSafe(getCompanies) || [];
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
