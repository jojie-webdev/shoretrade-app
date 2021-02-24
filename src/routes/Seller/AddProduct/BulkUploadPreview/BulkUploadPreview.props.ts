import { UploadBulkState } from 'types/store/UploadBulkState';

export interface BulkUploadPreviewGeneratedProps {
  data: UploadBulkState[];
  onUploadCSV: (csv: File) => void;
  onSubmit: (shippingAddress: string) => void;
  isUploadingCSV: boolean;
  isSubmitting: boolean;
  shippingAddressOptions: {
    label: string;
    value: string;
  }[];
  errorMessage: string;
}
