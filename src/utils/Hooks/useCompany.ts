import { useState, useEffect } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const useCompany = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    const { companyId } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as { companyId: string };

    if (!companyId) {
      dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
    }

    setCompanyId(companyId);
    // eslint-disable-next-line
  }, []);

  return [companyId];
};

export default useCompany;
