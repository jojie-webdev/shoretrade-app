export type GetNSWHolidaysResponseItem = {
  id: number;
  holiday: string;
  holiday_date: string;
};

export type GetNSWHolidaysPayload = {
  sql: string;
  records: GetNSWHolidaysResponseItem[];
  fields: any[];
};
