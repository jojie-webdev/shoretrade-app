import React from 'react';

import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';

import { InTransitItemData } from '../Sold.props';
import { DeliveryItem } from '../Sold.style';

const InTransitItem = (props: InTransitItemData) => {
  const { id, date, amount, buyer, orderRefNumber } = props;
  const deliveryDate = moment(date).format('ddd DD MMM');
  const history = useHistory();
  return (
    <DeliveryItem
      key={id}
      onClick={() =>
        history.push(
          SELLER_SOLD_ROUTES.DETAILS.replace(':orderId', id).replace(
            ':status',
            'TRANSIT'
          )
        )
      }
      iconAlignment="flex-start"
      rightComponent={
        <span className="order-price">
          <Typography variant="title5" weight="900" color="noshade">
            ${amount}
          </Typography>
          <ChevronRight width={16} height={24} />
        </span>
      }
    >
      <div className="content">
        <div className="order-details-top">
          <div>
            <Typography color="shade6" variant="overline">
              Order:
            </Typography>
            <Typography color="primary" weight="900" variant="label">
              {formatOrderReferenceNumber(orderRefNumber)}
            </Typography>
          </div>
          <div>
            <Typography color="shade6" variant="overline">
              Buyer:
            </Typography>
            <Typography color="noshade" weight="900" variant="label">
              {buyer}
            </Typography>
          </div>
        </div>
        <div className="order-details-bottom">
          <Typography
            color="shade6"
            weight="900"
            variant="label"
            className="delivery-date"
          >
            Delivery Date
          </Typography>
          <Typography color="noshade" weight="bold" variant="label">
            {deliveryDate}
          </Typography>
        </div>
      </div>
    </DeliveryItem>
  );
};

export default InTransitItem;
