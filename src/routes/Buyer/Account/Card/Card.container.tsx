import React, { useState, useReducer, useEffect } from 'react';

import { BUYER_ACCOUNT_ROUTES } from 'consts';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  addCardTokenActions,
  updateDefaultCardActions,
  deleteCardActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks/createUpdateReducer';

import { CardItem } from '../Balance/Balance.props';
import { CardGeneratedProps, CardDetails } from './Card.props';
import CardView from './Card.view';

const Card = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((store: Store) => store.getUser.data?.data.user);
  const [deleteStatusSuccess, setDeleteStatusSuccess] = useState(false);

  const company = user?.companies[0];

  const companyFromDeletion = useSelector(
    (store: Store) => store.deleteCard.data?.data
  );

  const companyId = company?.id || companyFromDeletion?.companyId || '';

  const card: Partial<CardItem> = pathOr({}, ['card'], location.state);
  const from: Partial<string> = pathOr('', ['from'], location.state);
  const preventGoingBack: Partial<boolean> = pathOr(
    false,
    ['preventGoingBack'],
    location.state
  );
  const isExisting = Boolean(card?.id || false);

  const [cardDetails, setCardDetails] = useReducer(
    createUpdateReducer<CardDetails>(),
    {
      number: '',
      exp: '',
      cvc: '',
      name: '',
      isDefault: false,
    }
  );

  const cards =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.cards
    ) || [];

  useEffect(() => {
    if (isExisting) {
      setCardDetails({
        number: `••••••••••••${card?.lastFour || ''}`,
        exp: `${
          (card?.expMonth || 0) < 10 ? `0${card.expMonth}` : card.expMonth
        }/${(card?.expYear || 0).toString().substring(2, 4)}`,
        cvc: '•••',
        name: card.name,
        isDefault: card.isDefault,
      });
    }
    // eslint-disable-next-line
  }, [card]);

  const pendingAddCard =
    useSelector((state: Store) => state.addCardToken.pending) || false;
  const pendingUpdateDefaultCard =
    useSelector((state: Store) => state.updateDefaultCard.pending) || false;
  const isLoading = pendingAddCard || pendingUpdateDefaultCard;
  const isRemoving =
    useSelector((state: Store) => state.deleteCard.pending) || false;

  const deleteStatus =
    useSelector((state: Store) => state.deleteCard.data?.status) || false;

  const addCardResult = useSelector((state: Store) => state.addCardToken);

  const updateDefaultCardResult = useSelector(
    (state: Store) => state.updateDefaultCard
  );

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (addCardResult.error && !submitted)
      dispatch(addCardTokenActions.clear()); // clear related actions on render

    if (addCardResult.data && submitted) history.goBack();
    // eslint-disable-next-line
  }, [addCardResult]);

  useEffect(() => {
    if (updateDefaultCardResult.data && submitted) {
      history.goBack();
    }
    // eslint-disable-next-line
  }, [updateDefaultCardResult]);

  useEffect(() => {
    if (deleteStatusSuccess && isExisting) {
      history.push(BUYER_ACCOUNT_ROUTES.BANK_DETAILS);
    }
    // eslint-disable-next-line
  }, [deleteStatusSuccess]);

  useEffect(() => {
    if (deleteStatus === 200) {
      setDeleteStatusSuccess(true);
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (preventGoingBack) {
      setDeleteStatusSuccess(false);
    }
  }, [preventGoingBack]);

  const onAddCard = (formCardDetails: CardDetails) => {
    if (!isLoading) {
      dispatch(
        addCardTokenActions.request({
          card: {
            number: Number(formCardDetails.number.replace(/\D/g, '')),
            exp_month: parseInt(formCardDetails.exp.split('/')[0].trim()),
            exp_year: parseInt(
              moment(formCardDetails.exp.split('/')[1], 'YY').format('YYYY')
            ),
            cvc: formCardDetails.cvc,
            name: formCardDetails.name,
          },
          companyId: companyId || '',
          default: formCardDetails.isDefault,
        })
      );
      setSubmitted(true);
    }
  };

  const onUpdateCard = (formCardDetails: CardDetails) => {
    if (isExisting && !isLoading) {
      // Only allow update if selected card is not previously default
      // otherwise just go back
      if (!card?.isDefault && formCardDetails.isDefault) {
        dispatch(
          updateDefaultCardActions.request({
            companyId: companyId || '',
            card: card?.id || '',
          })
        );
        setSubmitted(true);
      } else {
        history.goBack();
      }
    }
  };

  const onRemoveCard = () => {
    if (isExisting && !isRemoving) {
      dispatch(
        deleteCardActions.request({
          companyId: companyId || '',
          card: card?.id || '',
        })
      );
    }
  };

  const generatedProps: CardGeneratedProps = {
    cards,
    cardDetails,
    setCardDetails,
    onAddCard,
    isLoading,
    isExisting,
    onUpdateCard,
    onRemoveCard,
    isRemoving,
    addCardResult,
    from,
  };

  return <CardView {...generatedProps} />;
};

export default Card;
