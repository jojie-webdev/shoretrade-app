import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import moment from 'moment';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import LicensesView from 'routes/Seller/Account/Licenses/Licenses.view';
import {
  getSellerLicenseActions,
  updateSellerLicenseActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

const Licenses = (): JSX.Element => {
  const dispatch = useDispatch();
  const [companyId] = useCompany();
  const [showSuccess, setShowSuccess] = useState(false);

  const licenses = useSelector(
    (store: Store) => store.getSellerLicense.data?.data.licenses || []
  );
  const loading = useSelector(
    (store: Store) => store.getSellerLicense.pending || false
  );
  const addLicense = useSelector((store: Store) => store.addSellerLicense);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getSellerLicenseActions.request({
          companyId,
        })
      );
    }
    // eslint-disable-next-line
  }, [companyId]);

  useEffect(() => {
    if (addLicense.data?.status === 200) {
      setShowSuccess(true);
    }
    // eslint-disable-next-line
  }, [addLicense.data?.status]);

  const onClickAddLicense = () => {
    const route = `${SELLER_ACCOUNT_ROUTES.ADD_LICENSE}${qs.stringify(
      { companyId },
      { addQueryPrefix: true }
    )}`;

    dispatch(push(route));
  };

  const onClickEditLicense = (licenseId: string) => {
    const route = `${SELLER_ACCOUNT_ROUTES.EDIT_LICENSE}${qs.stringify(
      { companyId, licenseId },
      { addQueryPrefix: true }
    )}`;

    dispatch(push(route));
  };

  const onDeleteLicense = (licenseId: string) => {
    dispatch(
      updateSellerLicenseActions.request({
        companyId,
        id: licenseId,
        status: 'DELETED',
      })
    );
  };

  const filteredLicenses = licenses
    .filter((l) => l.approved !== 'DELETED')
    .sort(
      //@ts-ignore
      (a, b) => moment(b.created_at).toDate() - moment(a.created_at).toDate()
    );

  const generatedProps = {
    licenses: filteredLicenses,
    onClickAddLicense,
    loading,
    onClickEditLicense,
    showSuccess,
    setShowSuccess,
    onDeleteLicense,
  };
  return <LicensesView {...generatedProps} />;
};

export default Licenses;
