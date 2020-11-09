import React, { Fragment, useState } from 'react';

import Button from 'components/base/Button';
import { Plane, Truck, DownloadFile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { API, SELLER_SOLD_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { SoldGeneratedProps, InTransitItemData } from '../Sold.props';
import {
  StyledInteraction,
  CollapsibleContent,
  ItemCard,
  ItemDetail,
  ItemImage,
  Tag,
} from './InTransit.styles';

const InTransit = (props: SoldGeneratedProps) => {
  const { inTransit } = props;

  const theme = useTheme();
  const history = useHistory();
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
  return (
    <>
      {inTransit.map((order) => {
        return Object.keys(order.deliveryMethod)
          .filter((key) => order.deliveryMethod[key].length > 0)
          .map((deliveryMethod) => {
            const orderData: InTransitItemData[] =
              order.deliveryMethod[deliveryMethod];

            const Icon = () =>
              deliveryMethod.toLowerCase().includes('air') ? (
                <Plane height={18} width={18} fill={theme.grey.shade6} />
              ) : (
                <Truck height={18} width={18} fill={theme.grey.shade6} />
              );
            const key = deliveryMethod + order.state;
            return (
              <Fragment key={key}>
                <StyledInteraction
                  pressed={isOpen.includes(key)}
                  onClick={() => toggleAccordion(key)}
                  type="accordion"
                  iconColor={theme.brand.primary}
                  fullWidth
                >
                  <div className="content">
                    <div className="left-content">
                      <Icon />
                      <div className="center-text">
                        <Typography variant="label" color="shade6">
                          {deliveryMethod}
                        </Typography>
                        <Typography variant="label" color="noshade">
                          {`${order.state}`}
                        </Typography>
                      </div>

                      <div className="order-count">
                        <Typography variant="label" color="noshade">
                          {orderData.length}&nbsp;
                          {orderData.length > 1 ? 'ORDERS' : 'ORDER'}
                        </Typography>
                      </div>
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
                          const orderRefNumbers = orderData.map((v) => {
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
                </StyledInteraction>

                {orderData.map((v) => (
                  <CollapsibleContent
                    key={v.id}
                    isOpen={isOpen.includes(key)}
                    style={{ margin: '0px 16px' }}
                  >
                    {v.orders.map((lineItem) => (
                      <ItemCard
                        key={v.orderRefNumber}
                        onClick={() => {
                          history.push(
                            SELLER_SOLD_ROUTES.DETAILS.replace(
                              ':orderId',
                              v.id
                            ).replace(':status', 'TRANSIT')
                          );
                        }}
                      >
                        <div className="wrapper">
                          <div className="title">
                            <Typography color="shade6" className="item-title">
                              Buyer
                            </Typography>
                            <Typography color="noshade" className="item-title">
                              {v.buyer}
                            </Typography>
                          </div>
                          <div className="content">
                            <div className="left-content">
                              <ItemImage src={lineItem.uri} alt="" />

                              <div className="text-content">
                                <Typography
                                  variant="label"
                                  color="noshade"
                                  className="item-title"
                                >
                                  {lineItem.name}
                                </Typography>

                                <div className="tags-container">
                                  {lineItem.tags.map(({ label }) => (
                                    <Tag key={label}>
                                      <Typography
                                        variant="caption"
                                        color="noshade"
                                      >
                                        {label}
                                      </Typography>
                                    </Tag>
                                  ))}
                                </div>

                                <ItemDetail
                                  variant="caption"
                                  color="shade5"
                                  row
                                >
                                  {lineItem.size}
                                </ItemDetail>
                              </div>
                            </div>
                            <div className="right-content-alternate">
                              <div className="data-content">
                                <ItemDetail variant="caption" color="shade6">
                                  Fisherman{' '}
                                  <span className="data-fisherman">
                                    {lineItem.fisherman}
                                  </span>
                                </ItemDetail>
                              </div>
                              <div className="data-content">
                                <ItemDetail variant="caption" color="shade6">
                                  Order No. <span>{lineItem.orderNumber}</span>
                                </ItemDetail>
                              </div>
                              <div className="data-content">
                                <ItemDetail variant="caption" color="shade6">
                                  Sold Weight <span>{lineItem.weight}</span>
                                </ItemDetail>
                              </div>
                              <div className="data-content">
                                <ItemDetail variant="caption" color="shade6">
                                  Price (AUD) <span>{lineItem.price}</span>
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
      })}
    </>
  );
};

export default InTransit;
