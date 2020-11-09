import React, { useState } from 'react';

import Button from 'components/base/Button';
import { ChevronRight, DownloadFile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { API, SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import getCalendarDate from 'utils/Date/getCalendarDate';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { useTheme } from 'utils/Theme';

import { SoldGeneratedProps } from '../Sold.props';
import { DeliveryItem } from '../Sold.style';
import {
  DeliveredRow,
  StyledInteraction,
  ItemImage,
  ItemCard,
  ItemDetail,
  Tag,
  CollapsibleContent,
} from './Delivered.styles';

const Delivered = (props: SoldGeneratedProps) => {
  const { delivered, deliveredCount, filters, updateFilters } = props;
  const deliveredPagesTotal = Math.ceil(Number(deliveredCount) / 10);
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
  return (
    <>
      <DeliveredRow>
        {delivered.map((group) => {
          const getDisplayDate = () => {
            const targetDate = moment(group.title);
            const currentDate = moment();
            const dateDiff = targetDate.diff(currentDate, 'days');

            if (dateDiff === -1) {
              return 'Yesterday';
            } else if (dateDiff === 0) {
              return 'Today';
            } else if (dateDiff === 1) {
              return 'Tomorrow';
            }

            return targetDate.format('Do MMMM');
          };

          const calendarDateString = getDisplayDate();
          return (
            <Col key={calendarDateString} className="delivered-col" md={12}>
              <StyledInteraction
                pressed={isOpen.includes(calendarDateString)}
                onClick={() => toggleAccordion(calendarDateString)}
                type="accordion"
                iconColor={theme.brand.primary}
                fullWidth
              >
                <div className="content">
                  <div className="left-content">
                    <div className="center-text">
                      <Typography variant="label" color="noshade">
                        {calendarDateString}
                      </Typography>
                    </div>

                    <div className="order-count">
                      <Typography variant="label" color="noshade">
                        {group.data.length}&nbsp;
                        {group.data.length > 1 ? 'ORDERS' : 'ORDER'}
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
                        const orderRefNumbers = group.data.map((v) => {
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
              {group.data.map((v) => {
                // const deliveryDate = moment(item.date).format('ddd DD MMM');
                return (
                  <CollapsibleContent
                    key={v.id}
                    isOpen={isOpen.includes(calendarDateString)}
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
                            ).replace(':status', 'DELIVERED')
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
                );
              })}
            </Col>
          );
        })}
      </DeliveredRow>

      {deliveredPagesTotal > 1 && (
        <Row justify="center">
          <Pagination
            numPages={deliveredPagesTotal}
            currentValue={Number(filters.deliveredFilters.page)}
            onClickButton={(value) =>
              updateFilters.updateDeliveredFilters({
                page: value.toFixed(0),
              })
            }
            variant="number"
          />
        </Row>
      )}
    </>
  );
};

export default Delivered;
