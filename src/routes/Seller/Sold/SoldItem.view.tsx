import React, { useState, Fragment } from 'react';

import Button from 'components/base/Button';
import { Plane, Truck, DownloadFile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { API, collectAddressShort, SELLER_SOLD_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { parseImageUrl } from 'utils/parseImageURL';
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

  const [showDownloads, setShowDownloads] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const onEnterDownloads = (id: string) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setShowDownloads(id);
  };

  const onExitDownloads = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    const timerId = setTimeout(() => {
      setShowDownloads('');
    }, 500);
    setTimer(timerId);
  };

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

    const desc = (() => {
      if (type === 'air') {
        return 'Air Freight Cut Off'.toUpperCase();
      }

      if (type === 'pickup') {
        return `Pick Up at ${collectAddressShort}`.toUpperCase();
      }

      return 'Road Freight Pick Up'.toUpperCase();
    })();

    const Icon = () =>
      type.toLowerCase().includes('air') ? (
        <Plane fill={theme.grey.shade6} />
      ) : (
        <Truck fill={theme.grey.shade6} />
      );
    const toAddress = toAddressState ? `${toAddressState}` : '';
    const key = `${desc}-${toAddress}`;

    return (
      <Fragment key={key}>
        <InnerStyledInteraction
          pressed={isOpen.includes(toAddress)}
          onClick={() => toggleAccordion(toAddress)}
          type="accordion"
          iconColor={theme.brand.primary}
          fullWidth
        >
          <div className="content">
            <div className="center-text">
              <Icon />
              <Typography variant="label" color="shade6">
                {desc}
              </Typography>
              {type !== 'pickup' && (
                <Typography variant="label" color="noshade">
                  {`${toAddress}`}
                </Typography>
              )}
            </div>
            <div className="buttons">
              {showDownloads === key && (
                <div
                  className="downloads-menu"
                  onMouseEnter={() => {
                    if (timer) {
                      clearTimeout(timer);
                      setTimer(null);
                    }
                  }}
                  onMouseLeave={() => {
                    onExitDownloads();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Typography
                    color="noshade"
                    onClick={(e) => {
                      const orderRefNumbers = entry.map((v) => {
                        return v.orderRefNumber;
                      });
                      window.open(
                        `${API.URL}/${
                          API.VERSION
                        }/order/packing-list/${orderRefNumbers.join()}?token=${
                          props.token
                        }&state=${toAddressState}&status=${props.status}`,
                        '_blank'
                      );
                      setShowDownloads('');
                      e.stopPropagation();
                    }}
                  >
                    Packing Lists
                  </Typography>
                  <Typography
                    color="noshade"
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
                      setShowDownloads('');
                      e.stopPropagation();
                    }}
                  >
                    Invoices
                  </Typography>
                  <Typography
                    color="noshade"
                    onClick={(e) => {
                      const orderRefNumbers = entry.map((v) => {
                        return v.orderRefNumber;
                      });
                      window.open(
                        `${API.URL}/${
                          API.VERSION
                        }/order/order-summary/${orderRefNumbers.join()}?token=${
                          props.token
                        }&state=${toAddressState}&status=${props.status}`,
                        '_blank'
                      );
                      setShowDownloads('');
                      e.stopPropagation();
                    }}
                  >
                    Order Summary
                  </Typography>
                </div>
              )}

              <Button
                text={'Downloads'}
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
                onMouseLeave={() => {
                  onExitDownloads();
                }}
                onClick={(e) => {
                  if (showDownloads.length > 0) {
                    setShowDownloads('');
                  } else {
                    onEnterDownloads(key);
                  }
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
            {v.orders.map((order, index) => (
              <ItemCard
                key={order.orderNumber + index}
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
                      <ItemImage src={parseImageUrl(order.uri)} alt="" />

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
