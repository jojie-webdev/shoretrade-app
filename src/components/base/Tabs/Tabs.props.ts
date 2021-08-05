export interface TabsProps {
  tabs: string[];
  selectedTab: string;
  onClickTab: (tab: string) => void;
}
