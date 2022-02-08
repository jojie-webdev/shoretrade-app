import { HTMLAttributes } from 'react';

import { ScanHistoryItem } from 'types/store/GetSellerOrdersState';

export interface ScanHistoryButtonProps extends HTMLAttributes<HTMLDivElement> {
  scanHistoryItems: ScanHistoryItem[];
  scanData: ScanHistoryItem;
}
