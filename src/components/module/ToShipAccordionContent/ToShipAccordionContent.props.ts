export interface ToShipAccordionContentProps {
  items: {
    orderNumber: string;
    buyer: string;
    uri?: string;
    price: string;
    weight: string;
    name: string;
    tags: { label: string }[];
    size: string;
  }[];
  onPress: () => void;
  onDownloadInvoice: () => void;
}
