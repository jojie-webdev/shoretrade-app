import React from 'react';

import { DownloadFile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { API } from 'consts';
import { parseImageUrl } from 'utils/parseImageURL';
import { toPrice } from 'utils/String/toPrice';

// import { useTheme } from 'utils/Theme';
import { OrderItemProps } from './OrderItem.props';
import {
  ItemDetail,
  ItemContainer,
  StyledTouchable,
  RightContent,
  Tag,
} from './OrderItem.style';

const OrderItem = (props: OrderItemProps): JSX.Element => {
  // const theme = useTheme();
  return (
    <ItemContainer>
      <div className="section wrap-content">
        <ItemDetail type="left">
          <Typography color="shade7" variant="caption">
            Seller
          </Typography>
          <Typography color="shade9">{props.data.seller}</Typography>
        </ItemDetail>

        <ItemDetail type="center">
          <Typography color="shade7" variant="caption">
            Download
          </Typography>
          <StyledTouchable
            onPress={() => {
              window.open(
                `${API.URL}/${API.VERSION}/order/invoice/${props.data.orderRefNumber}?token=${props.token}`,
                '_blank'
              );
            }}
          >
            <div className="svg-container">
              <DownloadFile />
            </div>
            <Typography color="shade9">Invoice</Typography>
          </StyledTouchable>
        </ItemDetail>

        <ItemDetail type="right">
          <Typography color="shade7" variant="caption">
            Ordered By:
          </Typography>
          <Typography color="shade9">{props.data.orderedBy}</Typography>
        </ItemDetail>
      </div>

      <div className="section item">
        {props.data.detailsProps.map((d, ndx) => (
          <div key={d.name + d.weight + ndx} className="item-detail-container">
            <ItemDetail type="left" row style={{ flex: 1 }}>
              <img src={parseImageUrl(d.uri)} alt="Product" />

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
                <Typography weight="900" color="shade9">
                  {d.location}
                </Typography>
              </ItemDetail>

              <ItemDetail type="center">
                <Typography color="shade7" variant="caption">
                  Weight
                </Typography>
                <Typography weight="900" color="shade9">
                  {d.weight} {d.unit}
                </Typography>
              </ItemDetail>

              <ItemDetail type="right">
                <Typography color="shade7" variant="caption">
                  Subtotal
                </Typography>
                <Typography weight="900" color="shade9">
                  {d.price}
                </Typography>
              </ItemDetail>
            </RightContent>
          </div>
        ))}
      </div>

      <div className="section">
        <ItemDetail type="center" row className="wrap-text">
          <Typography
            color="shade7"
            variant="label"
            className="label"
            style={{ marginRight: '4px' }}
          >
            {props.data.shippingOption}:
          </Typography>
          <Typography
            color="shade9"
            variant="label"
            weight="bold"
            className="shipping-value"
          >
            {toPrice(
              props.data.shippingChargeNet + props.data.shippingChargeGst
            )}{' '}
            (incl. GST)
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
            {props.data.total}
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
  );
};

export default React.memo(OrderItem);
