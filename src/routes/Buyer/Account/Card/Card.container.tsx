import React, { useState, useReducer, useEffect } from 'react';

import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  addCardTokenActions,
  updateDefaultCardActions,
  deleteCardActions,
} from 'store/actions';
import addCardToken from 'store/reducers/addCardToken';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks/createUpdateReducer';

import { CardItem } from '../Balance/Balance.props';
import { CardGeneratedProps, CardDetails } from './Card.props';
import CardView from './Card.view';

const Card = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();

  const location = useLocation();

  const card: Partial<CardItem> = pathOr({}, ['card'], location.state);
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
  }, [card]);

  const pendingAddCard =
    useSelector((state: Store) => state.addCardToken.pending) || false;
  const pendingUpdateDefaultCard =
    useSelector((state: Store) => state.updateDefaultCard.pending) || false;
  const isLoading = pendingAddCard || pendingUpdateDefaultCard;
  const isRemoving =
    useSelector((state: Store) => state.deleteCard.pending) || false;
  const addCardResult = useSelector((state: Store) => state.addCardToken);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (addCardResult.data && submitted) history.goBack();
  }, [addCardResult]);

  const onAddCard = (formCardDetails: CardDetails) => {
    if (!isLoading) {
      dispatch(
        addCardTokenActions.request({
          card: {
            number: Number(formCardDetails.number.replace(/\D/g, '')),
            exp_month: formCardDetails.exp.split('/')[0].trim(),
            exp_year: moment(formCardDetails.exp.split('/')[1], 'YY').format(
              'YYYY'
            ),
            cvc: Number(formCardDetails.cvc),
            name: formCardDetails.name,
          },
          companyId: currentCompany?.id || '',
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
            companyId: currentCompany?.id || '',
            card: card?.id || '',
          })
        );
      } else {
        history.goBack();
      }
    }
  };

  const onRemoveCard = () => {
    if (isExisting && !isRemoving) {
      dispatch(
        deleteCardActions.request({
          companyId: currentCompany?.id || '',
          card: card?.id || '',
        })
      );
    }
  };

  const generatedProps: CardGeneratedProps = {
    cardDetails,
    setCardDetails,
    onAddCard,
    isLoading,
    isExisting,
    onUpdateCard,
    onRemoveCard,
    isRemoving,
    addCardResult,
  };

  return <CardView {...generatedProps} />;
};

export default Card;
