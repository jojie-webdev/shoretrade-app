import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import moment from 'moment';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import AddLicenseView from 'routes/Seller/Account/AddLicense/AddLicense.view';
import {
  addSellerLicenseActions,
  getSellerLicenseActions,
  getStatesActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

const AddLicense = (): JSX.Element => {
  const dispatch = useDispatch();
  const [companyId] = useCompany();

  const licenses = useSelector(
    (store: Store) => store.getSellerLicense.data?.data.licenses || []
  );
  const states = useSelector(
    (store: Store) => store.getStates.data?.data || []
  );
  const addLicense = useSelector((store: Store) => store.addSellerLicense);
  const [licenseName, setLicenseName] = useState('');
  const [licenseFile, setLicenseFile] = useState<File | null | string>(null);
  const [licenseFileBack, setLicenseFileBack] = useState<File | null | string>(
    null
  );
  const [hasLicenseBack, setHasLicenseBack] = useState(false);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [stateId, setStateId] = useState<string>('');

  useEffect(() => {
    dispatch(getStatesActions.request({}));
    // eslint-disable-next-line
  }, []);

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
    if (licenseFile && typeof licenseFile === 'object') {
      const { name } = licenseFile;
      setLicenseName(name.substring(0, name.lastIndexOf('.')));
    }
  }, [licenseFile]);

  const onSave = () => {
    dispatch(
      addSellerLicenseActions.request({
        companyId,
        sellerLicenseFile:
          typeof licenseFile === 'object' ? licenseFile : undefined,
        sellerLicenseFileBack:
          typeof licenseFileBack === 'object' ? licenseFileBack : undefined,
        fileName: licenseName,
        stateId,
        expiredAt: expirationDate?.toISOString(),
      })
    );

    setLicenseFile(null);
    setLicenseFileBack(null);
    setLicenseName('');
    setStateId('');
    setExpirationDate(null);
  };

  const onClickAddLicense = () => {
    const route = `${SELLER_ACCOUNT_ROUTES.ADD_LICENSE}${qs.stringify(
      { companyId },
      { addQueryPrefix: true }
    )}`;

    dispatch(push(route));
  };

  const filteredLicenses = licenses
    .filter((l) => l.approved !== 'DELETED')
    .sort(
      //@ts-ignore
      (a, b) => moment(b.created_at).toDate() - moment(a.created_at).toDate()
    );

  const generatedProps = {
    onSave,
    licenseName,
    setLicenseName,
    licenseFile,
    setLicenseFile,
    licenseFileBack,
    setLicenseFileBack,
    isUpdating: addLicense?.pending || false,
    licenses: filteredLicenses,
    hasLicenseBack,
    setHasLicenseBack,
    expirationDate,
    setExpirationDate,
    onClickAddLicense,
    states,
    stateId,
    setStateId,
    companyId,
  };
  return <AddLicenseView {...generatedProps} />;
};

export default AddLicense;
