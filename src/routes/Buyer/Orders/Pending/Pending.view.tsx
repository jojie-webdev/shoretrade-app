import React from 'react';

// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography';
import { toPrice } from 'utils/String/toPrice';

import { OrderItem, OrdersGeneratedProps } from '../Orders.props';
import {
  ItemContainer,
  ItemDetail,
  RightContent,
  StyledAccordion,
  Tag,
} from './Pending.style';
import { groupByDate, sortByDateAsc } from './Pending.transform';

const PendingItems = (props: OrderItem) => {
  return (
    <>
      <ItemContainer>
        <div className="section wrap-content">
          <ItemDetail type="left">
            <Typography color="shade7" variant="caption">
              Seller
            </Typography>
            <Typography color="shade9">{props.data.seller}</Typography>
          </ItemDetail>

          {/* <RightContent> */}
          <ItemDetail type="center">
            <Typography color="shade7" variant="caption">
              Download
            </Typography>
            <Typography color="shade9">Missing</Typography>
          </ItemDetail>

          <ItemDetail type="right">
            <Typography color="shade7" variant="caption">
              Seller
            </Typography>
            <Typography color="shade9">{props.data.seller}</Typography>
          </ItemDetail>
          {/* </RightContent> */}
        </div>

        <div className="section item">
          {props.data.detailsProps.map((d, ndx) => (
            <div
              key={d.name + d.weight + ndx}
              className="item-detail-container"
            >
              <ItemDetail type="left" row style={{ flex: 1 }}>
                <img src={d.uri} alt="Product" />

                <div>
                  <Typography color="shade9">{d.name}</Typography>

                  <div className="tags">
                    {d.tags.map((tag) => (
                      <Tag key={tag.label}>
                        <Typography variant="caption">{tag.label}</Typography>
                      </Tag>
                    ))}
                  </div>
                </div>
              </ItemDetail>

              <RightContent>
                <ItemDetail type="left">
                  <Typography color="shade7" variant="caption">
                    Location
                  </Typography>
                  <Typography color="shade9">{d.location}</Typography>
                </ItemDetail>

                <ItemDetail type="center">
                  <Typography color="shade7" variant="caption">
                    Weight
                  </Typography>
                  <Typography color="shade9">
                    {d.weight} {d.unit}
                  </Typography>
                </ItemDetail>

                <ItemDetail type="right">
                  <Typography color="shade7" variant="caption">
                    Subtotal
                  </Typography>
                  <Typography color="shade9">{toPrice(d.price)}</Typography>
                </ItemDetail>
              </RightContent>
            </div>
          ))}
        </div>

        <div className="section">
          <ItemDetail type="center" row>
            <Typography
              color="shade7"
              variant="label"
              style={{ marginRight: '4px' }}
            >
              {props.data.shippingOption} +
            </Typography>
            <Typography color="shade9" variant="label" weight="bold">
              {toPrice(props.data.shippingChargeGst)}
            </Typography>
          </ItemDetail>

          <ItemDetail type="right" row>
            <Typography
              color="shade7"
              variant="label"
              style={{ marginRight: '6px' }}
            >
              Total
            </Typography>
            <Typography color="shade9" variant="title5" weight="bold">
              {toPrice(props.data.shippingPrice)}
            </Typography>
          </ItemDetail>
        </div>

        <div className="section wrap-content">
          <div className="delivery-section">
            <ItemDetail type="left" className="shipping-from">
              <Typography color="shade7" variant="caption">
                Shipping From
              </Typography>
              <Typography color="shade9">{props.data.shippingFrom}</Typography>
            </ItemDetail>

            <ItemDetail type="left" className="wrap-text">
              <Typography color="shade7" variant="caption">
                Delivery Address
              </Typography>
              <Typography color="shade9">{props.data.shippingTo}</Typography>
            </ItemDetail>
          </div>

          <ItemDetail type="right">
            <Typography color="shade7" variant="caption">
              Order No.
            </Typography>
            <Typography color="shade9">{props.data.orderNumber}</Typography>
          </ItemDetail>
        </div>
      </ItemContainer>
    </>
  );
};

const Pending = (props: OrdersGeneratedProps) => {
  // const theme = useTheme();

  const { pendingOrders } = props;

  const data = groupByDate(sortByDateAsc(pendingOrders));

  return (
    <>
      {Object.keys(data).map((key) => (
        <StyledAccordion
          key={key}
          title={key}
          padding="24px"
          marginBottom="16px"
        >
          {data[key].map((d) => (
            <PendingItems {...d} key={d.id} />
          ))}
        </StyledAccordion>
      ))}
    </>
  );
};

export default Pending;
