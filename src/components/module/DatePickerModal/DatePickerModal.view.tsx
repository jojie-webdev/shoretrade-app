import React from 'react';

// import { useTheme } from 'utils/Theme';
import Modal from 'components/layout/Modal';

import { DatePickerModalProps } from './DatePickerModal.props';
import { Container } from './DatePickerModal.style';

const DatePickerModal = (props: DatePickerModalProps): JSX.Element => {
  // const theme = useTheme();

  const { ...modalProps } = props;

  return (
    <Modal {...modalProps}>
      <h1>Datepicker</h1>
    </Modal>
  );
};

export default DatePickerModal;
