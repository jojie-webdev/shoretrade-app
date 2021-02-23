import React, { useState } from 'react';

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

  const generatedProps: CreateRequestGeneratedProps = {
    termsAgreement,
    step: {
      total: 5,
      current: currentStep,
    },
    setStep: setCurrentStep,
    setTermsAgreement,
  };

  return <CreateRequestLandingView {...generatedProps} />;
};

export default CreateRequest;
