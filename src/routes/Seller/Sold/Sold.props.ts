export interface SoldGeneratedProps {
  toggleSoldData: () => void;
  soldData: MOCK_SOLD[];
  currentTab: TabOptions;
  onChangeCurrentTab: (newTab: TabOptions) => void;
}

export type MOCK_SOLD = {
  type: 'Air' | 'Road';
  cutoffTime: string;
};

export type TabOptions = 'To Ship' | 'In Transit' | 'Delivered';
