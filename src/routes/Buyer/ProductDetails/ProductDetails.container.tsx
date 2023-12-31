import React, { useEffect, useMemo, useState } from 'react';

import { ProductDetailsCard6Props } from 'components/module/ProductDetailsCard6/ProductDetailsCard6.props';
import { BUYER_ROUTES } from 'consts';
import { ADDITIONAL_INFOS } from 'consts/listingAdditionalInfos';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Box,
  ProductSellerRatingProps,
} from 'routes/Buyer/ProductDetails/ProductDetails.props';
import {
  getListingActions,
  getListingBoxesActions,
  // cartActions,
  updateFavoriteSellerActions,
  updateFavouriteProductActions,
  currentAddressActions,
  addCartItemActions,
  createNegotiation_2Actions,
  getNegotiationCreditActions,
} from 'store/actions';
import getSellerByIdActions from 'store/actions/getSellerById';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
// import { CartItem } from 'types/store/CartState';
import { AddCartItemPayload } from 'types/store/AddCartItemState';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { GetListingResponseItem } from 'types/store/GetListingState';
import { Seller } from 'types/store/GetSellerByIdState';
import { Store } from 'types/store/Store';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';

import { getActivePlan } from '../Account/SubscriptionPlan/SubscriptionPlan.transform';
import ProductDetailsView from './ProductDetails.view';

const ProductDetails = (): JSX.Element => {
  const dispatch = useDispatch();
  const [showSuccessAddBtn, setShowSuccessAddBtn] = useState(false);
  const [showNegoSuccessModal, setShowNegoSuccessModal] = useState(false);

  const history = useHistory();
  const { id } = useParams<any>();

  const addressesData = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addressesData !== undefined &&
    !(addressesData || []).some((a) => a.approved === 'APPROVED');

  const listingId = id;
  const addresses = GetAddressOptions();

  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';

  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const company = GetDefaultCompany();
  const employeeId = company?.employeeId || '';

  const currentSeller: Seller | undefined = useSelector(
    (state: Store) => state.getSellerById.data?.data.seller
  );

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

  const getUser = useSelector((state: Store) => state.getUser);
  const negotiationCredit = useSelector(
    (store: Store) => store.getNegotiationCredit.data?.data
  );

  const defaultCompany = useMemo(() => {
    if (!getUser) return null;

    return getUser.data?.data.user.companies.length
      ? getUser.data?.data.user.companies[0]
      : null;
  }, [getUser]);

  const canNegotiate = isSubscribedToNegoRequest || false;

  // const updateFavoriteSeller = useSelector(
  //   (state: Store) => state.updateFavoriteSeller
  // );

  const [isSellerFavorite, setIsSellerFavorite] = useState(
    currentSeller?.isFavourite
  );
  const currentListing: GetListingResponseItem | undefined = (useSelector(
    (state: Store) => state.getListing.data?.data.listing
  ) || [])[0];

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [pressedBoxRadio, setPressedBoxRadio] = useState('');
  const [weight, setWeight] = useState('');
  const [negotiationWeight, setNegotiationWeight] = useState('');
  const [shouldHideResult, setShouldHideResult] = useState(true);
  const [favorite, setFavorite] = useState(currentListing?.isFavourite);
  const [showNegoModal, setShowNegoModal] = useState(false);
  const [showConfirmNegoModal, setShowConfirmNegoModal] = useState(false);
  const [selectedBoxesIndex, setSelectedBoxesIndex] = useState<number>(0);
  const [selectedBoxesWeight, setSelectedBoxesWeight] = useState<Box[]>([]);
  const [negotiationPrice, setNegotiationPrice] = useState<number | any>(null);
  const [showNegoCreditsModal, setShowNegoCreditsModal] = useState(false);
  const unit = formatMeasurementUnit(currentListing?.measurementUnit);
  const remainingWeight = (currentListing?.remaining || 0).toFixed(2);
  const price = Number(currentListing?.price || '0');
  const isAquafuture = currentListing?.isAquafuture || false;
  const catchRecurrence = currentListing?.catchRecurrence || '';

  const getListingBoxesResponse =
    useSelector((state: Store) => state.getListingBoxes.data?.data.boxes) || [];

  const isLoadingAddCart =
    useSelector((state: Store) => state.addCartItem.pending) || false;

  const addCartItemData: AddCartItemPayload | null =
    useSelector((state: Store) => state.addCartItem.data) || null;

  const isLoadingListingBoxes =
    useSelector((state: Store) => state.getListingBoxes.pending) || false;

  const isSendingNegotiation =
    useSelector((state: Store) => state.createNegotiation_2.pending) === true;

  const sendingNegotiationStatus = useSelector(
    (state: Store) => state.createNegotiation_2.data?.status
  );

  if (sendingNegotiationStatus === 200) {
    setShowNegoModal(false);
    setShowConfirmNegoModal(false);
  }

  const previousWeightRequest = useSelector(
    (state: Store) => state.getListingBoxes.request
  );

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
                unit,
              };
            },
            {
              id: '',
              totalWeight: 0,
              cost: 0,
              quantity: 1,
              boxes: [],
              unit,
            }
          );
        })
      : [];

  // MARK:- Methods
  const onLoad = (listingId: string) => {
    dispatch(getListingActions.request({ listingId: listingId }));
  };

  const onAddToCart = () => {
    const currentBox = groupedBox.find((box) => box.id === pressedBoxRadio);

    if (currentBox) {
      // const payload: CartItem = {
      //   companyId: currentListing.coop?.id || '',
      //   companyName: currentListing.coop?.name || '',
      //   listing: {
      //     id: currentListing.id,
      //     type: currentListing.type,
      //     fisherman: currentListing.fisherman,
      //     metric: currentListing.size.unit,
      //     sizeFrom: currentListing.size.from,
      //     sizeTo: currentListing.size.to,
      //     price: currentListing.price,
      //     origin: currentListing.origin,
      //     description: currentListing.description,
      //     caught: currentListing.caught,
      //     ends: currentListing.ends,
      //     catchRecurrence: currentListing.catchRecurrence,
      //     specifications: currentListing.state,
      //     image: currentListing.images[0] || '',
      //     minimumOrder: currentListing.minimumOrder,
      //     sellInMultiplesOf: currentListing.sellInMultiplesOf,
      //     remaining: currentListing.remaining,
      //     average: currentListing.average,
      //     isAquafuture: currentListing.isAquafuture,
      //     allowedWeightAdjustment: currentListing.allowedWeightAdjustment,
      //     isFavourite: currentListing.isFavourite,
      //     address: currentListing.address,
      //     measurementUnit: currentListing.measurementUnit,
      //     packagingId: currentListing.packaging?.id || null,
      //   },
      //   orderBoxes: currentBox.boxes.map((b) => ({
      //     id: b.id,
      //     weight: b.weight,
      //     quantity: b.quantity || 0,
      //     count: b.count || 0,
      //   })),
      //   subTotal: currentBox.cost,
      //   weight: currentBox.totalWeight,
      // };
      // dispatch(cartActions.add(payload));

      dispatch(
        addCartItemActions.request({
          employeeId,
          boxes: currentBox.boxes.map((b) => ({
            id: b.id,
            quantity: b.quantity || 0,
          })),
        })
      );
      setPressedBoxRadio('');
      setWeight('');
      // history.push(BUYER_ROUTES.CHECKOUT); // moved to sagas
      setShowSuccessAddBtn(true);
    }
  };

  const handleSelectedBoxesWeight = (boxes: Box[], boxesIndex: number) => {
    setSelectedBoxesIndex(boxesIndex);
    setSelectedBoxesWeight(boxes);
  };

  const handleNegoModalShow = () => {
    setShowNegoModal((prevValue) => !prevValue);
  };

  const handleConfirmNegoModalClose = () => {
    setShowConfirmNegoModal(false);
  };

  const handleShowConfirmNegoModal = () => {
    setShowNegoModal(false);
    setShowConfirmNegoModal(true);
  };

  const handleNegotiationPriceSetting = (price: string) => {
    setNegotiationPrice(price);
  };

  const handleDesiredQuantityChange = (weight: string) => {
    setSelectedBoxesIndex(0);
    setSelectedBoxesWeight([]);
    setNegotiationWeight(weight);
    setWeight('');
  };

  const handleShowNegoCreditsModal = () => {
    setShowNegoCreditsModal((prevValue) => !prevValue);
  };

  const getBoxes = () => {
    if (!shouldHideResult) {
      setShouldHideResult(true);
      setPressedBoxRadio('');
    }
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    const timerId = setTimeout(() => {
      if (negotiationWeight.length > 0 || weight.length > 0) {
        setShouldHideResult(false);
        // request only when weight or id is different
        if (
          !(
            negotiationWeight === previousWeightRequest?.weight &&
            id === previousWeightRequest?.listingId
          ) ||
          !(
            weight === previousWeightRequest?.weight &&
            id === previousWeightRequest?.listingId
          )
        ) {
          dispatch(
            getListingBoxesActions.request({
              listingId: id,
              weight: negotiationWeight || weight,
            })
          );
        }
      }
    }, 800);
    setTimer(timerId);
  };

  const onFavorite = () => {
    setFavorite((prevState) => {
      dispatch(
        updateFavouriteProductActions.request({
          listingId: listingId,
          favourite: !prevState,
        })
      );
      return !prevState;
    });
  };

  const onClickSeller = () => {
    if (currentSeller) {
      history.push(BUYER_ROUTES.SELLER_DETAILS(currentSeller.id));
    }
  };

  const onFavoriteSeller = async () => {
    if (currentSeller) {
      setIsSellerFavorite((prevState) => !prevState);
      dispatch(
        updateFavoriteSellerActions.request({
          sellerId: currentSeller.id,
          favorite: !currentSeller.isFavourite,
        })
      );
    }
  };

  const handleConfirmNegoClick = () => {
    const payload = {
      listingId: currentListing.id,
      listingBoxes: selectedBoxesWeight,
      counterOffer: negotiationPrice.toString(),
    };

    dispatch(createNegotiation_2Actions.request(payload));
  };

  const handleNegoSuccessModalClose = () => {
    setShowNegoSuccessModal(false);
  };

  // MARK:- Effects
  useEffect(() => {
    if (listingId) {
      onLoad(listingId);
      dispatch(getNegotiationCreditActions.request({}));
    }
    // eslint-disable-next-line
  }, [listingId]);

  useEffect(() => {
    if (currentListing?.coop) {
      dispatch(
        getSellerByIdActions.request({ sellerId: currentListing.coop.id })
      );
    }
    // eslint-disable-next-line
  }, [currentListing?.coop]);

  useEffect(() => {
    getBoxes();
    // eslint-disable-next-line
  }, [weight, negotiationWeight]);

  useEffect(() => {
    if (currentSeller) {
      setIsSellerFavorite(currentSeller.isFavourite);
    }
    // eslint-disable-next-line
  }, [currentSeller?.isFavourite]);

  useEffect(() => {
    if (addCartItemData?.data.items && weight !== '') {
      dispatch(addCartItemActions.clear());
    }
  }, [weight, addCartItemData]);

  useEffect(() => {
    if (!isSendingNegotiation && negotiationPrice) {
      setShowNegoModal(false);
      setShowConfirmNegoModal(false);
      setShowNegoSuccessModal(true);
      dispatch(getNegotiationCreditActions.request({}));
      dispatch(getListingActions.request({ listingId: listingId }));
    }
  }, [isSendingNegotiation]);

  useEffect(() => {
    const box = pathOr([] as Box[], ['0', 'boxes'], groupedBox);

    if (box.length > 0) {
      setSelectedBoxesWeight(box);
      setSelectedBoxesIndex(0);
    }
  }, [getListingBoxesResponse, negotiationWeight]);

  useEffect(() => {
    if (negotiationCredit?.is_unlimited) {
      setShowNegoCreditsModal(false);
    } else if (negotiationCredit?.credit === 0) {
      setShowNegoCreditsModal(true);
    }
  }, [negotiationCredit]);

  // On error, set favorite back to what it originally was
  // useEffect(() => {
  //   if (updateFavoriteSeller?.error !== '') {
  //     setIsSellerFavorite(currentSeller?.isFavourite || false);
  //   }
  // }, [updateFavoriteSeller]);

  // MARK: - Props

  const additionalInfos = ADDITIONAL_INFOS.map((info) => {
    if (
      currentListing &&
      currentListing[info.key as keyof GetListingResponseItem]
    ) {
      return info.display;
    } else return '';
  }).filter((info) => info !== '');

  const productDetailsCard1Props = {
    title: currentListing?.type || '',
    tags: additionalInfos
      .map((info) => ({
        label: info,
        type: 'blue',
      }))
      .concat([
        {
          label: currentListing?.quality || '',
          type: 'blue',
        },
      ])
      .concat(
        (currentListing?.state || []).map((s) => ({
          label: s,
          type: 'plain',
        }))
      )
      .filter((tag) => tag.label !== ''),
    size: sizeToString(
      currentListing?.size.unit || '',
      currentListing?.size.from,
      currentListing?.size.to
    ),
    location: currentListing?.origin
      ? `${currentListing?.origin.suburb}, ${currentListing?.origin.state}, ${currentListing?.origin.countryCode}`
      : `${currentListing?.address.suburb || ''}, ${
          currentListing?.address.state || ''
        }, ${currentListing?.address.countryCode || ''}, ${
          currentListing?.address.postcode || ''
        }`,
    packaging: currentListing?.packaging?.label,
  };
  const dateEnds = currentListing?.ends
    ? moment(currentListing?.ends).toDate()
    : undefined;

  const productDetailsCard6Props: ProductDetailsCard6Props = {
    price: price.toFixed(2),
    minOrder: currentListing?.minimumOrder || '0',
    avgBoxSize: (currentListing?.average || 0).toFixed(2),
    dateEnds,
    catchDate: currentListing?.caught
      ? moment(currentListing.caught, 'YYYY-MM-DD').toDate()
      : undefined,
    catchRecurrence: currentListing?.catchRecurrence || undefined,
    unit: currentListing?.measurementUnit || undefined,
    hiddenPrice: isPendingAccount,
    templateDeliveryDate: currentListing?.templateDeliveryDate,
    size: sizeToString(
      currentListing?.size.unit || '',
      currentListing?.size.from,
      currentListing?.size.to
    ),
    sizingOptions: !currentListing?.activeSizeUnit
      ? []
      : currentListing?.activeSizeUnit === 'GM'
      ? currentListing?.gmSizingOptions
      : currentListing?.cmSizingOptions,
    activeSizeUnit: currentListing?.activeSizeUnit === 'GM' ? 'g' : 'cm',
    isPreAuction: currentListing?.isPreAuctionSale,
    auctionDate: currentListing?.auctionDate,
    handleNegoModalShow,
    allowNegotiations: currentListing?.allowNegotiations,
    handleShowNegoCreditsModal,
    negotiationCredit,
    negotiationId: currentListing?.negotiation_id,
  };
  const sellerRatingProps: ProductSellerRatingProps = {
    name: currentListing?.coop.name || '',
    rating: currentListing?.coop.rating || '',
    uri: currentListing?.coop.image || '',
    isFavorite: isSellerFavorite || false,
    onFavorite: onFavoriteSeller,
    onClickSeller,
    companyLocation: `${
      currentListing?.address.suburb
        ? `${currentListing?.address.suburb}, `
        : ''
    }${currentListing?.address.state || ''}${
      currentListing?.address.countryCode
        ? `, ${currentListing?.address.countryCode}`
        : ''
    }`,
  };

  const generatedProps = {
    onLoad,
    listingId,
    currentListing,
    addresses,
    selectedAddress,
    selectAddress,
    favorite,
    onFavorite,
    setFavorite,
    productDetailsCard1Props,
    productDetailsCard6Props,
    sellerRatingProps,
    unit,
    groupedBox,
    pressedBoxRadio,
    setPressedBoxRadio,
    remainingWeight,
    isAquafuture,
    catchRecurrence,
    weight,
    setWeight,
    getBoxes,
    onAddToCart,
    isLoadingListingBoxes,
    isPendingAccount,
    isLoadingAddCart,
    addCartItemData,
    showSuccessAddBtn,
    canNegotiate,
    showNegoModal,
    handleSelectedBoxesWeight,
    selectedBoxesWeight,
    selectedBoxesIndex,
    handleShowConfirmNegoModal,
    showConfirmNegoModal,
    handleConfirmNegoClick,
    isSendingNegotiation,
    handleNegotiationPriceSetting,
    negotiationPrice,
    handleDesiredQuantityChange,
    negotiationWeight,
    negotiationCredit,
    handleShowNegoCreditsModal,
    showNegoCreditsModal,
    showNegoSuccessModal,
    handleNegoSuccessModalClose,
    handleConfirmNegoModalClose,
  };
  return <ProductDetailsView {...generatedProps} />;
};

export default ProductDetails;
