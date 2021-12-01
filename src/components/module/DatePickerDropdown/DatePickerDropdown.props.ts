import React from 'react';

import { FocusedInputShape } from 'react-dates';

export interface DatePickerDropdownProps {
  date: moment.Moment | null;
  onDateChange: (date: moment.Moment | null) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  isOutsideRange?: (date: any) => boolean;
  showCalendarIcon?: boolean;
  showArrowDownIcon?: boolean;
  height?: string;
  borderRadius?: string;
  topComponent?: React.ReactNode;
}
