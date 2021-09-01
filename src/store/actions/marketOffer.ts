import { AcceptOfferItem } from 'types/store/MarketOfferState';
import { createClearAction } from 'utils/Redux';

const ns = 'MARKET_OFFER';
const clearAction = createClearAction(ns);

const createAddAction = () => {
  const localNS = 'ADD';
  const localType = `${ns}/${localNS}`;
  return {
    add: (payload: AcceptOfferItem) => ({
      type: localType,
      payload,
    }),
    [localNS]: localType,
  };
};

const createRemoveAction = () => {
  const localNS = 'REMOVE';
  const localType = `${ns}/${localNS}`;
  return {
    remove: (id: string) => ({
      type: localType,
      payload: { id },
    }),
    [localNS]: localType,
  };
};

const addAction = createAddAction();
const removeAction = createRemoveAction();

const navigationActions = {
  ...addAction,
  ...removeAction,
  ...clearAction,
};

export default navigationActions;
