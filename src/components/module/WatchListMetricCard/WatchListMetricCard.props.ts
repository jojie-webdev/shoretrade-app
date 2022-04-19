export interface WatchListMetricCardProps {
  title: string;
  items: WatchListMetricItem[];
  selected?: boolean;
}

export type WatchListMetricItem = {
  label: string;
  subLabel?: string;
  value: string;
  trend: 'high' | 'low' | 'flat';
};
