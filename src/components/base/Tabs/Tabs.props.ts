export interface TabsProps {
  tabs: string[];
  selectedTab: string;
  onClickTab: (tab: string) => void;
  customTabContent?: string[] | number[];
}
