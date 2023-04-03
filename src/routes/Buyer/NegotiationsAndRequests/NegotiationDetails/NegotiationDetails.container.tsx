import React, { useEffect, useMemo, useState } from 'react';

import Loading from 'components/module/Loading';
import { BUYER_ROUTES } from 'consts';
import { BUYER_MARKET_REQUEST_ROUTES } from 'consts/routes';
import moment from 'moment';
import { isEmpty, sortBy, pathOr } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getActivePlan } from 'routes/Buyer/Account/SubscriptionPlan/SubscriptionPlan.transform';
import { syncAASBalance } from 'services/aas';
import {
  acceptNegotiationActions,
  addCartItemActions,
  addCartNegotiatedItemActions,
  createBuyerCounterNegotiationActions,
  declineNegotiationActions,
  deleteMarketRequestActions,
  getActiveOffersActions,
  getAllMarketRequestActions,
  getAllNegotiationsActions,
  getListingBoxesActions,
  getNegotiationByIdActions,
  marketOfferActions,
  getCartByEmployeeIdAndNegotiationIdActions,
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
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showNegotiationAcceptedModal, setShowNegotiationAcceptedModal] =
    useState(false);
  const [showSuccessfulNegoModal, setShowSuccessfulNegoModal] = useState(false);
  const [showDeclinedNegoModal, setShowDeclinedNegoModal] = useState(false);

  const defaultCompany = GetDefaultCompany();
  const employeeId = defaultCompany?.employeeId || '';

  const isAddCartNegotiatedItemPending = useSelector(
    (store: Store) => store.addCartNegotiatedItem.pending
  );
  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );
  const cart = useSelector(
    (store: Store) => store.getCartByEmployeeIdAndNegotiationId.data?.data
  );
  const isCartPending = useSelector(
    (store: Store) => store.getCartByEmployeeIdAndNegotiationId.pending
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

  const negotiations = useSelector(
    (store: Store) => store.getAllNegotiations.data?.data.negotiations
  );

  const isCreateBuyerCounterNegotiationPending =
    useSelector(
      (store: Store) => store.createBuyerCounterNegotiation.pending
    ) === true;

  const isAcceptNegotiationPending =
    useSelector((store: Store) => store.acceptNegotiation.pending) === true;

  const isDeclineNegotiationPending =
    useSelector((store: Store) => store.declineNegotiation.pending) === true;

  // const getListingBoxes =
  //   useSelector((state: Store) => state.getListingBoxes.data?.data.boxes) || [];

  const filteredBuyerRequests = buyerRequests.data?.data?.marketRequests.filter(
    (mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED'
  );

  const filteredBuyerRequest = filteredBuyerRequests?.find(
    (filteredBuyerRequest) => filteredBuyerRequest.id === id
  );

  const breadCrumb = [
    {
      label: 'All Negotiations',
      link: `${BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS}`,
    },
    {
      label: 'Negotiation Details',
    },
  ];

  const getFinalPrice = () => {
    let price = negotiation?.price_per_kilo;

    if (negotiation?.counter_offer) {
      price = negotiation?.counter_offer;
    }

    if (negotiation?.history?.negotiation_request?.counter_offer?.toString()) {
      price =
        negotiation?.history?.negotiation_request?.counter_offer?.toString();
    }

    if (negotiation?.history?.negotiation_offer?.counter_offer?.toString()) {
      price =
        negotiation?.history?.negotiation_offer?.counter_offer?.toString();
    }

    return price;
  };

  // const groupedBox =
  //   negotiation?.listing_id &&
  //   getListingBoxes.map((boxGroup) => {
  //     return boxGroup.reduce(
  //       (
  //         accum: {
  //           id: string;
  //           totalWeight: number;
  //           quantity: number;
  //           cost: number;
  //           boxes: {
  //             count: number | null;
  //             id: string;
  //             quantity: number | null;
  //             weight: number;
  //           }[];
  //           unit: string;
  //         },
  //         current
  //       ) => {
  //         const totalWeight =
  //           accum.totalWeight + current.weight * (current?.quantity || 0);
  //         return {
  //           id: `${accum.id}${accum.id ? '' : ','}${current.id}`,
  //           totalWeight,
  //           cost: Number(getFinalPrice() || '0') * totalWeight,
  //           quantity: 1,
  //           boxes: [...accum.boxes, current],
  //           unit: negotiation?.metric,
  //         };
  //       },
  //       {
  //         id: '',
  //         totalWeight: 0,
  //         cost: 0,
  //         quantity: 1,
  //         boxes: [],
  //         unit: negotiation?.metric,
  //       }
  //     );
  //   });

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

  const handleNegotiationAcceptedModalToggle = () => {
    setShowNegotiationAcceptedModal((prevValue) => !prevValue);
  };

  const handleNegotiationAcceptedModalPayNowClick = () => {
    setShowNegotiationAcceptedModal((prevValue) => !prevValue);
  };

  const handleSuccessfulNegoModalToggle = () => {
    setShowSuccessfulNegoModal((prevValue) => !prevValue);
  };

  const handleDeclinedNegoModalToggle = () => {
    setShowDeclinedNegoModal(false);
    history.push(`${BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS}`);
  };

  // const onAddToCart = () => {
  //   const currentBox = groupedBox.find((box) => box.id === pressedBoxRadio);

  //   if (currentBox) {
  //     dispatch(
  //       addCartItemActions.request({
  //         employeeId,
  //         boxes: currentBox.boxes.map((b) => ({
  //           id: b.id,
  //           quantity: b.quantity || 0,
  //         })),
  //       })
  //     );
  //     setPressedBoxRadio('');
  //     setWeight('');
  //     // history.push(BUYER_ROUTES.CHECKOUT); // moved to sagas
  //     setShowSuccessAddBtn(true);
  //   }
  // };

  const handlePayNow = () => {
    setShowPaymentMethod(true);

    if (negotiation) {
      // const payload: AcceptOfferItem = {
      //   marketOfferId: selectedOffer?.id || '',
      //   marketNegotiationId: negotiation?.id,
      //   marketRequestId: filteredBuyerRequest?.id || '',
      // };

      const payload = {
        marketNegotiationId: negotiation?.id,
        marketOfferId: negotiation?.listing_id,
        marketRequestId: '',
      };

      dispatch(marketOfferActions.add(payload));
    }
  };

  const handleProceedToCheckoutClick = () => {
    if (negotiation && negotiation.id && employeeId) {
      dispatch(
        addCartNegotiatedItemActions.request({
          negotiationId: negotiation.id,
          employeeId,
          boxes: negotiation.listing_boxes,
        })
      );

      history.push(BUYER_ROUTES.NEGOTIATION_CHECKOUT(negotiation.id || ''));
    }
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
          listingBoxes: negotiation.listing_boxes,
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
    // handlePayNow();
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

  // const getBoxes = () => {
  //   if (timer) {
  //     clearTimeout(timer);
  //     setTimer(null);
  //   }
  //   const timerId = setTimeout(() => {
  //     if (negotiation?.desired_quantity) {
  //       // request only when weight or id is different
  //       // if (
  //       //   !(
  //       //     negotiationWeight === previousWeightRequest?.weight &&
  //       //     id === previousWeightRequest?.listingId
  //       //   ) ||
  //       //   !(
  //       //     weight === previousWeightRequest?.weight &&
  //       //     id === previousWeightRequest?.listingId
  //       //   )
  //       // ) {
  //       dispatch(
  //         getListingBoxesActions.request({
  //           listingId: id,
  //           weight: negotiation?.desired_quantity?.toString() || '0',
  //         })
  //       );
  //       // }
  //     }
  //   }, 800);
  //   setTimer(timerId);
  // };

  // useEffect(() => {
  //   if (
  //     isAddCartNegotiatedItemPending !== null &&
  //     isAddCartNegotiatedItemPending !== undefined &&
  //     isAddCartNegotiatedItemPending === false &&
  //     negotiation?.id
  //   ) {
  //     history.push(BUYER_ROUTES.NEGOTIATION_CHECKOUT(negotiation.id || ''));
  //   }
  // }, [negotiation, isAddCartNegotiatedItemPending]);

  useEffect(() => {
    if (employeeId && negoRequestId) {
      dispatch(
        getCartByEmployeeIdAndNegotiationIdActions.request({
          employeeId,
          negoRequestId,
        })
      );
    }
  }, [employeeId, negoRequestId]);

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
    setShowNegotiationAcceptedModal(false);
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

      dispatch(
        getNegotiationByIdActions.request({
          negotiationRequestId: negoRequestId,
        })
      );
      dispatch(getAllNegotiationsActions.request({}));
    } else {
      setShowSuccessfulNegoModal(true);
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
    } else {
      setShowNegotiationAcceptedModal(true);
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
    } else {
      setShowDeclinedNegoModal(true);
    }
  }, [isDeclineNegotiationPending]);

  // useEffect(() => {
  //   getBoxes();
  //   // eslint-disable-next-line
  // }, [negotiation?.desired_quantity]);

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

  const price = Number(
    negotiation?.negotiation_offer?.counter_offer ||
      negotiation?.counter_offer ||
      '0'
  );

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

  const updatedCounterOffer = negotiations?.find(
    (nego) => nego.parent_negotiation_request_id === negotiation?.id
  )?.counter_offer;

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
    handleProceedToCheckoutClick,
    handleNegotiationAcceptedModalToggle,
    handleNegotiationAcceptedModalPayNowClick,
    showNegotiationAcceptedModal,
    handleSuccessfulNegoModalToggle,
    showSuccessfulNegoModal,
    handleDeclinedNegoModalToggle,
    showDeclinedNegoModal,
    isCartPending,
    updatedCounterOffer,
  };

  // const getPrice = () => {
  //   if (
  //     !selectedOffer?.negotiations ||
  //     selectedOffer?.negotiations.length < 1
  //   ) {
  //     return selectedOffer?.price || 0;
  //   }

  //   return selectedOffer?.negotiations[0]?.price || 0;
  // };

  if (showPaymentMethod) {
    return (
      <PaymentMethod
        // totalValue={getPrice() * (selectedOffer?.weight || 0)}
        totalValue={price}
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
