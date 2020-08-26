export interface PendingItem {
  id: string;
  name: string;
  shipping: string;
  uri: string;
  price: string;
  weightConfirmed: boolean;
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
}

export interface ConfirmListProps
  extends ConfirmListPublicProps,
    ConfirmListGeneratedProps {}
