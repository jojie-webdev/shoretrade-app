export interface DashboardLandingGeneratedProps {
  isCalendarModalOpen: boolean;
  toggleModal: () => void;
  isLoading: boolean;
  data: {
    categories: any[];
    months: any[];
    paid: string | number;
    pending: string | number;
  };
}
