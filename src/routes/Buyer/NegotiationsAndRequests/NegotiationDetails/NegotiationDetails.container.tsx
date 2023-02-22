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
  acceptNegotiationActions,
  createBuyerCounterNegotiationActions,
  declineNegotiationActions,
  deleteMarketRequestActions,
  getActiveOffersActions,
  getAllMarketRequestActions,
  getAllNegotiationsActions,
  getNegotiationByIdActions,
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
import { NegotiationDetailsProps } from './NegotiationDetails.props';
import NegotiationDetailsView from './NegotiationDetails.view';

const NegotiationDetails = (): JSX.Element => {
  const location = useLocation();
  const params = useParams<{ id: string; negoRequestId: string }>();
  const { id, negoRequestId } = params;
  const history = useHistory();
  const dispatch = useDispatch();
  const [offerId, setOfferId] = useState<string>('');
  const [seller, setSeller] = useState<any>({});
  const [nego, setNego] = useState<Negotiations>();
  const [countAcceptedWeight, setCountAcceptedWeight] = useState(0);
  const activeOffers = useSelector((store: Store) => store.getActiveOffers);
  const [selectedOffer, setSelectedOffer] = useState<Offer>();
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
  const [showBuyerCounterNegoModal, setShowBuyerCounterNegoModal] =
    useState(false);

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

  const canNegotiate =
    defaultCompany?.credit !== '0.00' && (isSubscribedToNegoRequest || false);

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

  const negotiation = useSelector(
    (store: Store) => store.getNegotiationById.data?.data
  );

  const isCreateBuyerCounterNegotiationPending =
    useSelector(
      (store: Store) => store.createBuyerCounterNegotiation.pending
    ) === true;

  const isAcceptNegotiationPending =
    useSelector((store: Store) => store.acceptNegotiation.pending) === true;

  const isDeclineNegotiationPending =
    useSelector((store: Store) => store.declineNegotiation.pending) === true;

  const filteredBuyerRequests = buyerRequests.data?.data?.marketRequests.filter(
    (mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED'
  );

  const filteredBuyerRequest = filteredBuyerRequests?.find(
    (filteredBuyerRequest) => filteredBuyerRequest.id === id
  );

  const breadCrumb = [
    { label: 'All Negotiations', link: BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS },
    {
      label: 'Negotiation Details',
    },
  ];

  const handleDeclineClick = (show: boolean) => {
    setShowDeclineModal((prevValue) => !prevValue);
  };

  const handleDeclineModalConfirmBtnClick = () => {
    if (negotiation) {
      dispatch(
        declineNegotiationActions.request({
          negotiationRequestId: negotiation?.id,
          listingBoxId: negotiation.listing_box_id,
        })
      );
    }
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

  const handleAcceptConfirm = () => {
    if (negotiation) {
      dispatch(
        acceptNegotiationActions.request({
          negotiationRequestId: negotiation?.id,
          listingBoxId: negotiation?.listing_box_id,
        })
      );
    }
  };

  const handleNegoBtnClick = (show: boolean) => {
    setNegotiating(show);
  };

  const handleNegoBtnClick2 = () => {
    setShowBuyerCounterNegoModal((prevValue) => !prevValue);
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

    if (id) {
      dispatch(getAllNegotiationsActions.request({}));
    }
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

  useEffect(() => {
    if (!isCreateBuyerCounterNegotiationPending) {
      setShowBuyerCounterNegoModal(false);
    }
  }, [isCreateBuyerCounterNegotiationPending]);

  useEffect(() => {
    if (!isAcceptNegotiationPending) {
      setClickAccept(false);

      dispatch(
        getNegotiationByIdActions.request({
          negotiationRequestId: negoRequestId,
        })
      );
    }
  }, [isAcceptNegotiationPending]);

  useEffect(() => {
    dispatch(
      getNegotiationByIdActions.request({
        negotiationRequestId: negoRequestId,
      })
    );
  }, [negoRequestId]);

  useEffect(() => {
    if (!isDeclineNegotiationPending) {
      setShowDeclineModal(false);

      dispatch(
        getNegotiationByIdActions.request({
          negotiationRequestId: negoRequestId,
        })
      );
    }
  }, [isDeclineNegotiationPending]);

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

  const handleNegoModalNegoBtnClick = (buyerNegotiatedPrice: number) => {
    if (negotiation?.id) {
      dispatch(
        createBuyerCounterNegotiationActions.request({
          negotiationRequestId: negotiation?.id,
          counterOffer: buyerNegotiatedPrice.toString(),
        })
      );
    }
  };

  const handleDeclineModalCloseBtnClick = () => {
    setShowDeclineModal((prevValue) => !prevValue);
  };

  if (!negotiation) {
    return <Loading />;
  }

  const generatedProps: NegotiationDetailsProps = {
    counterOffer,
    handleStartNegotiate,
    handleConfirmOffer,
    handleNegoBtnClick,
    isLoadingAcceptOffer: acceptOffer.pending || false,
    isLoadingOffer: activeOffers.pending || false,
    isAccepted,
    newOffer,
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
    negotiation,
    handleAcceptConfirm,
    handleDeclineModalConfirmBtnClick,
    handleNegoModalNegoBtnClick,
    isCreateBuyerCounterNegotiationPending,
    handleNegoBtnClick2,
    showBuyerCounterNegoModal,
    isAcceptNegotiationPending,
    showDeclineModal,
    handleDeclineModalCloseBtnClick,
    isDeclineNegotiationPending,
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
  return <NegotiationDetailsView {...generatedProps} />;
};

export default NegotiationDetails;
