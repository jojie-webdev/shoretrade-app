import React, { Dispatch, SetStateAction } from 'react';

import Button from 'components/base/Button';
import { TrashCan } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import OfferTag from 'components/module/OfferTag';
import { Col, Hidden, Visible } from 'react-grid-system';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import {
  numberOffersTransform,
  transformMarketRequestStatusText,
} from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { Badges } from '../Landing.style';
import { buildSize } from '../Landing.view';
import { RequestsNonMobilePrivateProps } from './RequestsNonMobile.props';
import {
  MarketRequestItemContainer,
  MarketRequestItemInteraction,
  SubText,
} from './RequestsNonMobile.style';

const RequestsMobileView = (props: RequestsNonMobilePrivateProps) => {
  const { item, onClickItem, activeOffersData, setItemToDelete } = props;

  const theme = useTheme();

  const MarketRequestItemNonMobile = (props: {
    expiry: string;
    offers: number;
    type: string;
    image: string;
    inDetail: boolean;
    activeOffersData: GetActiveOffersRequestResponseItem[];
    metric: string;
    paymentRequired: boolean;
    weight?: { from: number; to: number };
    measurementUnit?: string;
    setItemToDelete?: Dispatch<SetStateAction<{ value: null | string }>>;
    id?: string;
    requestStatus: string;
    specs?: string;
    status: string;
    size?: { from: number; to: number; options: any; ungraded: boolean };
  }) => {
    const {
      id,
      expiry,
      offers,
      type,
      image,
      measurementUnit,
      weight,
      specs,
      size,
      setItemToDelete,
      metric,
      requestStatus,
    } = props;
    const statusTextProps = transformMarketRequestStatusText(
      theme,
      requestStatus
    );
    const offersTextProps = numberOffersTransform(offers);

    return (
      <MarketRequestItemContainer>
        <div className="thumbnail-container">
          <img src={parseImageUrl(image)} alt="" />
        </div>
        <div className="info-container">
          <Col style={{ padding: '0 5px' }}>
            <div className="sub-group">
              <TypographyView variant="label">{type}</TypographyView>
              <SubText variant="caption">
                {specs?.split(',').join(', ')}
              </SubText>
            </div>
          </Col>

          <Col style={{ padding: '0 5px' }}>
            <div className="sub-group">
              {buildSize(
                metric,
                size?.from?.toString(),
                size?.to?.toString(),
                size?.options
              ) && (
                <SubText variant="caption">{`Size: ${buildSize(
                  metric,
                  size?.from?.toString(),
                  size?.to?.toString(),
                  size?.options
                )}`}</SubText>
              )}
              <SubText variant="caption">
                {weight &&
                  `Qty: ${weight.from} ${formatUnitToPricePerUnit(
                    measurementUnit?.toLocaleLowerCase()
                  )} ~ ${weight.to} ${formatUnitToPricePerUnit(
                    measurementUnit?.toLocaleLowerCase()
                  )}`}
              </SubText>
            </div>
          </Col>

          <Col sm={2} style={{ padding: '0 5px' }}>
            <div className="sub-group">
              <SubText
                variant="caption"
                color={expiry === 'Expired' ? 'error' : 'primary'}
              >
                {expiry === 'Expired' ? expiry : `${expiry} left`}
              </SubText>
            </div>
          </Col>

          <Hidden xs sm>
            <Col style={{ padding: '0 5px' }}>
              <Badges>
                <OfferTag
                  text={offersTextProps.text}
                  badgeColor={offersTextProps.badgeColor || ''}
                  variantColor={offersTextProps.variantColor}
                  color={offersTextProps.tagColor}
                />
              </Badges>
            </Col>

            <Col style={{ padding: '0 5px' }}>
              <Badges>
                {statusTextProps.text !== '' && (
                  <OfferTag
                    text={statusTextProps.text}
                    badgeColor={statusTextProps.badgeColor || ''}
                    variantColor={statusTextProps.variantColor}
                    color={statusTextProps.tagColor}
                  />
                )}
              </Badges>
            </Col>
          </Hidden>

          <Visible xs sm>
            <Col style={{ padding: '0 5px' }}>
              <Badges>
                {statusTextProps.text !== '' && (
                  <OfferTag
                    text={statusTextProps.text}
                    badgeColor={statusTextProps.badgeColor || ''}
                    variantColor={statusTextProps.variantColor}
                    color={statusTextProps.tagColor}
                  />
                )}

                <OfferTag
                  text={offersTextProps.text}
                  badgeColor={offersTextProps.badgeColor || ''}
                  variantColor={offersTextProps.variantColor}
                  color={offersTextProps.tagColor}
                />
              </Badges>
            </Col>
          </Visible>

          <Col sm={1} style={{ padding: '0 5px' }}>
            <div className="sub-group">
              <Button
                iconPosition="before"
                icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                onClick={
                  setItemToDelete &&
                  ((e) => {
                    e.stopPropagation();
                    setItemToDelete({ value: id || '' });
                  })
                }
                variant="primary"
                size="sm"
                className="delete-button"
              />
            </div>
          </Col>
        </div>
      </MarketRequestItemContainer>
    );
  };

  return (
    <MarketRequestItemInteraction
      key={item.id}
      type={item.offers > 0 ? 'next' : 'none'}
      onClick={() => onClickItem(item)}
      leftComponent={
        <MarketRequestItemNonMobile
          activeOffersData={activeOffersData}
          inDetail={false}
          setItemToDelete={setItemToDelete}
          {...item}
        />
      }
      keepIcon
    />
  );
};

export default RequestsMobileView;
