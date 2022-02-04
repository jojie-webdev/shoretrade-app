import { ScanHistoryItem } from 'types/store/GetSellerOrdersState';

import { DialogModalProps } from '../DialogModal/DialogModal.props';

export interface ScanHistoryModalProps extends DialogModalProps {
  updateScanHistoryModal?: React.Dispatch<
    Partial<{
      isOpen: boolean;
      scanHistoryItems: ScanHistoryItem[];
    }>
  >;
  scanHistoryItems: ScanHistoryItem[];
}
