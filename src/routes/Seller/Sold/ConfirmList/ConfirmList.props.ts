export interface PendingItem {
  id: string;
  name: string;
  shipping: string;
  uri: string;
  price: string;
  weightConfirmed: boolean;
  onPress: () => void;
  size: string;
  weight: string;
  tags: {
    label: string;
  }[];
}

export interface ConfirmListPublicProps {
  match: {
    params: {
      orderId: string;
    };
  };
}

export interface ConfirmListGeneratedProps {
  title: string;
  items: PendingItem[];
  orderId: string;
  placeOrder: (config: { isPartial: boolean }) => void;
  isPending: boolean;
  buyer: string;
}

export interface ConfirmListProps
  extends ConfirmListPublicProps,
    ConfirmListGeneratedProps {}
