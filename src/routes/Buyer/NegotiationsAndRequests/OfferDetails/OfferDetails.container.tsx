import React, { useEffect, useMemo, useState } from 'react';

import Loading from 'components/module/Loading';
import { BUYER_ROUTES } from 'consts';
import { BUYER_MARKET_REQUEST_ROUTES } from 'consts/routes';
import moment from 'moment';
import { sortBy } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getActivePlan } from 'routes/Buyer/Account/SubscriptionPlan/SubscriptionPlan.transform';
import { syncAASBalance } from 'services/aas';
import {
  deleteMarketRequestActions,
  getActiveOffersActions,
  getAllMarketRequestActions,
  marketOfferActions,
} from 'store/actions';
import marketRequestNegotiateOfferActions from 'store/actions/marketRequestNegotiation';
import marketRequestOfferConfirmActions from 'store/actions/marketRequestOfferConfirm';
import { GetDefaultCompany } from 'store/selectors/buyer';
import {
  Negotiations,
  Offer,
  OfferMarketRequest,
} from 'types/store/GetActiveOffersState';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { AcceptOfferItem, OfferConfirm } from 'types/store/MarketOfferState';
import { Store } from 'types/store/Store';

import PaymentMethod from '../Checkout/PaymentMethod/PaymentMethod.container';
import { OfferDetailsProps } from './OfferDetails.props';
import OfferDetailsView from './OfferDetails.view';

const OfferDetails = (): JSX.Element => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const history = useHistory();
  const dispatch = useDispatch();
  const [offerId, setOfferId] = useState<string>('');
  const [seller, setSeller] = useState<any>({});
  const [nego, setNego] = useState<Negotiations>();
  const [countAcceptedWeight, setCountAcceptedWeight] = useState(0);
  const activeOffers = useSelector((store: Store) => store.getActiveOffers);
  const [selectedOffer, setSelectedOffer] = useState<Offer>();
  const [offerMR, setOfferMR] = useState<OfferMarketRequest>();
  const [negotiating, setNegotiating] = useState(false);
  const [clickAccept, setClickAccept] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  // eslint-disable-next-line
  const [showNotEnoughCreditAlert, setShowNotEnoughCreditAlert] = useState(
    false
  );
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [closeOnAccept, setCloseOnAccept] = useState(false);
  const [showOfferSentModal, setShowOfferSentModal] = useState(false);
  const [clickDecline, setClickDecline] = useState(false);

  const defaultCompany = GetDefaultCompany();

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );
  const currentReverseMarketDetails = getActivePlan(
    companyPlan,
    CompanyPlanName.REVERSE_MARKET
  );
  const currentPlanDetails = getActivePlan(companyPlan);
  const subscriptionType = companyPlan?.activePlans
    ? companyPlan?.activePlans.find((ac) =>
        [CompanyPlanName.BASE, CompanyPlanName.PRO].includes(ac.plan.name)
      )?.plan.name || null
    : null;

  const isSubscribedToNegoRequest =
    currentReverseMarketDetails ||
    currentPlanDetails?.plan?.name === CompanyPlanName.PRO
      ? companyPlan && !companyPlan.flags?.hasCancelledReversedMarketplace
      : subscriptionType !== null && false;

  const canNegotiate = isSubscribedToNegoRequest || false;

  const pendingConfirmOffer = useSelector(
    (state: Store) => state.marketRequestOfferConfirm.pending
  );

  const activeOffersData = useMemo(() => {
    if (activeOffers.data?.data.marketOffers) {
      return activeOffers.data?.data.marketOffers.filter(
        (d) => moment().diff(moment(d.marketRequest.createdAt), 'days') < 7
      );
    }
    return [];
  }, [activeOffers]);

  const goTolist = () => {
    history.push(BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(id));
  };

  const acceptOffer = useSelector(
    (store: Store) => store.marketRequestAcceptOffer
  );

  const confirmOffer = useSelector(
    (store: Store) => store.marketRequestOfferConfirm
  );

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );

  const marketRequestNegotiateOfferPending = useSelector(
    (store: Store) => store.marketRequestNegotiation.pending
  );

  const offerSentStatus = useSelector(
    (state: Store) => state.marketRequestNegotiation.data?.status
  );

  const filteredBuyerRequests = buyerRequests.data?.data?.marketRequests.filter(
    (mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED'
  );

  const filteredBuyerRequest = filteredBuyerRequests?.find(
    (filteredBuyerRequest) => filteredBuyerRequest.id === id
  );

  const breadCrumb = [
    { label: 'My Requests', link: BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS },
    {
      label: 'Request Details',
      onClick: () => {
        goTolist();
      },
    },
    {
      label: 'Offer Details',
    },
  ];

  const handleDeclineClick = (show: boolean) => {
    setClickDecline(show);
  };

  const handlePayNow = () => {
    setShowPaymentMethod(true);
    const getMarketNegotiationId = () => {
      if (!selectedOffer?.negotiations) {
        return '';
      }

      return selectedOffer?.negotiations[0]?.id || '';
    };

    const payload: AcceptOfferItem = {
      marketOfferId: selectedOffer?.id || '',
      marketNegotiationId: getMarketNegotiationId(),
      marketRequestId: filteredBuyerRequest?.id || '',
    };

    dispatch(marketOfferActions.add(payload));
  };

  const handleAcceptClick = (show: boolean) => {
    setClickAccept(show);
  };

  const handleConfirmOffer = () => {
    const meta: OfferConfirm = {
      marketOfferId: selectedOffer?.id || '',
    };
    dispatch(marketRequestOfferConfirmActions.request(meta));
    setClickAccept(false);
  };

  const handleNegoBtnClick = (show: boolean) => {
    setNegotiating(show);
  };

  const handleStartNegotiate = () => {
    setNegotiating(true);
  };

  const onRefresh = async () => {
    try {
      await syncAASBalance(defaultCompany?.id || '');
    } catch (e) {
      console.log(e);
    }
  };

  //const handlePayNow = () => {
  // handleShowAcceptOffer();
  //};

  const onClickDelete = () => {
    if (id) {
      dispatch(
        deleteMarketRequestActions.request({
          id,
        })
      );
    }
  };

  const onConfirmSentOffer = () => {
    setShowOfferSentModal(false);
    dispatch(marketRequestNegotiateOfferActions.clear());
    history.push(BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(id));
  };

  const onPayNow = () => {
    dispatch(marketRequestOfferConfirmActions.clear());
    handlePayNow();
  };

  const onCloseAcceptSentModal = () => {
    dispatch(marketRequestOfferConfirmActions.clear());
  };

  const submitNegotiation = (counterOffer: number) => {
    if (selectedOffer) {
      dispatch(
        marketRequestNegotiateOfferActions.request({
          marketRequestId: id,
          marketOfferId: selectedOffer.id,
          price: counterOffer,
          // closeOnAccept: closeOnAccept,
        })
      );
    }
    setNegotiating(false);
  };

  useEffect(() => {
    if (defaultCompany) {
      onRefresh();
    }

    if (id && !activeOffers.data) {
      dispatch(
        getActiveOffersActions.request({
          queryParams: {
            marketRequestId: id,
          },
        })
      );
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (acceptOffer.error) {
      setShowNotEnoughCreditAlert(true);
    }
  }, [acceptOffer]);

  useEffect(() => {
    if (!filteredBuyerRequest) {
      dispatch(getAllMarketRequestActions.request({}));
    }
    // eslint-disable-next-line
  }, [filteredBuyerRequest]);

  useEffect(() => {
    if (location.pathname.includes('/offer')) {
      const splits = location.pathname.split('/');
      const offerId = splits[splits.length - 1];
      setOfferId(offerId);
    }
    setShowPaymentMethod(false);
  }, [location.pathname]);

  useEffect(() => {
    activeOffersData.forEach((marketOffer) =>
      marketOffer.offers.forEach((offer) => {
        if (offer?.id === offerId) {
          setSelectedOffer(offer);
          setSeller(marketOffer.company);
          setOfferMR(marketOffer.marketRequest);
          if (offer && offer.negotiations) {
            setNego(offer?.negotiations[0]);
          }
          return;
        }
      })
    );
  }, [offerId, activeOffersData, id, filteredBuyerRequest]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showPaymentMethod]);

  useEffect(() => {
    setShowPaymentMethod(false);
  }, []);

  useEffect(() => {
    if (activeOffersData.length > 0) {
      let acceptedWeights = 0;
      activeOffersData.forEach((marketOffer) => {
        marketOffer.offers.forEach((offer) => {
          if (offer.status === 'ACCEPTED') {
            acceptedWeights += offer.weight;
          }
        });
      });
      setCountAcceptedWeight(acceptedWeights);
    }
  }, [activeOffersData]);

  useEffect(() => {
    if (offerSentStatus === 200) {
      setShowOfferSentModal(true);
    } else {
      setShowOfferSentModal(false);
    }
  }, [offerSentStatus]);

  const sortByDate = sortBy((data: { created_at: string }) => data.created_at);

  let counterOffer = '';
  let newOffer = '';
  let counterOfferLatest;
  let newOfferLatest;
  let thereIsNewOffer = false;
  let isAccepted = false;

  let sortedNegotiations: Negotiations[] = [];
  let lastNegotiationsOffers: Negotiations[] = [];
  if (selectedOffer) {
    if (selectedOffer.negotiations !== null) {
      sortedNegotiations = sortByDate(selectedOffer.negotiations);
      const newOfferArr = sortedNegotiations.filter(
        (i: any) => i.type === 'NEW_OFFER'
      );
      const counterOfferArr = sortedNegotiations.filter(
        (i: any) => i.type === 'COUNTER_OFFER'
      );

      newOfferLatest = newOfferArr.slice(-1)[0];
      counterOfferLatest = counterOfferArr.slice(-1)[0];

      lastNegotiationsOffers = sortedNegotiations.slice(
        Math.max(
          sortedNegotiations.length - (sortedNegotiations.length >= 2 ? 2 : 1),
          0
        )
      );
    }

    newOffer = newOfferLatest ? newOfferLatest.price.toString() : '';
    counterOffer = counterOfferLatest
      ? counterOfferLatest.price.toString()
      : '';

    thereIsNewOffer =
      selectedOffer.negotiations &&
      //@ts-ignore
      newOfferLatest?.updated_at > counterOfferLatest?.updated_at;

    isAccepted = selectedOffer.status === 'ACCEPTED';
  }

  if (
    !selectedOffer ||
    !filteredBuyerRequest ||
    !offerMR ||
    pendingConfirmOffer
  ) {
    return <Loading />;
  }

  const generatedProps: OfferDetailsProps = {
    counterOffer,
    handleStartNegotiate,
    handleConfirmOffer,
    handleNegoBtnClick,
    isLoadingAcceptOffer: acceptOffer.pending || false,
    isLoadingOffer: activeOffers.pending || false,
    isAccepted,
    newOffer,
    selectedOffer,
    thereIsNewOffer,
    seller,
    nego,
    negotiating,
    setCloseOnAccept,
    closeOnAccept,
    setNegotiating,
    lastNegotiationsOffers,
    sortedNegotiations,
    submitNegotiation,
    breadCrumb,
    marketRequest: filteredBuyerRequest,
    offerMR,
    countAcceptedWeight,
    onClickDelete,
    showDelete,
    setShowDelete,
    handleAcceptClick,
    isLoadingConfirmOffer: confirmOffer.pending || false,
    isLoadingNegotiate: marketRequestNegotiateOfferPending || false,
    handlePayNow,
    onConfirmSentOffer,
    showOfferSentModal,
    showConfirmOfferSentModal: confirmOffer.data?.data?.status === 'PARTIAL',
    onCloseAcceptSentModal,
    onPayNow,
    canNegotiate,
    clickAccept,
    handleDeclineClick,
    clickDecline,
  };

  const getPrice = () => {
    if (
      !selectedOffer?.negotiations ||
      selectedOffer?.negotiations.length < 1
    ) {
      return selectedOffer?.price || 0;
    }

    return selectedOffer?.negotiations[0]?.price || 0;
  };

  if (showPaymentMethod) {
    return (
      <PaymentMethod
        totalValue={getPrice() * (selectedOffer?.weight || 0)}
        orderError={''}
        selectedShipping={{}}
        placeOrder={() => {}} // eslint-disable-line
        onBack={() => setShowPaymentMethod(false)}
      />
    );
  }
  return <OfferDetailsView {...generatedProps} />;
};

export default OfferDetails;
