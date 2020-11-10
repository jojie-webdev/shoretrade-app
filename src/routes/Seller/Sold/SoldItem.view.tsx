import React, { useState, Fragment } from 'react';

import Button from 'components/base/Button';
import { Plane, Truck, DownloadFile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { API, SELLER_SOLD_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { SoldItemData } from './Sold.props';
import {
  StyledInteraction,
  InnerStyledInteraction,
  CollapsibleContent,
  ItemCard,
  ItemImage,
  ItemDetail,
  Tag,
} from './SoldItem.styles';

const SoldItem = (props: {
  data: { [p: string]: SoldItemData[] };
  token: string;
  status: 'PLACED' | 'TRANSIT' | 'DELIVERED';
}): any => {
  const history = useHistory();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<string[]>([]);

  const toggleAccordion = (title: string) => {
    const isExisting = isOpen.some((v) => v === title);

    if (!isExisting) {
      setIsOpen((prevState) => [...prevState, title]);
    } else {
      setIsOpen((prevState) => {
        return prevState.filter((v) => v !== title);
      });
    }
  };

  return Object.values(props.data).map((entry) => {
    const { type = 'air', toAddressState } = entry[0];

    const desc =
      type.toLowerCase() === 'air'
        ? 'Air Freight Cut Off'.toUpperCase()
        : 'Road Freight Pick Up'.toUpperCase();

    const Icon = () =>
      type.toLowerCase().includes('air') ? (
        <Plane height={18} width={18} fill={theme.grey.shade6} />
      ) : (
        <Truck height={18} width={18} fill={theme.grey.shade6} />
      );
    const toAddress = toAddressState ? `${toAddressState}` : '';

    return (
      <Fragment key={desc}>
        <InnerStyledInteraction
          pressed={isOpen.includes(toAddress)}
          onClick={() => toggleAccordion(toAddress)}
          type="accordion"
          iconColor={theme.brand.primary}
          fullWidth
        >
          <div className="content">
            <Icon />
            <div className="center-text">
              <Typography variant="label" color="shade6">
                {desc}
              </Typography>
              <Typography variant="label" color="noshade">
                {`${toAddress}`}
              </Typography>
            </div>
            <div className="buttons">
              <Button
                text={'Invoice'}
                icon={
                  <DownloadFile
                    fill={theme.grey.noshade}
                    height={16}
                    width={16}
                  />
                }
                textColor={'noshade'}
                iconPosition="before"
                style={{
                  width: 123,
                  height: 32,
                  backgroundColor: theme.grey.shade8,
                }}
                size="sm"
                onClick={(e) => {
                  const orderRefNumbers = entry.map((v) => {
                    return v.orderRefNumber;
                  });
                  window.open(
                    `${API.URL}/${
                      API.VERSION
                    }/order/invoice/${orderRefNumbers.join()}?token=${
                      props.token
                    }`,
                    '_blank'
                  );
                  e.stopPropagation();
                }}
              />
            </div>
          </div>
        </InnerStyledInteraction>

        {entry.map((v) => (
          <CollapsibleContent
            key={v.id}
            isOpen={isOpen.includes(toAddress)}
            style={{ margin: '0px 16px' }}
          >
            {v.orders.map((order) => (
              <ItemCard
                key={order.orderNumber}
                onClick={() => {
                  history.push(
                    SELLER_SOLD_ROUTES.DETAILS.replace(
                      ':orderId',
                      v.id
                    ).replace(':status', props.status)
                  );
                }}
              >
                <div className="wrapper">
                  <div className="title">
                    <Typography color="shade6" className="item-title">
                      Buyer
                    </Typography>
                    <Typography color="noshade" className="item-title">
                      {order.buyer}
                    </Typography>
                  </div>
                  <div className="content">
                    <div className="left-content">
                      <ItemImage src={order.uri} alt="" />

                      <div className="text-content">
                        <Typography
                          variant="label"
                          color="noshade"
                          className="item-title"
                        >
                          {order.name}
                        </Typography>

                        <div className="tags-container">
                          {order.tags.map(({ label }) => (
                            <Tag key={label}>
                              <Typography variant="caption" color="noshade">
                                {label}
                              </Typography>
                            </Tag>
                          ))}
                        </div>

                        <ItemDetail variant="caption" color="shade5" row>
                          {order.size}
                        </ItemDetail>
                      </div>
                    </div>
                    <div className="right-content-alternate">
                      <div className="data-content">
                        <ItemDetail variant="caption" color="shade6">
                          Fisherman{' '}
                          <span className="data-fisherman">
                            {order.fisherman}
                          </span>
                        </ItemDetail>
                      </div>
                      <div className="data-content">
                        <ItemDetail variant="caption" color="shade6">
                          Order No. <span>{order.orderNumber}</span>
                        </ItemDetail>
                      </div>
                      <div className="data-content">
                        <ItemDetail variant="caption" color="shade6">
                          Sold Weight <span>{order.weight}</span>
                        </ItemDetail>
                      </div>
                      <div className="data-content">
                        <ItemDetail variant="caption" color="shade6">
                          Price (AUD) <span>{order.price}</span>
                        </ItemDetail>
                      </div>
                    </div>
                  </div>
                </div>
              </ItemCard>
            ))}
          </CollapsibleContent>
        ))}
      </Fragment>
    );
  });
};

export default SoldItem;
