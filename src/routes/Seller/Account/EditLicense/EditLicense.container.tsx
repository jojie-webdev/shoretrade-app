import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import moment from 'moment';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import AddLicenseView from 'routes/Seller/Account/AddLicense/AddLicense.view';
import {
  getSellerLicenseActions,
  updateSellerLicenseActions,
  getStatesActions,
} from 'store/actions';
import { SellerLicenseStatus } from 'types/store/GetSellerLicenseState';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

const EditLicense = (): JSX.Element => {
  const dispatch = useDispatch();
  const [companyId] = useCompany();
  const location = useLocation();
  const { licenseId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as {
    licenseId: string;
  };

  const licenses = useSelector(
    (store: Store) => store.getSellerLicense.data?.data.licenses || []
  );
  const updateLicense = useSelector(
    (store: Store) => store.updateSellerLicense
  );
  const states = useSelector(
    (store: Store) => store.getStates.data?.data || []
  );

  const [licenseName, setLicenseName] = useState('');
  const [licenseFileName, setLicenseFileName] = useState('');
  const [licenseFile, setLicenseFile] = useState<File | null | string>(null);
  const [licenseFileBack, setLicenseFileBack] = useState<File | null | string>(
    null
  );
  const [hasLicenseBack, setHasLicenseBack] = useState(false);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [stateId, setStateId] = useState<string>('');
  const [status, setStatus] = useState<SellerLicenseStatus>();

  useEffect(() => {
    dispatch(getStatesActions.request({}));
  }, []);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getSellerLicenseActions.request({
          companyId,
        })
      );
    }
  }, [companyId]);

  useEffect(() => {
    if (licenses.length > 0 && licenseId) {
      const license = licenses.find((l) => l.id === licenseId);
      if (license) {
        const fileExt = license.url.split('.').pop();
        setLicenseName(license.name);
        setLicenseFileName(`${license.name}.${fileExt}`);
        setLicenseFile(license.url);
        setStateId(license.state_id);
        setStatus(license.approved);
        if (license.expired_at)
          setExpirationDate(new Date(license.expired_at || ''));
        if (license.url_back) {
          setHasLicenseBack(true);
          setLicenseFileBack(license.url_back);
        }
      }
    }
  }, [licenses, licenseId]);

  useEffect(() => {
    if (licenseFile && typeof licenseFile === 'object') {
      const { name } = licenseFile;
      setLicenseName(name.substring(0, name.lastIndexOf('.')));
    }
  }, [licenseFile]);

  const onSave = () => {
    dispatch(
      updateSellerLicenseActions.request({
        companyId,
        sellerLicenseFile:
          typeof licenseFile === 'object' ? licenseFile : undefined,
        sellerLicenseFileBack:
          typeof licenseFileBack === 'object' ? licenseFileBack : undefined,
        name: licenseName,
        id: licenseId,
        expiredAt: expirationDate?.toISOString(),
        stateId,
        status,
      })
    );

    setLicenseFile(null);
    setLicenseFileBack(null);
    setLicenseName('');
    setExpirationDate(null);
    setStateId('');
  };

  const onClickAddLicense = () => {
    const route = `${SELLER_ACCOUNT_ROUTES.ADD_LICENSE}${qs.stringify(
      { companyId },
      { addQueryPrefix: true }
    )}`;

    dispatch(push(route));
  };

  const onPressDelete = () => {
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
    onSave,
    licenseName,
    setLicenseName,
    licenseFile,
    setLicenseFile,
    licenseFileBack,
    setLicenseFileBack,
    isUpdating: updateLicense?.pending || false,
    licenses: filteredLicenses,
    onPressDelete,
    hasLicenseBack,
    setHasLicenseBack,
    expirationDate,
    setExpirationDate,
    onClickAddLicense,
    isEdit: true,
    licenseFileName,
    states,
    stateId,
    setStateId,
    companyId,
  };
  return <AddLicenseView {...generatedProps} />;
};

export default EditLicense;
