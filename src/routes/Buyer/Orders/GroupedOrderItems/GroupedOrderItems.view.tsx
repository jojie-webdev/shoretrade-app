import React from 'react';

import { Truck, Box, PaperPlane } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import OrderItem from 'components/module/OrderItem';
import Pagination from 'components/module/Pagination';
import { DEFAULT_PAGE_LIMIT } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { omit } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { ScanHistoryItem } from 'types/store/GetSellerOrdersState';
import { Theme } from 'types/Theme';
import { useTheme } from 'utils/Theme';

import { PendingOrder } from '../Orders.props';
import {
  StyledAccordion,
  OrderBadge,
  CollectableBadge,
  AccordionTitleContainer,
  TitleRow,
  MobileAccordionTitleContainer,
} from '../Orders.style';
import { GroupedOrderItemsProps } from './GroupedOrderItems.props';

const getDeliveryIcon = (theme: Theme, deliveryMethod?: string) => {
  const iconProps = { width: 14, height: 14, fill: theme.grey.shade9 };
  if (deliveryMethod?.includes('road')) return <Truck {...iconProps} />;
  if (deliveryMethod?.includes('self')) return <Box {...iconProps} />;
  if (deliveryMethod?.includes('air')) return <PaperPlane {...iconProps} />;
};

export const OrderItemAccordion = (
  props: PendingOrder & {
    token: string;
    onOrderClick?: (d: string) => void;
    onRateClick?: (d: string) => void;
    updateScanHistoryModal?: React.Dispatch<
      Partial<{
        isOpen: boolean;
        scanHistoryItems: ScanHistoryItem[];
      }>
    >;
    handleToggleInvoice: (invoiceNumber: string) => void;
    openInvoice: string;
  }
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const {
    groupKey,
    groupName,
    deliveryMethodLabel,
    deliveryAddress,
    orderCount,
    orders,
    token,
    onOrderClick,
    onRateClick,
    updateScanHistoryModal,
    collectableCount,
  } = props;
  const isRoadDelivery = ['roadDeliveryOrders', 'selfDeliveryOrder'].includes(
    groupName
  );

  return (
    <StyledAccordion
      key={groupKey}
      title={''}
      headerBorder={`1px solid ${theme.grey.shade3}`}
      contentBorder={`1px solid ${theme.grey.shade3}`}
      padding="20px 24px"
      innerContentPadding="8px 24px"
      marginBottom="8px"
      keepIcon
      iconColor={theme.brand.primary}
      type="plus"
      leftComponent={
        <>
          {isMobile ? (
            <MobileAccordionTitleContainer>
              <div className="first-section">
                <span className="icon">
                  {getDeliveryIcon(theme, groupName)}
                </span>
                <Typography
                  variant="label"
                  color="shade9"
                  className="center-text"
                >
                  {deliveryMethodLabel}
                  {!isRoadDelivery && deliveryAddress && (
                    <Typography
                      variant="caption"
                      color="shade6"
                      fontStyle="italic"
                      className="center-text"
                    >
                      {deliveryAddress}
                    </Typography>
                  )}
                </Typography>
              </div>
              <OrderBadge>
                <Typography color="shade9" variant="overlineSmall">
                  {orderCount} {orderCount > 1 ? 'Orders' : 'Order'}
                </Typography>
              </OrderBadge>
            </MobileAccordionTitleContainer>
          ) : (
            <AccordionTitleContainer>
              <span
                style={{
                  background: theme.grey.shade2,
                  borderRadius: '8px',
                  marginRight: '8px',
                }}
              >
                {getDeliveryIcon(theme, groupName)}
              </span>
              <div>
                <Typography
                  variant="label"
                  color="shade9"
                  className="center-text"
                >
                  {deliveryMethodLabel}
                </Typography>

                {!isRoadDelivery && deliveryAddress && (
                  <Typography
                    variant="caption"
                    color="shade6"
                    fontStyle="italic"
                    className="center-text"
                  >
                    {deliveryAddress}
                  </Typography>
                )}
              </div>
            </AccordionTitleContainer>
          )}
        </>
      }
      rightComponent={
        <>
          {collectableCount > 0 && (
            <CollectableBadge>
              <Typography color="noshade" variant="overlineSmall">
                {collectableCount} Collectable
              </Typography>
            </CollectableBadge>
          )}
          {!isMobile && (
            <OrderBadge>
              <Typography color="shade9" variant="overlineSmall">
                {orderCount} {orderCount > 1 ? 'Orders' : 'Order'}
              </Typography>
            </OrderBadge>
          )}
        </>
      }
    >
      {orders.map((d) => (
        <OrderItem
          {...d}
          token={token}
          key={d.id}
          onClick={() => onOrderClick && onOrderClick(d.id)}
          deliveredDate={d.deliveredDate}
          deliveryAddress={isRoadDelivery ? d.data.shippingTo : null}
          isPartialShipped={d.isPartialShipped}
          completedOrder={!!(onOrderClick && onRateClick)}
          onRateClick={() => !d.data.rating && onRateClick && onRateClick(d.id)}
          updateScanHistoryModal={updateScanHistoryModal}
          handleToggleInvoice={props.handleToggleInvoice}
          openInvoice={props.openInvoice}
        />
      ))}
    </StyledAccordion>
  );
};

const GroupedOrderItems = (props: GroupedOrderItemsProps) => {
  const {
    groupedData,
    groupedCount,
    token,
    filter,
    updateFilter,
    onOrderClick,
    onRateClick,
    updateScanHistoryModal,
  } = props;
  const totalPages = Math.ceil(Number(groupedCount) / DEFAULT_PAGE_LIMIT);

  return (
    <>
      {groupedData.map((group, key) => (
        <React.Fragment key={key}>
          <TitleRow>
            <Col md={12} className="title-col">
              <Typography color="shade9" style={{ fontSize: '20px' }} altFont>
                {moment(group.title).format('Do MMMM')}
              </Typography>
              <span className="notification notif-reg">{group.orderTotal}</span>
            </Col>
          </TitleRow>

          {Object.values(group.data).map((entry, idx) => {
            const groupDetails = omit(
              ['id', 'date', 'type', 'orderRefNumber'],
              entry[0]
            );
            return (
              <OrderItemAccordion
                {...groupDetails}
                key={groupDetails.groupKey}
                buyerId={''}
                orderCount={entry.length}
                orders={entry}
                token={token}
                onOrderClick={onOrderClick}
                onRateClick={onRateClick}
                updateScanHistoryModal={updateScanHistoryModal}
                handleToggleInvoice={props.handleToggleInvoice}
                openInvoice={props.openInvoice}
              />
            );
          })}
        </React.Fragment>
      ))}

      {totalPages > 1 && (
        <Row justify="center" style={{ marginTop: '24px' }}>
          <Pagination
            numPages={totalPages}
            currentValue={Number(filter.page)}
            onClickButton={(value) =>
              updateFilter({
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

export default GroupedOrderItems;
