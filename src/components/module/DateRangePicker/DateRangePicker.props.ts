import { Variants as LabelVariant } from 'components/base/Typography/Typography.props';
import moment from 'moment';

type Format = 'dddd D MMMM YYYY' | 'D MMM YYYY' | 'DD / MM / YYYY';

export interface DateRangePickerProps {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  onDatesChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  placeholder?: string;
  label?: string;
  labelVariant?: LabelVariant;
  format: Format;
  disabled?: boolean;
  onClear: () => void;
  background?: string;
  border?: string;
}
