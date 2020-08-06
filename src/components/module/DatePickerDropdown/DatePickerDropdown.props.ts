import { FocusedInputShape } from 'react-dates';

export interface DatePickerDropdownProps {
  startDate: moment.Moment;
  endDate: moment.Moment;
  focusedInput: FocusedInputShape;
  onFocusChange: (arg: 'startDate' | 'endDate' | null) => void;
  onDateChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
}
