import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import LicensesView from 'routes/Seller/Account/Licenses/Licenses.view';
import {
  addSellerLicenseActions,
  getSellerLicenseActions,
  updateSellerLicenseActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';

const Licenses = (): JSX.Element => {
  const dispatch = useDispatch();
  const [companyId] = useCompany();

  const licenses = useSelector(
    (store: Store) => store.getSellerLicense.data?.data.licenses || []
  );
  const addLicense = useSelector((store: Store) => store.addSellerLicense);

  const [licenseName, setLicenseName] = useState('');
  const [licenseFile, setLicenseFile] = useState<File | null>(null);

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
    if (licenseFile) {
      const { name } = licenseFile;
      setLicenseName(name.substring(0, name.lastIndexOf('.')));
    }
  }, [licenseFile]);

  const onSave = () => {
    dispatch(
      addSellerLicenseActions.request({
        companyId,
        sellerLicenseFile: licenseFile,
        fileName: licenseName,
      })
    );
  };

  const onPressDelete = (id: string) => {
    dispatch(
      updateSellerLicenseActions.request({
        companyId,
        id,
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
    isUpdating: addLicense?.pending || false,
    licenses: filteredLicenses,
    onPressDelete,
  };
  return <LicensesView {...generatedProps} />;
};

export default Licenses;
