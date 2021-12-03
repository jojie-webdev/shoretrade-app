import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import TextArea from 'components/base/TextArea';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { useTheme } from 'utils/Theme';

import { ShippingDateModalProps } from './ShippingDateModal.props';
import { Content } from './ShippingDateModal.style';

const ShippingDateModal = (props: ShippingDateModalProps): JSX.Element => {
  const { children, onConfirm, loading, ...modalProps } = props;
  const theme = useTheme();
  const buyerApp = theme.appType === 'buyer';

  const [showError, setShowError] = useState(false);
  const [shippingDate, setShippingDate] = useState<Date | null>(null);

  return (
    <Modal {...modalProps} style={{ borderRadius: '12px', width: '686px' }}>
      <Content>
        <Typography
          color="noshade"
          variant="title5"
          style={{ fontFamily: 'Media Sans', marginBottom: '24px' }}
        >
          Shipping Date
        </Typography>

        <Typography color="shade7" variant="body">
          Please, select a date that this will arrive at the depot
        </Typography>

        <div className="content-container">
          <DatePickerDropdown
            placeholder=""
            date={shippingDate ? moment(shippingDate) : null}
            onDateChange={(d) => setShippingDate(d?.toDate() || null)}
            error={showError ? 'Please enter a shipping date' : undefined}
            showCalendarIcon={true}
            showArrowDownIcon={true}
          />
        </div>
        <div className="actions-container">
          <Button
            variant="primary"
            text={'Confirm'}
            loading={loading}
            onClick={() => {
              if (!shippingDate) {
                setShowError(true);
              } else {
                onConfirm(shippingDate.toISOString());
              }
            }}
          />
        </div>
      </Content>
    </Modal>
  );
};

export default ShippingDateModal;
