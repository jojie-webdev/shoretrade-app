import React, { useEffect, useState } from 'react';

import { BUYER_ROUTES } from 'consts';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Store } from 'types/store/Store';

import { CreateRequestGeneratedProps } from './Create.props';
import CreateRequestLandingView from './Create.view';

const CreateRequest = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const history = useHistory();

  const [termsAgreement, setTermsAgreement] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    id: '',
    name: '',
  });

  const onClickItem = (row: any) => {
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(row.id), {
      type: row.type,
      image: row.image,
      status: row.status,
      offersTotal: row.offers,
      expiry: row.expiry,
      id: row.id,
    });
  };

  const onBack = () => {
    setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    setCurrentStep(2);
  }, [selectedCategory]);

  const generatedProps: CreateRequestGeneratedProps = {
    termsAgreement,
    onBack,
    step: {
      total: 5,
      current: currentStep,
    },
    categories: [
      { id: '001', name: 'Baby Octopus' },
      { id: '002', name: 'Maori Octopus' },
      { id: '003', name: 'Octopus Hands' },
      { id: '004', name: 'Octopus Legs' },
    ],
    setStep: setCurrentStep,
    setTermsAgreement,
    searchTerm: categorySearchTerm,
    setSearchTerm: setCategorySearchTerm,
    selectedCategory,
    setSelectedCategory,
  };

  return <CreateRequestLandingView {...generatedProps} />;
};

export default CreateRequest;
