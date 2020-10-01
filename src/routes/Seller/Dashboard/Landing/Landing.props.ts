import { Dispatch, SetStateAction } from 'react';

type RangeObject = {
  id: string;
  dateString: string;
  year: number;
  month: number;
  day: number;
};

export type onApply = {
  start: moment.Moment;
  end: moment.Moment;
};

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
  toCategories: Record<string, unknown>;
  toCategoryDetails: (id: string, title: string) => Record<string, unknown>;
  dateRange: {
    end: RangeObject;
    start: RangeObject;
  };
  setDateRange: SetStateAction<
    Dispatch<{ end: RangeObject; start: RangeObject }>
  >;
  onApplyCustom: ({ start, end }: onApply) => void;
}
