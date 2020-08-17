import React, { useState } from 'react';

import { MOCK_SOLD, SoldGeneratedProps, TabOptions } from './Sold.props';
import SoldView from './Sold.view';

// START: For TESTING only
const MOCK_DATA: MOCK_SOLD[] = [
  { type: 'Air', cutoffTime: '7:00am' },
  { type: 'Air', cutoffTime: '8:00am' },
  { type: 'Road', cutoffTime: '9:00am' },
  { type: 'Road', cutoffTime: '10:00am' },
  { type: 'Road', cutoffTime: '11:00am' },
];
// END: For TESTING only

const Sold = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState<TabOptions>('To Ship');
  const onChangeCurrentTab = (newTab: TabOptions) => setCurrentTab(newTab);
  // START: For TESTING only
  const [soldData, setSoldData] = useState<MOCK_SOLD[]>(MOCK_DATA);
  const toggleSoldData = () => setSoldData(MOCK_DATA);
  // END: For TESTING only

  const generatedProps: SoldGeneratedProps = {
    // generated props here
    toggleSoldData,
    soldData,
    currentTab,
    onChangeCurrentTab,
  };
  return <SoldView {...generatedProps} />;
};

export default Sold;
