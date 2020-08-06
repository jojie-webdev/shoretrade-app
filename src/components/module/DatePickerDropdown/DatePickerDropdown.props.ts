import { FocusedInputShape } from 'react-dates';

export interface DatePickerDropdownProps {
  date: moment.Moment;
  onDateChange: (date: moment.Moment | null) => void;
  placeholder?: string;
}
