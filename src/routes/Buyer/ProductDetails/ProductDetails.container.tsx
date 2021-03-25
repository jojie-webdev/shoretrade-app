import React, { useEffect, useState } from 'react';

import { ProductDetailsCard6Props } from 'components/module/ProductDetailsCard6/ProductDetailsCard6.props';
import { ProductSellerRatingProps } from 'components/module/ProductSellerRating/ProductSellerRating.props';
import { BUYER_ROUTES } from 'consts';
import moment from 'moment';
import { pathOr, splitEvery, take } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  getListingActions,
  getListingBoxesActions,
  cartActions,
  updateFavoriteSellerActions,
  updateFavouriteProductActions,
  currentAddressActions,
} from 'store/actions';
import getSellerByIdActions from 'store/actions/getSellerById';
import { GetAddressOptions } from 'store/selectors/buyer';
import { CartItem } from 'types/store/CartState';
import { GetListingResponseItem } from 'types/store/GetListingState';
import { Seller } from 'types/store/GetSellerByIdState';
import { Store } from 'types/store/Store';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';

import ProductDetailsView from './ProductDetails.view';

const ProductDetails = (): JSX.Element => {
  // MARK:- States / Variables

  const addressesData = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addressesData !== undefined &&
    !(addressesData || []).some((a) => a.approved === 'APPROVED');

  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const listingId = id;
  const addresses = GetAddressOptions();
  const previousId =
    useSelector((state: Store) => state.getListing.request?.listingId) || '';

  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';

  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const currentSeller: Seller | undefined = useSelector(
    (state: Store) => state.getSellerById.data?.data.seller
  );

  const updateFavoriteSeller = useSelector(
    (state: Store) => state.updateFavoriteSeller
  );

  const [isSellerFavorite, setIsSellerFavorite] = useState(
    currentSeller?.isFavourite
  );
  const currentListing: GetListingResponseItem | undefined = (useSelector(
    (state: Store) => state.getListing.data?.data.listing
  ) || [])[0];

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [pressedBoxRadio, setPressedBoxRadio] = useState('');
  const [weight, setWeight] = useState('');
  const [shouldHideResult, setShouldHideResult] = useState(true);
  const [favorite, setFavorite] = useState(currentListing?.isFavourite);
  const unit = formatMeasurementUnit(currentListing?.measurementUnit);
  const remainingWeight = (currentListing?.remaining || 0).toFixed(2);
  const uri = currentListing?.images[0] || '';

  const price = Number(currentListing?.price || '0');
  const isAquafuture = currentListing?.isAquafuture || false;
  const imageTags = [
    ...(currentListing?.isAquafuture ? [{ label: 'Aquafuture' }] : []),
    ...(pathOr('', ['images', '0'], currentListing).includes('type-default')
      ? [{ label: 'Not Actual Product Image' }]
      : []),
  ];

  const getListingBoxesResponse =
    useSelector((state: Store) => state.getListingBoxes.data?.data.boxes) || [];

  const isLoadingListingBoxes =
    useSelector((state: Store) => state.getListingBoxes.pending) || false;

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
      const payload: CartItem = {
        companyId: currentListing.coop?.id || '',
        companyName: currentListing.coop?.name || '',
        listing: {
          id: currentListing.id,
          type: currentListing.type,
          fisherman: currentListing.fisherman,
          metric: currentListing.size.unit,
          sizeFrom: currentListing.size.from,
          sizeTo: currentListing.size.to,
          price: currentListing.price,
          origin: currentListing.origin,
          description: currentListing.description,
          caught: currentListing.caught,
          ends: currentListing.ends,
          specifications: currentListing.state,
          image: currentListing.images[0] || '',
          minimumOrder: currentListing.minimumOrder,
          sellInMultiplesOf: currentListing.sellInMultiplesOf,
          remaining: currentListing.remaining,
          average: currentListing.average,
          isAquafuture: currentListing.isAquafuture,
          allowedWeightAdjustment: currentListing.allowedWeightAdjustment,
          isFavourite: currentListing.isFavourite,
          address: currentListing.address,
          measurementUnit: currentListing.measurementUnit,
        },
        orderBoxes: currentBox.boxes.map((b) => ({
          id: b.id,
          weight: b.weight,
          quantity: b.quantity || 0,
          count: b.count || 0,
        })),
        subTotal: currentBox.cost,
        weight: currentBox.totalWeight,
      };
      dispatch(cartActions.add(payload));
      history.push(BUYER_ROUTES.CHECKOUT);
    }
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
      if (weight.length > 0) {
        setShouldHideResult(false);
        // request only when weight or id is different
        if (
          !(
            weight === previousWeightRequest?.weight &&
            id === previousWeightRequest?.listingId
          )
        ) {
          dispatch(
            getListingBoxesActions.request({
              listingId: id,
              weight,
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

  // MARK:- Effects
  useEffect(() => {
    if (listingId && previousId !== listingId) {
      onLoad(listingId);
    }
  }, [listingId]);

  useEffect(() => {
    if (currentListing?.coop) {
      dispatch(
        getSellerByIdActions.request({ sellerId: currentListing.coop.id })
      );
    }
  }, [currentListing?.coop]);

  useEffect(() => {
    getBoxes();
  }, [weight]);

  useEffect(() => {
    if (currentSeller) {
      setIsSellerFavorite(currentSeller.isFavourite);
    }
  }, [currentSeller?.isFavourite]);

  // On error, set favorite back to what it originally was
  // useEffect(() => {
  //   if (updateFavoriteSeller?.error !== '') {
  //     setIsSellerFavorite(currentSeller?.isFavourite || false);
  //   }
  // }, [updateFavoriteSeller]);

  // MARK: - Props
  const productDetailsCard1Props = {
    title: currentListing?.type || '',
    tags: (currentListing?.state || []).map((s) => ({ label: s })),
    size: sizeToString(
      currentListing?.size.unit || '',
      currentListing?.size.from,
      currentListing?.size.to
    ),
    location: `${currentListing?.origin.suburb || ''}, ${
      currentListing?.origin.state || ''
    }, ${currentListing?.origin.countryCode || ''}`,
  };
  const productDetailsCard6Props: ProductDetailsCard6Props = {
    price: price.toFixed(2),
    minOrder: currentListing?.minimumOrder || '0',
    avgBoxSize: (currentListing?.average || 0).toFixed(2),
    timeLeft: moment(currentListing?.ends || undefined).toDate(),
    catchDate: moment(
      currentListing?.caught || undefined,
      currentListing?.caught ? 'YYYY-MM-DD' : undefined
    ).toDate(),
    unit: currentListing?.measurementUnit || undefined,
    hiddenPrice: isPendingAccount,
  };
  const sellerRatingProps: ProductSellerRatingProps = {
    name: currentListing?.coop.name || '',
    rating: currentListing?.coop.rating || '',
    uri: currentListing?.coop.image || '',
    isFavorite: isSellerFavorite || false,
    onFavorite: onFavoriteSeller,
    onClickSeller,
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
    weight,
    setWeight,
    getBoxes,
    onAddToCart,
    isLoadingListingBoxes,
    isPendingAccount,
  };
  return <ProductDetailsView {...generatedProps} />;
};

export default ProductDetails;
