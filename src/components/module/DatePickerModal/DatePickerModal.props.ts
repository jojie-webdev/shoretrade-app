import { ModalProps } from 'components/layout/Modal/Modal.props';
import { FocusedInputShape } from 'react-dates';

export interface DatePickerModalProps extends ModalProps {
  startDate: moment.Moment;
  endDate: moment.Moment;
  focusedInput: FocusedInputShape;
  onFocusChange: (arg: 'startDate' | 'endDate' | null) => void;
  onDateChange: (arg: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => void;
  onClickApply: () => void;
}
