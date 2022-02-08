import { Dispatch } from 'react';

import { ScanHistoryItem } from 'types/store/GetSellerOrdersState';

import { GroupedOrderItemData, RequestFilters } from '../Orders.props';

export interface GroupedOrderItemsProps {
  groupedData: GroupedOrderItemData[];
  token: string;
  groupedCount: number;
  filter: RequestFilters;
  updateFilter: Dispatch<Partial<RequestFilters>>;
  onOrderClick?: (d: string) => void;
  onRateClick?: (d: string) => void;
  updateScanHistoryModal?: React.Dispatch<
    Partial<{
      isOpen: boolean;
      scanHistoryItems: ScanHistoryItem[];
    }>
  >;
}
