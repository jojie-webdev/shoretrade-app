import React, { useEffect, useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  createMarketOfferActions,
  getActiveOffersActions,
  getListingActions,
  getListingBoxesActions,
  marketOfferNegotiateActions,
} from 'store/actions';
import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { GetListingResponseItem } from 'types/store/GetListingState';
import { Store } from 'types/store/Store';

import { Option } from './MakeOffer/MakeOffer.props';
import RequestAndNegotiateView from './RequestAndNegotiate.view';

const RequestAndNegotiate = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const {
    state,
  }: {
    state: {
      buyerRequest: GetAllMarketRequestResponseItem;
      activeOffer: GetActiveOffersRequestResponseItem;
    };
  } = useLocation();

  const buyerRequest = state.buyerRequest;
  const activeOffer = state.activeOffer;
  const offerSentStatus = useSelector(
    (state: Store) => state.createMarketOffer.data?.status
  );
  const marketOfferNegotiate = useSelector(
    (state: Store) => state.marketOfferNegotiate
  );

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const buyerRequests = useSelector(
    (state: Store) => state.getAllMarketRequest.data?.data.marketRequests
  );

  const buyerRequestForActiveOfferTab = buyerRequests?.find(
    (buyerRequest) => buyerRequest.id === activeOffer?.marketRequest?.id
  );

  const userPending =
    user !== undefined &&
    !(user.companies || []).some((a) =>
      a.addresses.some((b) => b.approved === 'APPROVED')
    );

  const [offer, setOffer] = useState<MarketOfferItem[]>([]);
  const [offerSpecs, setOfferSpecs] = useState<Option[]>([]);
  const [currentOfferItem, setCurrentOfferItem] = useState('');
  const [showOfferSentModal, setShowOfferSentModal] = useState(false);
  const [showOfferAcceptSentModal, setShowOfferAcceptSentModal] = useState(
    false
  );
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [shouldHideResult, setShouldHideResult] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  const isNegotiating =
    useSelector((state: Store) => state.marketOfferNegotiate.pending) || false;

  const isReview = pathname.includes(SELLER_MARKET_BOARD_ROUTES.OFFER);

  const previousWeightRequest = useSelector(
    (state: Store) => state.getListingBoxes.request
  );

  const getListingBoxesResponse =
    useSelector((state: Store) => state.getListingBoxes.data?.data.boxes) || [];
  console.log(
    'getListingBoxesResponse >>>>>>>>>>>>>> ',
    getListingBoxesResponse
  );
  console.log('previousWeightRequest >>>>>>>>>>>>>> ', previousWeightRequest);

  const currentListing: GetListingResponseItem | undefined = (useSelector(
    (state: Store) => state.getListing.data?.data.listing
  ) || [])[0];

  const price = Number(currentListing?.price || '0');

  const { id } = useParams<any>();
  const listingId = 'f04aeee8-e816-4afe-9bfe-ab2b34763391'; //'8897ec8f-276d-4657-8a2f-958d39788a7b';

  const groupedBox =
    previousWeightRequest?.listingId === listingId && !shouldHideResult
      ? getListingBoxesResponse.map((boxGroup) => {
          return boxGroup.reduce(
            (
              accum: {
                id: string;
                totalWeight: number;
                quantity: number;
                cost: number;
                boxes: {
                  count: number | null;
                  id: string;
                  quantity: number | null;
                  weight: number;
                }[];
                unit: string;
              },
              current
            ) => {
              const totalWeight =
                accum.totalWeight + current.weight * (current?.quantity || 0);
              return {
                id: `${accum.id}${accum.id ? '' : ','}${current.id}`,
                totalWeight,
                cost: price * totalWeight,
                quantity: 1,
                boxes: [...accum.boxes, current],
                unit: 'kg',
              };
            },
            {
              id: '',
              totalWeight: 0,
              cost: 0,
              quantity: 1,
              boxes: [],
              unit: 'kg',
            }
          );
        })
      : [];

  const weight = (isReview
    ? buyerRequest.weight?.from || 0
    : activeOffer.weight || 0
  ).toString();

  const onNegotiateOffer = (
    marketOfferId: string,
    price: number,
    accepted?: boolean
  ) => {
    dispatch(
      marketOfferNegotiateActions.request({
        marketOfferId,
        price,
        accepted: accepted,
      })
    );
  };

  const onConfirmSentOffer = () => {
    setShowOfferSentModal(false);
    setShowOfferAcceptSentModal(false);
    dispatch(marketOfferNegotiateActions.clear());
    dispatch(createMarketOfferActions.clear());
    dispatch(getActiveOffersActions.request({}));
    dispatch(getActiveOffersActions.request({}));
    history.push(SELLER_MARKET_BOARD_ROUTES.LANDING, {
      currentTab: 'My Active Offers',
    });
  };

  const handleAcceptBtnClick = () => {
    setShowAcceptModal((prevValue) => !prevValue);
  };

  const handleConfirmBtnClick = () => {
    setShowDeclineModal((prevValue) => !prevValue);
  };

  const handleCancelBtnClick = () => {
    setShowDeclineModal((prevValue) => !prevValue);
  };

  const handleDeclineBtnClick = () => {
    console.log('handleDeclineBtnClick > showDeclineModal > ');
    setShowDeclineModal((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (listingId) {
      dispatch(getListingActions.request({ listingId: listingId }));
    }
    // eslint-disable-next-line
  }, [listingId]);

  useEffect(() => {
    dispatch(
      getListingBoxesActions.request({
        listingId,
        weight: '50',
      })
    );
    // eslint-disable-next-line
  }, [weight]);

  useEffect(() => {
    if (offerSentStatus === 200) {
      setShowOfferSentModal(true);
    } else {
      setShowOfferSentModal(false);
    }
  }, [offerSentStatus]);

  useEffect(() => {
    if (marketOfferNegotiate?.data?.status === 200) {
      if (marketOfferNegotiate?.request?.accepted === true) {
        setShowOfferAcceptSentModal(true);
      } else {
        setShowOfferSentModal(true);
      }
    } else {
      setShowOfferSentModal(false);
      setShowOfferAcceptSentModal(false);
    }
  }, [marketOfferNegotiate]);

  if ((isReview && !buyerRequest) || (!isReview && !activeOffer)) {
    history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
    return <></>;
  }

  const generatedProps = {
    buyerRequest,
    activeOffer,
    offer,
    setOffer,
    currentOfferItem,
    setCurrentOfferItem,
    isReview,
    onNegotiateOffer,
    isNegotiating,
    userPending,
    buyerRequestForActiveOfferTab,
    showOfferSentModal,
    onConfirmSentOffer,
    offerSpecs,
    setOfferSpecs,
    showOfferAcceptSentModal,
    handleAcceptBtnClick,
    showAcceptModal,
    handleConfirmBtnClick,
    handleCancelBtnClick,
    showDeclineModal,
    handleDeclineBtnClick,
  };
  return <RequestAndNegotiateView {...generatedProps} />;
};

export default RequestAndNegotiate;
