import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import moment from 'moment';

import { ShippingDateModalProps } from './ShippingDateModal.props';
import { Content } from './ShippingDateModal.style';

const getTitleAndDescription = (key: string) => {
  return (
    {
      airPickupOrders: {
        title: 'Drop-off Date',
        desc:
          'Please confirm the date this order will be dropped off to Airport',
      },
      airDeliveryOrders: {
        title: 'Shipment Date',
        desc:
          'Please confirm the date this order will be dropped off to Airport',
      },
      roadPickupOrders: {
        title: 'Arrival Date',
        desc:
          'Please confirm the date that this order will arrive at the depot',
      },
      roadDeliveryOrders: {
        title: 'Arrival Date',
        desc:
          'Please confirm the date that this order will arrive at the depot',
      },
      selfPickupOrders: {
        title: 'Collection Date',
        desc: 'Please confirm the date this order will be ready for collection',
      },
      selfDeliveryOrder: {
        title: 'Delivery Date',
        desc: 'Please confirm the date this order will be delivered',
      },
    }[key] || { title: '', desc: '' }
  );
};

const ShippingDateModal = (props: ShippingDateModalProps): JSX.Element => {
  const { children, onConfirm, loading, shippingMethod, ...modalProps } = props;

  const [showError, setShowError] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const { title, desc } = getTitleAndDescription(shippingMethod);

  useEffect(() => {
    if (modalProps.isOpen) {
      setDeliveryDate(null);
    }
  }, [modalProps.isOpen]);

  return (
    <Modal {...modalProps} style={{ borderRadius: '12px', width: '686px' }}>
      <Content>
        <Typography
          color="noshade"
          variant="title5"
          style={{ fontFamily: 'Media Sans', marginBottom: '24px' }}
        >
          {title || 'Shipping Date'}
        </Typography>

        <Typography color="shade7" variant="body">
          {desc || 'Please, select a date that this will arrive at the depot'}
        </Typography>

        <div className="content-container">
          <DatePickerDropdown
            placeholder=""
            date={deliveryDate ? moment(deliveryDate) : null}
            onDateChange={(d) => setDeliveryDate(d?.toDate() || null)}
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
              if (!deliveryDate) {
                setShowError(true);
              } else {
                onConfirm(deliveryDate.toISOString());
              }
            }}
          />
        </div>
      </Content>
    </Modal>
  );
};

export default ShippingDateModal;
