import { Variants as LabelVariant } from 'components/base/Typography/Typography.props';
import moment from 'moment';
import { DisabledShape, FocusedInputShape } from 'react-dates';

type Format = 'dddd D MMMM YYYY' | 'D MMM YYYY' | 'DD / MM / YYYY';
type Variants = 'success' | 'disabled' | 'error';

type Size = 'sm' | 'md';

export interface DateRangePickerProps {
  className?: string;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  onDatesChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  focusedInput?: FocusedInputShape;
  onFocusChange?: (arg: FocusedInputShape | null) => void;
  placeholder?: string;
  label?: string;
  labelVariant?: LabelVariant;
  format: Format;
  error?: boolean;
  success?: boolean;
  variant?: Variants;
  errorMessage?: string;
  disabled?: boolean;
  pickerRadius?: string;
  // size: string;
}
