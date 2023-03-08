import React, { useState, useEffect, useMemo } from 'react';

import { ProductDetailsCard6Props } from 'components/module/ProductDetailsCard6/ProductDetailsCard6.props';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { pathOr } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  createNegotiation_2Actions,
  getListingBoxesActions,
  getMarketInterestsActions,
  getNegotiationByIdActions,
  getNegotiationCreditActions,
  orderActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { UserCompany } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import useHomeOld from 'utils/Hooks/useHomeOld';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { getActivePlan } from '../Account/SubscriptionPlan/SubscriptionPlan.transform';
import { Box } from '../ProductDetails/ProductDetails.props';
import { HOME_BANNER } from './Home.constants';
import { HomeGeneratedProps, CreditState, HomeData } from './Home.props';
import HomeView from './Home.view';
import HomeViewOld from './Home.view.old';

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const isOld = useHomeOld();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const theme = useTheme();

  const [showNegoCreditsModal, setShowNegoCreditsModal] = useState(false);
  const [showNegoModal, setShowNegoModal] = useState(false);
  const [clickedRecentListing, setClickedRecentListing] = useState<
    GetBuyerHomepageResponseListingItem | undefined
  >();
  const [closeOnAccept, setCloseOnAccept] = useState(false);
  const [negotiationPrice, setNegotiationPrice] = useState<number | any>(null);
  const [selectedBoxesIndex, setSelectedBoxesIndex] = useState<number>(0);
  const [selectedBoxesWeight, setSelectedBoxesWeight] = useState<Box[]>([]);
  const [weight, setWeight] = useState('');
  const [negotiationWeight, setNegotiationWeight] = useState('');
  const [showSuccessfulNegoModal, setShowSuccessfulNegoModal] = useState(false);

  const price = Number(clickedRecentListing?.price || '0');

  const dateEnds = clickedRecentListing?.ends
    ? moment(clickedRecentListing?.ends).toDate()
    : undefined;

  // MARK:- Store
  const buyerHomePageData = useSelector(
    (state: Store) => state.getBuyerHomepage
  );

  const isLoadingListingBoxes =
    useSelector((state: Store) => state.getListingBoxes.pending) === true;

  const negotiationCredit = useSelector(
    (store: Store) => store.getNegotiationCredit.data?.data
  );

  const loading =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;

  useEffect(() => {
    dispatch(orderActions.clear());
    dispatch(getNegotiationCreditActions.request({}));
  }, []);

  // MARK:- Variables
  const {
    categories,
    favouriteListing,
    favouriteSellers,
    recentListing,
    sellers,
    bannerData,
  } = (buyerHomePageData.data?.data.data || {}) as HomeData;

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');
  const company = GetDefaultCompany();
  let featured: string[] = (isMobile ? bannerData?.app : bannerData?.web) || [];

  if (!theme.isSFM) {
    featured = isMobile ? HOME_BANNER.mobile : HOME_BANNER.desktop;
  }

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );
  const subscription = useSelector((store: Store) => store.subscription);
  const getListingBoxesResponse =
    useSelector((state: Store) => state.getListingBoxes.data?.data.boxes) || [];

  const loadingHomePage = buyerHomePageData.pending !== false; // || subscription.status === null;

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

  const getUser = useSelector((state: Store) => state.getUser);
  const negotiationById = useSelector(
    (state: Store) => state.getNegotiationById.data?.data
  );

  const defaultCompany = useMemo(() => {
    if (!getUser) return null;

    return getUser.data?.data.user.companies.length
      ? getUser.data?.data.user.companies[0]
      : null;
  }, [getUser]);

  const isSubscribedToNegoRequest =
    currentReverseMarketDetails ||
    currentPlanDetails?.plan?.name === CompanyPlanName.PRO
      ? companyPlan && !companyPlan.flags?.hasCancelledReversedMarketplace
      : subscriptionType !== null && false;

  const canNegotiate = isSubscribedToNegoRequest || false;

  const unit = formatMeasurementUnit(clickedRecentListing?.measurementUnit);

  // MARK:- State
  const [currentCompany, setCurrentCompany] = useState<
    UserCompany | undefined
  >();

  const marketSector = useSelector(
    (state: Store) => state.getMarketInterests.data?.data.sectorAlias
  );

  const previousWeightRequest = useSelector(
    (state: Store) => state.getListingBoxes.request
  );

  const isCreateNegotiationPending =
    useSelector((state: Store) => state.createNegotiation_2.pending) === true;

  const handleNegoModalBtnClick = () => {
    if (clickedRecentListing?.id) {
      dispatch(
        createNegotiation_2Actions.request({
          listingId: clickedRecentListing?.id,
          listingBoxId: (selectedBoxesWeight || groupedBox[0].boxes)[0].id,
          desiredQuantity: negotiationWeight,
          counterOffer: negotiationPrice.toString(),
        })
      );
    }
  };

  const handleDesiredQuantityChange = (weight: string) => {
    setSelectedBoxesIndex(0);
    setSelectedBoxesWeight([]);
    setNegotiationWeight(weight);
    setWeight('');
  };

  const handleNegotiationPriceSetting = (price: number) => {
    setNegotiationPrice(price);
  };

  const handleSuccessfulNegoModalToggle = () => {
    setShowSuccessfulNegoModal((prevValue) => !prevValue);
  };

  const handleShowNegoCreditsModal = () => {
    setShowNegoCreditsModal((prevValue) => !prevValue);
  };

  const handleShowNegoModal = (listingId: string) => {
    setShowNegoModal((prevValue) => !prevValue);

    const filteredClickedListing = recentListing.find(
      (eachRecentListing) => eachRecentListing.id === listingId
    );

    console.log(
      'handleShowNegoModal > filteredClickedListing > ',
      filteredClickedListing
    );

    setClickedRecentListing(filteredClickedListing);

    // dispatch(
    //   getNegotiationByIdActions.request({ negotiationRequestId: listingId })
    // );
  };

  const handleNegoModalToggle = () => {
    setShowNegoModal((prevValue) => !prevValue);
  };

  const getBoxes = () => {
    dispatch(
      getListingBoxesActions.request({
        listingId: clickedRecentListing?.id || '',
        weight: negotiationWeight,
      })
    );
  };

  const handleSelectedBoxesWeight = (boxes: Box[], boxesIndex: number) => {
    setSelectedBoxesIndex(boxesIndex);
    setSelectedBoxesWeight(boxes);
  };

  const cutOffDate = moment(dateEnds)
    .subtract(1, 'day')
    .endOf('day')
    .subtract(2, 'hours');

  const isBeyondCutoff =
    clickedRecentListing?.isPreAuctionSale && dateEnds
      ? moment() > cutOffDate
        ? true
        : false
      : false;

  const groupedBox =
    previousWeightRequest?.listingId === clickedRecentListing?.id
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
                cost: negotiationPrice * totalWeight,
                quantity: 1,
                boxes: [...accum.boxes, current],
                unit: clickedRecentListing?.measurementUnit || '',
              };
            },
            {
              id: '',
              totalWeight: 0,
              cost: 0,
              quantity: 1,
              boxes: [],
              unit: clickedRecentListing?.measurementUnit || '',
            }
          );
        })
      : [];

  useEffect(() => {
    if (clickedRecentListing?.id) {
      getBoxes();
    }
    // eslint-disable-next-line
  }, [weight, negotiationWeight]);

  useEffect(() => {
    if (company) {
      dispatch(getMarketInterestsActions.request({ companyId: company.id }));
    }
  }, [company]);

  // MARK:- Methods
  const getCreditState = (): CreditState => {
    if (Number(currentCompany?.credit || 0) === 0) {
      return 'empty';
    }

    if (Number(currentCompany?.credit || 0) < 250) {
      return 'lessThan';
    }

    if (currentCompany?.debtFinancing && !currentCompany.isApproved) {
      return 'pending';
    }

    return 'normal';
  };

  // MARK:- Effects
  useEffect(() => {
    if (company) {
      setCurrentCompany(company);
    }
  }, [company]);

  useEffect(() => {
    const box = pathOr([] as Box[], ['0', 'boxes'], groupedBox);

    if (box.length > 0) {
      setSelectedBoxesWeight(box);
      setSelectedBoxesIndex(0);
    }
  }, [getListingBoxesResponse, negotiationWeight]);

  useEffect(() => {
    if (!isCreateNegotiationPending && negotiationPrice) {
      setShowSuccessfulNegoModal(true);
      setShowNegoModal(false);
    }
  }, [isCreateNegotiationPending]);

  // MARK:- Bottom Variables
  const creditBalance = currentCompany?.credit || '0';
  const creditState: CreditState = getCreditState();
  const currentMarketSector = marketSector ? marketSector : '';
  const isApprovedCompany = companyPlan?.isApprovedCompany || false;

  const productDetailsCard6Props: ProductDetailsCard6Props = {
    price: price.toFixed(2),
    minOrder: clickedRecentListing?.minimumOrder || '0',
    avgBoxSize: (clickedRecentListing?.average || 0).toFixed(2),
    dateEnds,
    catchDate: clickedRecentListing?.caught
      ? moment(clickedRecentListing.caught, 'YYYY-MM-DD').toDate()
      : undefined,
    catchRecurrence: clickedRecentListing?.catchRecurrence || undefined,
    unit: clickedRecentListing?.measurementUnit || undefined,
    hiddenPrice: isPendingAccount,
    templateDeliveryDate:
      clickedRecentListing?.templateDeliveryDate?.toString() || '',
    size: sizeToString(
      clickedRecentListing?.size.unit || '',
      clickedRecentListing?.size.from,
      clickedRecentListing?.size.to
    ),
    sizingOptions: !clickedRecentListing?.activeSizeUnit
      ? []
      : clickedRecentListing?.activeSizeUnit === 'GM'
      ? clickedRecentListing?.gmSizingOptions
      : clickedRecentListing?.cmSizingOptions,
    activeSizeUnit: clickedRecentListing?.activeSizeUnit === 'GM' ? 'g' : 'cm',
    isPreAuction: clickedRecentListing?.isPreAuctionSale,
    auctionDate: clickedRecentListing?.auctionDate || '',
    handleNegoModalShow: () => {
      console.log('handleNegoModalShow');
    },
    allowNegotiations: clickedRecentListing?.allowNegotiations || false,
    handleShowNegoCreditsModal,
    negotiationCredit,
  };

  const generatedProps: HomeGeneratedProps = {
    isPendingAccount,
    // Credit Data
    loading,
    featured,
    creditState,
    creditBalance,
    // Carousel Data
    recentlyAdded: recentListing,
    categories,
    favourites: favouriteListing,
    favouriteSellers,
    sellers,
    loadingHomePage,
    companyPlan,
    currentMarketSector,
    isApprovedCompany,
    canNegotiate,
    negotiationCredit,
    showNegoCreditsModal,
    handleShowNegoCreditsModal,
    handleShowNegoModal,
    showNegoModal,
    clickedRecentListing,
    handleNegoModalToggle,
    negotiationPrice,
    handleNegotiationPriceSetting,
    handleNegoModalBtnClick,
    handleDesiredQuantityChange,
    handleSelectedBoxesWeight,
    selectedBoxesWeight,
    productDetailsCard6Props,
    negotiationWeight,
    unit: clickedRecentListing?.measurementUnit || undefined,
    isBeyondCutoff,
    groupedBox,
    isLoadingListingBoxes,
    selectedBoxesIndex,
    isCreateNegotiationPending,
    showSuccessfulNegoModal,
    handleSuccessfulNegoModalToggle,
  };

  return isOld ? (
    <HomeViewOld {...generatedProps} />
  ) : (
    <HomeView {...generatedProps} />
  );
};

export default Home;
