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

export type SalesData = {
  graph: { date: string; paid: number; pending: number }[];
  total: {
    paid: number;
    pending: number;
  };
  previousMonthTotal: {
    paid: number;
    pending: number;
  };
};

export type MonthlyGraph = {
  graphData: {
    date: string[];
    increase: number[];
  };
  startDate: string;
  percentage: string;
  total: number;
}[];

export type TopCategoriesData = {
  topCategories: {
    id: string;
    name: string;
    total: number;
  }[];
  previousTopCategories: {
    id: string;
    name: string;
    total: number;
  }[];
};

export type TopCategoriesPercentageData = {
  id: string;
  name: string;
  total: number;
  percentageChange: string;
}[];

export interface DashboardLandingGeneratedProps {
  isCalendarModalOpen: boolean;
  toggleModal: () => void;
  isLoading: boolean;
  // data: {
  //   categories: any[];
  //   months: any[];
  //   paid: string | number;
  //   pending: string | number;
  //   monthsPending: any[];
  // };
  toPaidGraph: Record<string, unknown>;
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
  currentNotificationType: string;
  onClickMarketNotification: () => void;
  userPending: boolean;
  salesData: SalesData;
  topCategoriesData: TopCategoriesData;
}
