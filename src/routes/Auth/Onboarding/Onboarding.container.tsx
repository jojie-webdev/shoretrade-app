import React, { useState } from 'react';

import { Crab, Fish, Oysters, Octopus } from 'components/base/SVG';
import { push } from 'connected-react-router';
import { SELLER_ROUTES, BUYER_ROUTES } from 'consts';
import { useDispatch } from 'react-redux';
import { useTheme } from 'utils/Theme';

import { BUYER_STEPS, SELLER_STEPS } from './Onboarding.constants';
import { OnboardingGeneratedProps, Data } from './Onboarding.props';
import OnboardingView from './Onboarding.view';

const Onboarding = (): JSX.Element => {
  // MARK:- State / Store
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const DATA: Data[] = isSeller ? SELLER_STEPS : BUYER_STEPS;

  // MARK:- Methods
  const onClickNext = () => {
    if (currentPage !== DATA.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      dispatch(push(isSeller ? SELLER_ROUTES.LOGIN : BUYER_ROUTES.LOGIN));
    }
  };

  const onClickSkip = () => {
    dispatch(push(isSeller ? SELLER_ROUTES.LOGIN : BUYER_ROUTES.LOGIN));
  };

  // MARK:- Render
  const generatedProps: OnboardingGeneratedProps = {
    currentPage,
    onClickNext,
    currentData: DATA[currentPage],

    onClickSkip,
  };

  return <OnboardingView {...generatedProps} />;
};

export default Onboarding;
