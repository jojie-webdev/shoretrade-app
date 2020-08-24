import React, { useState } from 'react';

import { Crab, Fish, Oysters, Octopus } from 'components/base/SVG';
import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { useDispatch } from 'react-redux';

import { OnboardingGeneratedProps, Data } from './Onboarding.props';
import OnboardingView from './Onboarding.view';

const DATA: Data[] = [
  {
    Svg: Crab,
    title: 'Welcome to ShoreTrade.',
    description:
      'Etiam egestas at viverra id est orci id ut pharetra. Vulputate nibh eros vel dolor, id diam nisi, adipiscing quam. Adipiscing.',
  },
  {
    Svg: Fish,
    title: 'Add your products in the App.',
    description:
      'Etiam egestas at viverra id est orci id ut pharetra. Vulputate nibh eros vel dolor, id diam nisi, adipiscing quam. Adipiscing.',
  },
  {
    Svg: Oysters,
    title: 'Get Insights and Analytics.',
    description:
      'Etiam egestas at viverra id est orci id ut pharetra. Vulputate nibh eros vel dolor, id diam nisi, adipiscing quam. Adipiscing.',
  },
  {
    Svg: Octopus,
    title: 'Sell your products and get paid.',
    description:
      'Etiam egestas at viverra id est orci id ut pharetra. Vulputate nibh eros vel dolor, id diam nisi, adipiscing quam. Adipiscing.',
  },
];

const Onboarding = (): JSX.Element => {
  // MARK:- State / Store
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(0);

  // MARK:- Methods
  const onClickNext = () => {
    if (currentPage !== DATA.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      dispatch(push(SELLER_ROUTES.LOGIN));
    }
  };

  const onClickSkip = () => {
    dispatch(push(SELLER_ROUTES.LOGIN));
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
