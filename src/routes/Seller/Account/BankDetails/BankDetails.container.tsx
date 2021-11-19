import React, { useState, useEffect } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getBankDetailsActions, updateBankDetailsActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { QueryParams } from '../EditAddress/EditAddress.props';
import {
  BankDetailsGeneratedProps,
  BankDetails as TBankDetails,
} from './BankDetails.props';
import BankDetailsView from './BankDetails.view';

const BankDetails = (): JSX.Element => {
  // MARK:- Store
  const dispatch = useDispatch();
  const location = useLocation();
  const getBankDetails = useSelector((state: Store) => state.getBankDetails);
  const updateBankDetails = useSelector(
    (state: Store) => state.updateBankDetails
  );
  const user = useSelector((state: Store) => state.getUser.data?.data.user)

  // MARK:- State
  const [submitted, setSubmitted] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [bankDetails, setBankDetails] = useState<TBankDetails>({
    accountName: '',
    bsb: '',
    accountNumber: '',
  });

  // MARK:- Methods
  const onClickSave = (details: TBankDetails) => {
    dispatch(
      updateBankDetailsActions.request({
        bsb: details.bsb,
        accountName: details.accountName,
        accountNumber: details.accountNumber,
        companyId,
      })
    );

    setSubmitted(true);
  };

  // MARK:- Effects
  useEffect(() => {
    const { companyId } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as QueryParams;

    if (!companyId) {
      dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
    }

    setCompanyId(companyId);
  }, []);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getBankDetailsActions.request({
          companyId,
        })
      );
    }
  }, [companyId]);

  useEffect(() => {
    if (
      !getBankDetails.pending &&
      !getBankDetails.error &&
      getBankDetails.data
    ) {
      const {
        accountName,
        bsb,
        accountNumber,
      } = getBankDetails.data.data.bankDetails;

      setBankDetails({
        accountName,
        bsb,
        accountNumber,
      });
    }
  }, [getBankDetails]);

  // MARK:- Render
  const generatedProps: BankDetailsGeneratedProps = {
    bankDetails,
    loading: getBankDetails.pending || false,
    submitting: updateBankDetails.pending || false,
    isSuccess: updateBankDetails.data?.status === 200 && submitted,
    isError: updateBankDetails.error.length > 0,
    onClickSave,
    companyRelationship: user?.companies.find(company => company.id == companyId)?.relationship || ''
  };

  return <BankDetailsView {...generatedProps} />;
};

export default BankDetails;
