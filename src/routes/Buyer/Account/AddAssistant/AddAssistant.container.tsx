import React, { useState, useEffect } from 'react';

import BuyerAssistantFormView from 'components/module/BuyerAssistantForm';
import { AssistantForm } from 'components/module/BuyerAssistantForm/BuyerAssistantForm.props';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { PERMISSIONS } from 'consts/permissions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addLinkedAccountActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { isPermitted } from 'utils/isPermitted';

import { AddAssistantGeneratedProps } from './AddAssistant.props';
import { isValid } from './AddAssistant.validation';

const AddAssistant = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';
  const addLinkedAccount = useSelector(
    (store: Store) => store.addLinkedAccount
  );
  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const permission =
    !isPendingAccount &&
    isPermitted(user, PERMISSIONS.BUYER.VIEW_LINKED_ACCOUNTS);
  // MARK:- State
  const [callingCode, setCallingCode] = useState('61');
  const [submitted, setSubmitted] = useState(false);

  // MARK:- Methods
  const onClickCreate = (form: AssistantForm) => {
    dispatch(
      addLinkedAccountActions.request({
        companyId,
        ...form,
        mobile: `+${callingCode}${form.mobile}`,
        relationship: 'SECONDARY',
        userGroup: 'buyer',
      })
    );
    setSubmitted(true);
  };
  // MARK:- Variables
  useEffect(() => {
    if (submitted && addLinkedAccount.data) history.goBack();
    // eslint-disable-next-line
  }, [addLinkedAccount]);

  const formikInitial = {
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
    },
    validate: isValid,
    onSubmit: onClickCreate,
  };

  // MARK:- Effects
  useEffect(() => {
    if (!permission) {
      history.push(`${BUYER_ACCOUNT_ROUTES.LANDING}`);
    }
    // eslint-disable-next-line
  }, [permission]);

  const generatedProps: AddAssistantGeneratedProps = {
    type: 'CREATE',
    callingCode,
    setCallingCode,
    formikInitial,
    pending: addLinkedAccount.pending || false,
    success: addLinkedAccount.data?.status === 200 && submitted,
    error: submitted ? addLinkedAccount.error : undefined,
  };
  return <BuyerAssistantFormView {...generatedProps} />;
};

export default AddAssistant;
