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
import { useTheme } from 'utils/Theme';

import { AddAssistantGeneratedProps } from './AddAssistant.props';
import { isValid } from './AddAssistant.validation';

const AddAssistant = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();

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

  const loadingUser = useSelector(
    (state: Store) => state.getUser.pending || false
  );
  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const permission =
    !isPendingAccount &&
    isPermitted(user, PERMISSIONS.BUYER.VIEW_LINKED_ACCOUNTS);
  // MARK:- State
  const [callingCode, setCallingCode] = useState(theme.isSFM ? '61' : '');
  const [submitted, setSubmitted] = useState(false);

  // MARK:- Methods
  const onClickCreate = (form: AssistantForm) => {
    dispatch(
      addLinkedAccountActions.request({
        companyId,
        ...form,
        mobile_cc: `+${callingCode}`,
        mobile_no: form.mobile_no,
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
      mobile_cc: '',
      mobile_no: '',
    },
    validate: isValid,
    onSubmit: onClickCreate,
  };

  // MARK:- Effects
  useEffect(() => {
    if (!loadingUser && !permission) {
      history.push(`${BUYER_ACCOUNT_ROUTES.LANDING}`);
    }
    // eslint-disable-next-line
  }, [loadingUser]);

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
