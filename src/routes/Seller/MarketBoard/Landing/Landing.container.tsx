import React, { useState } from 'react';

import { TabOptions } from './Landing.props';
import MarketBoardLandingView from './Landing.view';

const MarketBoardLanding = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<TabOptions>('Buyer Requests');
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeCurrentTab = (newTab: TabOptions) => setCurrentTab(newTab);

  const generatedProps = {
    currentTab,
    onChangeCurrentTab,
    searchTerm,
    setSearchTerm,
  };
  return <MarketBoardLandingView {...generatedProps} />;
};

export default MarketBoardLanding;
