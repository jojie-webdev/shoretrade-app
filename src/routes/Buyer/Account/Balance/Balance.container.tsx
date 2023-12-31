import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  getPaymentMethodsActions,
  chargeCardActions,
  addCardTokenActions,
  updateDefaultCardActions,
  deleteCardActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { Card } from '../PlanPaymentMethod/PlanPaymentMethod.props';
import BalanceView from './Balance.view';

const Balance = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const [notifMessage, setNotifMessage] = useState('');

  const getPaymentMethods = () => {
    if (companyId) {
      dispatch(getPaymentMethodsActions.request({ companyId }));
    }
  };

  const defaultCardId =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.defaultCard
    ) || '';

  const cards = (
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.cards
    ) || []
  ).map((card) => ({
    ...card,
    isDefault: card.id === defaultCardId,
  }));

  const isRemoving =
    useSelector((state: Store) => state.deleteCard.pending) || false;

  const onRemoveCard = (card: Card) => {
    if (!isRemoving) {
      dispatch(
        deleteCardActions.request({
          companyId: currentCompany?.id || '',
          card: card?.id || '',
        })
      );
    }
  };

  const addCreditResult = useSelector((state: Store) => state.chargeCard);
  const addCardResult = useSelector((state: Store) => state.addCardToken);
  const updateDefaultCardResult = useSelector(
    (state: Store) => state.updateDefaultCard
  );

  useEffect(() => {
    getPaymentMethods();
    // eslint-disable-next-line
  }, [companyId]);

  useEffect(() => {
    const isCardLoading = addCardResult.pending;
    const isCreditLoading = addCreditResult.pending;
    const isUpdatingDefaultCard = updateDefaultCardResult.pending;

    const hasCardResult = addCardResult.data;
    const hasCreditResult = addCreditResult.data;
    const hasUpdatedDefaultCardResult = updateDefaultCardResult.data;

    if (!isCardLoading && hasCardResult) {
      setNotifMessage('Credit Card successfully added.');
      dispatch(addCardTokenActions.clear());
    } else if (!isCreditLoading && hasCreditResult) {
      setNotifMessage('Credits successfully added.');
      dispatch(chargeCardActions.clear());
    } else if (!isUpdatingDefaultCard && hasUpdatedDefaultCardResult) {
      setNotifMessage('Credit Card successfully updated.');
      dispatch(updateDefaultCardActions.clear());
    }
    // eslint-disable-next-line
  }, [addCreditResult, addCardResult, updateDefaultCardResult]);

  const generatedProps = {
    // generated props here
    credit: currentCompany?.credit || '',
    cards,
    notifMessage,
    onRemoveCard,
    defaultCardId,
  };
  return <BalanceView {...generatedProps} />;
};

export default Balance;
