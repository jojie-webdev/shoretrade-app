import { FocusedInputShape } from 'react-dates';

export interface DatePickerDropdownProps {
  className?: string;
  date: moment.Moment | null;
  onDateChange: (date: moment.Moment | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  isOutsideRange?: (date: any) => boolean;
}
