import React, { Dispatch, SetStateAction } from 'react';

import Button from 'components/base/Button';
import { TrashCan } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import OfferTag from 'components/module/OfferTag';
import moment from 'moment';
import { isEmpty } from 'ramda';
import { Col, Hidden, Visible } from 'react-grid-system';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatRunningDateDifference } from 'utils/MarketRequest';
import {
  numberOffersTransform,
  transformMarketRequestStatusText,
  transformNegotiationStatusText,
} from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { Badges } from '../Landing.style';
import { buildSize } from '../Landing.view';
import { NegotiationNonMobilePrivateProps } from './NegotiationNonMobile.props';
import {
  NegotiationItemContainer,
  NegotiationItemInteraction,
  SubText,
} from './NegotiationNonMobile.style';

const OfferTagTextStyle = {
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '0.5px',
};

const NegotiationMobileView = (props: NegotiationNonMobilePrivateProps) => {
  const { item, onClickItem, activeOffersData, setItemToDelete } = props;

  const theme = useTheme();

  const NegotiationItemNonMobile = (props: {
    item: GetAllNegoRequestResponseItem & { expiry: any };
  }) => {
    // props: {
    // expiry: string;
    // offers: number;
    // type: string;
    // image: string;
    // inDetail: boolean;
    // activeOffersData: GetActiveOffersRequestResponseItem[];
    // metric: string;
    // paymentRequired: boolean;
    // weight?: { from: number; to: number };
    // measurementUnit?: string;
    // setItemToDelete?: Dispatch<SetStateAction<{ value: null | string }>>;
    // id?: string;
    // requestStatus: string;
    // specs?: string;
    // status: string;
    // size?: { from: number; to: number; options: any; ungraded: boolean };
    // }) => {
    // const {
    //   id,
    //   expiry,
    //   offers,
    //   type,
    //   image,
    //   measurementUnit,
    //   weight,
    //   specs,
    //   size,
    //   setItemToDelete,
    //   metric,
    //   requestStatus,
    // } = props;

    const getTimeLimit = () => {
      const isFresh = !isEmpty(
        item.specifications.filter(
          (spec) => spec.name.toLowerCase() === 'fresh'
        )
      );

      const isPreAuction = item.is_pre_auction || !isEmpty(item.auction_date);

      const time =
        item.negotiation_offer?.updated_at ||
        item.negotiation_offer?.created_at ||
        item.created_at;

      //2023-03-13T12:49:10.216Z
      if (isFresh || isPreAuction) {
        const expiry = moment(time).add(3, 'h').isBefore()
          ? 'Expired'
          : formatRunningDateDifference(
              moment(time).add(3, 'h').format(),
              '',
              false
            );

        return expiry;
      }

      const expiry = moment(time).add(24, 'h').isBefore()
        ? 'Expired'
        : formatRunningDateDifference(
            moment(time).add(24, 'h').format(),
            '',
            false
          );

      return expiry;
    };

    // const reworkDisplayStatus = (displayStatus: string) => {
    //   if (displayStatus.toLowerCase() === 'partial') {
    //     if (getTimeLimit().toLowerCase() === 'expired') {
    //       return 'Payment Missed';
    //     }

    //     return 'Payment Required';
    //   }

    //   if (displayStatus.toLowerCase() === 'end') {
    //     return 'Declined';
    //   }

    //   return displayStatus;
    // };

    const statusTextProps = transformNegotiationStatusText(
      theme,
      // reworkDisplayStatus(item?.display_status || '')
      item?.display_status || ''
    );

    // const offersTextProps = numberOffersTransform(offers);

    return (
      <NegotiationItemContainer>
        <div className="thumbnail-container">
          <img src={parseImageUrl(item.thumbnail)} alt="" />
        </div>
        <div className="info-container">
          <Col style={{ padding: '0 5px' }}>
            <div className="sub-group">
              <TypographyView variant="label">{item.name}</TypographyView>
              <SubText variant="caption">
                {item.specifications?.map((spec) => spec.name).join(', ')}
              </SubText>
            </div>
          </Col>

          <Col style={{ padding: '0 5px' }}>
            <div className="sub-group">
              <SubText variant="caption">{`Size: ${buildSize(
                item.metric || item.active_size_unit || 'Grams',
                item.size_from,
                item.size_to,
                {}
              )}`}</SubText>
              <SubText variant="caption">
                {item.desired_quantity &&
                  `Qty: ${item.desired_quantity} ${formatUnitToPricePerUnit(
                    item.measurement_unit?.toLocaleLowerCase()
                  )}`}
              </SubText>
            </div>
          </Col>

          <Col sm={2} style={{ padding: '0 5px' }}>
            <div className="sub-group">
              <SubText
                variant="caption"
                color={item.expiry === 'Expired' ? 'error' : 'primary'}
              >
                {item.expiry === 'Expired'
                  ? item.expiry
                  : `${item.expiry} left`}
              </SubText>
            </div>
          </Col>

          <Col style={{ padding: '0 5px' }}>
            <Badges>
              {statusTextProps.text !== '' && (
                <OfferTag
                  text={statusTextProps.text}
                  badgeColor={statusTextProps.badgeColor || ''}
                  variantColor={statusTextProps.variantColor}
                  color={statusTextProps.tagColor}
                  textStyle={OfferTagTextStyle}
                />
              )}
            </Badges>
          </Col>

          {/* <Col sm={1} style={{ padding: '0 5px' }}>
            <div className="sub-group">
              <Button
                iconPosition="before"
                icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                onClick={
                  setItemToDelete &&
                  ((e) => {
                    e.stopPropagation();
                    setItemToDelete({ value: item.listing_id || '' });
                  })
                }
                variant="primary"
                size="sm"
                className="delete-button"
              />
            </div>
          </Col> */}
        </div>
      </NegotiationItemContainer>
    );
  };

  return (
    <NegotiationItemInteraction
      key={item.listing_id}
      type="next"
      onClick={() => onClickItem(item)}
      leftComponent={
        <NegotiationItemNonMobile
          // activeOffersData={activeOffersData}
          // inDetail={false}
          // setItemToDelete={setItemToDelete}
          item={item}
        />
      }
      keepIcon
    />
  );
};

export default NegotiationMobileView;
