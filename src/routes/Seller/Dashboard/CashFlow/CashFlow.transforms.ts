import moment from 'moment';

import { SalesData } from '../Landing/Landing.props';

export const salesDataToCashFlowGraph = (
  salesData: SalesData,
  mode: 'PAID' | 'PENDING',
  date: string // FY or MM-DD-YYYY
): { values: number[]; dates: string[] } => {
  if (date === 'FY') {
    return salesData.graph.reduce(
      (accum: { values: number[]; dates: string[] }, current) => {
        return {
          values: [
            ...accum.values,
            mode === 'PAID' ? current.paid : current.pending,
          ],
          dates: [...accum.dates, current.date],
        };
      },
      {
        values: [],
        dates: [],
      }
    );
  }

  if (moment(date, 'MM-DD-YYYY').isValid()) {
    return salesData.graph.reduce(
      (accum: { values: number[]; dates: string[] }, current) => {
        const targetMoment = moment(date, 'MM-DD-YYYY');
        if (moment(current.date).isSame(targetMoment, 'month')) {
          return {
            values: [
              ...accum.values,
              mode === 'PAID' ? current.paid : current.pending,
            ],
            dates: [...accum.dates, current.date],
          };
        }
        return accum;
      },
      {
        values: [],
        dates: [],
      }
    );
  }

  return {
    values: [],
    dates: [],
  };
};
