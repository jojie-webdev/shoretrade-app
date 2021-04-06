import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  getListingFormDataActions,
  getMarketInterestsActions,
  createMarketRequestActions,
  searchProductTypeActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { CreateRequestGeneratedProps } from './Create.props';
import CreateRequestLandingView from './Create.view';
import { SizeOptions } from './SelectSize/SelectSize.props';

const CreateRequest = (): JSX.Element => {
  // MARK:- States / Variables
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [hideSearchResult, setHideSearchResult] = useState(false);
  const [termsAgreement, setTermsAgreement] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecifications, setSelectedSpecifications] = useState<{
    items: any[];
  }>({
    items: [],
  });
  const [selectedQuantity, setSelectedQuantity] = useState({
    from: '',
    to: '',
  });
  const [selectedSize, setSelectedSize] = useState<SizeOptions>({
    from: '',
    to: '',
    items: [''],
  });
  const [sendConfModalisOpen, setSendConfModalisOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    id: '',
    name: '',
  });

  const getUser = useSelector((state: Store) => state.getUser);
  const user = getUser.data?.data.user;
  const currentCompany = GetDefaultCompany();
  const buying =
    useSelector((store: Store) => store.getMarketInterests.data?.data.buying) ||
    [];

  const companyId = currentCompany?.id || '';

  const listingFormData =
    useSelector((state: Store) => state.getListingFormData.data?.data) || null;

  const getFormData = (typeId: string) => {
    dispatch(
      getListingFormDataActions.request({
        typeId,
      })
    );
  };

  const pendingSearch =
    useSelector((state: Store) => state.searchProductType.pending) || false;

  const onSearchCategoryType = (term: string) => {
    dispatch(
      searchProductTypeActions.request({
        term,
      })
    );
  };

  const onBack = () => {
    if (currentStep === 2) {
      setSelectedCategory({ id: '', name: '' });
    }
    setCurrentStep(currentStep - 1);
  };

  const onSubmitRequest = () => {
    dispatch(
      createMarketRequestActions.request({
        typeId: listingFormData?.type.id,
        companyId: companyId,
        buyerId: user?.id,
        addressId: currentCompany?.addresses[0].id,
        stateOptions: selectedSpecifications.items.map((item) => item.value),
        weight: {
          from: Number(selectedQuantity.from),
          to: Number(selectedQuantity.to),
        },
        size: {
          ungraded: false,
          from: selectedSize.from ? selectedSize.from : null,
          to: selectedSize.to ? selectedSize.to : null,
          options: selectedSize.items,
        },
        autoClose: true,
      })
    );
  };

  const typeSearchResults =
    useSelector(
      (state: Store) => state.searchProductType.data?.data.types || []
    ) || [];

  useEffect(() => {
    if (searchTerm.length > 2) {
      if (!hideSearchResult) {
        setHideSearchResult(true);
      }

      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      const timerId = setTimeout(() => {
        setHideSearchResult(false);
        dispatch(
          searchProductTypeActions.request({
            term: searchTerm,
          })
        );
      }, 200);

      setTimer(timerId);
    } else {
      setHideSearchResult(true);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getMarketInterestsActions.request({
          companyId,
        })
      );
    }
  }, [companyId]);

  useEffect(() => {
    if (selectedCategory?.id != '') {
      //reset
      setSelectedSize({ from: '', to: '', items: [] });
      setSelectedSpecifications({ items: [] });
      setSelectedQuantity({ from: '', to: '' });
      getFormData(selectedCategory.id);
    }
  }, [selectedCategory]);

  const generatedProps: CreateRequestGeneratedProps = {
    buying,
    pendingSearch,
    hideSearchResult,
    search: onSearchCategoryType,
    selectedSize,
    sendConfModalisOpen,
    onSubmitRequest,
    typeSearchResults,
    setSendConfModalisOpen,
    listingFormData,
    selectedSpecifications,
    selectedQuantity,
    termsAgreement,
    setSelectedQuantity,
    setSelectedSize,
    setSelectedSpecifications,
    onBack,
    step: {
      total: 5,
      current: currentStep,
    },
    setStep: setCurrentStep,
    setTermsAgreement,
    searchTerm: searchTerm,
    setSearchTerm: setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };

  return <CreateRequestLandingView {...generatedProps} />;
};

export default CreateRequest;
