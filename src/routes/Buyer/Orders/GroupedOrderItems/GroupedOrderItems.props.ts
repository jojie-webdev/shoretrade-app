import { Dispatch } from 'react';

import { GroupedOrderItemData, RequestFilters } from '../Orders.props';

export interface GroupedOrderItemsProps {
  groupedData: GroupedOrderItemData[];
  token: string;
  groupedCount: number;
  filter: RequestFilters;
  updateFilter: Dispatch<Partial<RequestFilters>>;
  onOrderClick?: (d: string) => void;
  onRateClick?: (d: string) => void;
}
