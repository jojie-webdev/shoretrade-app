import React, { useReducer } from 'react';

import moment from 'moment';
import { groupBy } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardDetails,
  PaymentMethodPublicProps,
} from 'routes/Buyer/Checkout/PaymentMethod/PaymentMethod.props';
import { addCardAndPayActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { OrderCartItem } from 'types/store/AddCardAndPayState';
import { CartItem } from 'types/store/CartState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import PaymentMethodView from './PaymentMethod.view';

const PaymentMethod = (props: PaymentMethodPublicProps): JSX.Element => {
  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();

  const user =
    useSelector((state: Store) => state.getUser.data?.data.user.email) || '';
  const addresses =
    useSelector((store: Store) => store.getAddresses.data?.data.addresses) ||
    [];

  const pendingAddCard =
    useSelector((state: Store) => state.addCardAndPay.pending) || false;
  const isLoadingAccountCredit =
    useSelector((state: Store) => state.order.pending) || false;

  const currentAddress = addresses.find((a) => a.default);

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

  const cart = useSelector((store: Store) => store.cart) || {};

  const cartItems = Object.keys(cart).map((key) => ({
    ...cart[key],
    cartId: key,
  }));

  const onAddCard = (values: CardDetails) => {
    if (!pendingAddCard && currentAddress) {
      const groupCartItemByCompany = groupBy(
        (item: CartItem) => item.companyId
      );
      const groupedCartItems = groupCartItemByCompany(cartItems);
      const payload = Object.keys(groupedCartItems).reduce(
        (orderData: OrderCartItem[][], companyId) => {
          const companySpecificOrder = groupedCartItems[companyId].map(
            (item) => ({
              ...item,
              shipping: props.selectedShipping[item.companyId],
            })
          );
          return [...orderData, companySpecificOrder];
        },
        []
      );

      dispatch(
        addCardAndPayActions.request({
          cart: payload,
          currentAddress,
          totalPrice: props.totalValue,
          email: user,
          card: {
            number: Number(values.number.replace(/\D/g, '')),
            exp_month: values.exp.split('/')[0].trim(),
            exp_year: moment(values.exp.split('/')[1], 'YY').format('YYYY'),
            cvc: Number(values.cvc),
            name: values.name,
          },
          companyId: currentCompany?.id || '',
          default: values.isDefault,
        })
      );
    }
  };

  const generatedProps = {
    balance: currentCompany?.credit || '',
    cardDetails,
    setCardDetails,
    isLoading: pendingAddCard || isLoadingAccountCredit,
    onAddCard,
    ...props,
  };
  return <PaymentMethodView {...generatedProps} />;
};

export default PaymentMethod;
