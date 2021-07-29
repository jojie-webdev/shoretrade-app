import { Dispatch, SetStateAction } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';

export interface NotificationsGeneratedProps {
  tabItems: TabItem[];
  setActiveTab: Dispatch<SetStateAction<number>>;
  activeTab: number;
}
