import React, { useEffect } from 'react';

import { API, BUYER_ACCOUNT_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getTransactionHistoryActions } from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';
import { toTemporaryTokenV2 } from 'utils/toTemporaryTokenV2';

import { BalanceHistoryGeneratedProps } from './BalanceHistory.props';
import BalanceHistoryView from './BalanceHistory.view';

const BalanceHistory = (props: { isPlanView?: boolean }): JSX.Element => {
  const location = useLocation<{
    from: {
      label: string;
      link: string;
    };
  }>();

  const theme = useTheme();

  const { isPlanView } = props;

  const dispatch = useDispatch();
  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const token = useSelector((state: Store) => state.auth.token) || '';
  const transactions = useSelector(
    (state: Store) => state.getTransactionHistory.data?.data.transactions
  );

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const getTransactionHistory = () => {
    if (companyId) {
      dispatch(getTransactionHistoryActions.request({ companyId }));
    }
  };

  const onFileIconClick = (
    isCreditCardTopUp: boolean,
    refNumber: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    {
      if (isCreditCardTopUp) {
        window.open(
          `${API.PDF_URL || API.URL}/v2/${
            theme.isSFM ? 'sfm-blue/' : ''
          }company/cc-invoice/${refNumber}?token=${toTemporaryTokenV2(token)}`,
          '_blank'
        );
        e.stopPropagation();
      } else {
        //TODO: this is ST pdf url but the content is for SFM pdf
        const urlRed = `${
          API.PDF_URL || API.URL
        }/v2/subscription/company/invoice/${refNumber}?token=${token}&invoice=true`;
        window.open(urlRed);
        e.stopPropagation();
      }
    }
  };

  useEffect(() => {
    getTransactionHistory();
    // eslint-disable-next-line
  }, [companyId]);

  const isLoading =
    useSelector((state: Store) => state.getTransactionHistory.pending) || false;

  const subscriptionPlan = companyPlan?.activePlans
    ? companyPlan.activePlans[0].plan.alias
    : 'Unsubscribed';

  const generatedProps: BalanceHistoryGeneratedProps = {
    // generated props here
    subscriptionPlan: subscriptionPlan,
    transactions:
      (isPlanView
        ? transactions?.filter((t) => t.description === 'ShoreTrade Plan')
        : transactions?.filter((t) => t.description !== 'ShoreTrade Plan')) ||
      [],
    isLoading,
    redirectFrom: location.state?.from || {
      label: 'Balance & Payments',
      link: BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
    },
    isPlanView,
    token,
    onFileIconClick,
  };
  return <BalanceHistoryView {...generatedProps} />;
};

export default BalanceHistory;
