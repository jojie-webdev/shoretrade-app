import React, { useEffect, useState } from 'react';

import TermsAndCondition from 'components/module/TermsAndCondition';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import moment from 'moment';
import qs from 'qs';
import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getLocation,
  getRespectiveValues,
  getSize,
  getSpecs,
  getType,
  requestToModalFilter,
} from 'routes/Seller/MarketBoard/Landing/Landing.transform';
import {
  getActiveOffersActions,
  getAllMarketRequestActions,
  getAllMarketRequestFiltersActions,
  getMarketInterestsActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { Store } from 'types/store/Store';
import useLocalStorage from 'utils/Hooks/useLocalStorage';

import { TabOptions } from './Landing.props';
import MarketBoardLandingView from './Landing.view';

const MarketBoardLanding = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeOffersData, setActiveOffersData] = useState<
    GetActiveOffersRequestResponseItem[]
  >([]);
  const [activeOffersDataCopy, setActiveOffersDataCopy] = useState<
    GetActiveOffersRequestResponseItem[]
  >([]);

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const userPending =
    user !== undefined &&
    !(user.companies || []).some((a) =>
      a.addresses.some((b) => b.approved === 'APPROVED')
    );

  const location: { state?: { currentTab?: string } } = useLocation();
  const locationTab = location.state?.currentTab || 'My Active Offers';

  const currentCompany = GetDefaultCompany();
  const companyId = currentCompany?.id || '';

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );
  const activeOffers = useSelector((store: Store) => store.getActiveOffers);
  const filteredActiveOffers = (
    activeOffers.data?.data.marketOffers || []
  ).filter((d) => moment().diff(moment(d.marketRequest.createdAt), 'days') < 7);
  const buyerRequestsFilters = useSelector(
    (store: Store) => store.getAllMarketRequestFilters.data?.data
  );
  const marketRequests = buyerRequests.data?.data.marketRequests || [];

  const selling =
    useSelector(
      (store: Store) => store.getMarketInterests.data?.data.selling
    ) || [];
  const sellingNames = selling.map((s) => s.name);

  const currentMoment = moment();
  const marketRequestsData = marketRequests.reduce(
    (
      accum: {
        interests: GetAllMarketRequestResponseItem[];
        others: GetAllMarketRequestResponseItem[];
      },
      current: GetAllMarketRequestResponseItem
    ) => {
      if (
        !isEmpty(current.specifications) &&
        currentMoment.diff(moment(current.createdAt), 'days') < 7
      ) {
        if (sellingNames.includes(current.type)) {
          return {
            ...accum,
            interests: [...accum.interests, current],
          };
        } else {
          return {
            ...accum,
            others: [...accum.others, current],
          };
        }
      }

      return accum;
    },
    {
      interests: [],
      others: [],
    }
  );

  const { filters, checkboxFilters } = requestToModalFilter(
    buyerRequestsFilters
  );

  const [currentTab, setCurrentTab] = useState<TabOptions>(
    locationTab as TabOptions
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [initial, setInitial] = useState(true);

  //filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [buyerRequestFilter, setBuyerRequestFilter] = useState<
    { label: string; value: string }[]
  >([]);

  const [isAcceptClicked, setIsAcceptClicked] = useLocalStorage(
    'isTermsAndConAccepted',
    false
  );
  const onChangeCurrentTab = (newTab: TabOptions) => setCurrentTab(newTab);

  useEffect(() => {
    // if (currentTab === 'Buyer Requests') {
    //   dispatch(getAllMarketRequestActions.request({}));
    // } else {
    //   dispatch(getActiveOffersActions.request({}));
    // }

    dispatch(getAllMarketRequestActions.request({}));
    dispatch(getActiveOffersActions.request({}));

    setActiveOffersData(filteredActiveOffers);
    setActiveOffersDataCopy(filteredActiveOffers);

    setInitial(false);
    setSearchTerm('');
    setIsFilterModalOpen(false);
  }, [currentTab]);

  useEffect(() => {
    setActiveOffersData(filteredActiveOffers);
    setActiveOffersDataCopy(filteredActiveOffers);
  }, [filteredActiveOffers.length]);

  useEffect(() => {
    if (companyId) {
      dispatch(getAllMarketRequestFiltersActions.request({ companyId }));
      dispatch(
        getMarketInterestsActions.request({
          companyId,
        })
      );
    }
  }, [companyId]);

  useEffect(() => {
    if (initial) return;

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const finalSearchTerm = () => {
      return {
        term: searchTerm.length > 2 ? searchTerm : '',
      };
    };

    const timerId = setTimeout(() => {
      dispatch(
        getAllMarketRequestActions.request({
          queryParams: qs.stringify(finalSearchTerm()),
        })
      );

      const filteredActiveOffers = activeOffersData?.filter((activeOffer) =>
        activeOffer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setActiveOffersDataCopy(filteredActiveOffers);
    }, 800);

    setTimer(timerId);
  }, [searchTerm]);

  const onClickOffer = (data: GetAllMarketRequestResponseItem) => {
    history.push(SELLER_MARKET_BOARD_ROUTES.OFFER, {
      buyerRequest: data,
    });
  };

  const onClickActiveOffer = (data: GetActiveOffersRequestResponseItem) => {
    history.push(SELLER_MARKET_BOARD_ROUTES.NEGOTIATE, {
      activeOffer: data,
    });
  };

  const onClickFilterButton = () => {
    setIsFilterModalOpen((prevState) => !prevState);
  };

  const onApply = () => {
    setIsFilterModalOpen(false);

    const sizesFilter = getSize(selectedFilters, buyerRequestsFilters!);
    const actualSizesFilter = sizesFilter
      ? sizesFilter?.filter((v) => v !== 'Ungraded')
      : undefined;
    const isUngraded = (sizesFilter || []).includes('Ungraded');
    const payload = {
      address: getRespectiveValues(
        'Location',
        buyerRequestFilter,
        buyerRequestsFilters!
      ),
      sizes: isUngraded
        ? undefined
        : getRespectiveValues(
            'Size',
            buyerRequestFilter,
            buyerRequestsFilters!
          ),
      typeId: getRespectiveValues(
        'Type',
        buyerRequestFilter,
        buyerRequestsFilters!
      ),
      specifications: getRespectiveValues(
        'Specs',
        buyerRequestFilter,
        buyerRequestsFilters!
      ),
      ungraded: isUngraded ? true : undefined,
    };

    dispatch(
      getAllMarketRequestActions.request({
        queryParams: qs.stringify(payload),
      })
    );
  };

  const onReset = () => {
    setSelectedFilters([]);
    setSelectedSize(null);
    setBuyerRequestFilter([]);
  };

  const generatedProps = {
    marketRequests,
    sellingRequests: marketRequestsData.interests,
    buyerRequests: marketRequestsData.others,
    activeOffers: activeOffersDataCopy,
    isLoading: buyerRequests.pending || activeOffers.pending || false,
    currentTab,
    onChangeCurrentTab,
    searchTerm,
    setSearchTerm,
    onClickOffer,
    onClickActiveOffer,
    onClickFilterButton,

    filterModalProps: {
      isOpen: isFilterModalOpen,
      filters,
      checkboxFilters,
      selectedFilters,
      setSelectedFilters,
      selectedSize,
      setSelectedSize,
      onApply,
      onReset,
      onClickClose: () => setIsFilterModalOpen(false),
      setBuyerRequestFilter,
      buyerRequestFilter,
    },
    userPending,
  };

  if (!isAcceptClicked) {
    return (
      <TermsAndCondition
        appType="seller"
        textWeb1=""
        textWeb2="Browse Buyer Requests"
        textMobile1="Browse Buyer Requests"
        textMobile2=""
        textMobile3=""
        cardText1={
          'View the products Buyers have requested and make offers directly to them.'
        }
        cardText2={
          'Negotiate and accept offers before the Buyer Request closes 7 days after creation or once the quantity requested has been filled.'
        }
        cardText3={
          'Organise shipping for all finalised Buyer Requests. Keep in mind that a Buyer Request is not finalised until the Buyer has processed the payment. Turn on your notifications to ensure you stay up to date.'
        }
        isAcceptClicked={isAcceptClicked}
        setIsAcceptClicked={setIsAcceptClicked}
      />
    );
  }

  return <MarketBoardLandingView {...generatedProps} />;
};

export default MarketBoardLanding;
