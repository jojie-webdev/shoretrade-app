export interface TabProps {
  active: number;
  items: TabItem[];
  handleSelect: (i: number) => void;
}

export type TabItem = {
  key: number;
  title: string;
};
