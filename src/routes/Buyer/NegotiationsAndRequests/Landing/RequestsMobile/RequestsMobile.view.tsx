import React from 'react';

import Case from 'case';
import Button from 'components/base/Button';
import { ChevronRight, TrashCan } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography';
import OfferTag from 'components/module/OfferTag';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import {
  numberOffersTransform,
  transformMarketRequestStatusText,
} from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { Badges } from '../Landing.style';
import { buildSize } from '../Landing.view';
import { RequestsMobilePrivateProps } from './RequestsMobile.props';
import {
  MajorInfo,
  MarketRequestItemInteraction,
  MarketRequestItemMobileContainer,
  MinorInfo,
  SubMinorDetail,
  SubMinorInfo,
} from './RequestsMobile.style';

const RequestsMobileView = (props: RequestsMobilePrivateProps) => {
  const { item, onClickItem, activeOffersData, setItemToDelete } = props;

  const theme = useTheme();

  const MarketRequestItemMobile = (props: {
    expiry: string;
    offers: number;
    type: string;
    image: string;
    inDetail: boolean;
    metric: string;
    paymentRequired: boolean;
    weight?: { from: number; to: number };
    measurementUnit?: string;
    specs?: string;
    size?: { from: number; to: number; options: any; ungraded: boolean };
    requestStatus: string;
    status: string;
  }) => {
    const {
      expiry,
      offers,
      type,
      image,
      measurementUnit,
      weight,
      specs,
      size,
      metric,
      requestStatus,
    } = props;

    const statusTextProps = transformMarketRequestStatusText(
      theme,
      requestStatus
    );
    const offersTextProps = numberOffersTransform(offers);

    const subMinorDetail = (label: string, value: string) => (
      <>
        <Typography
          variant="caption"
          weight="400"
          color="shade6"
          style={{ marginRight: '5px' }}
        >
          {label}{' '}
        </Typography>
        <Typography variant="caption" weight="700" color="shade9">
          {value}
        </Typography>
      </>
    );

    return (
      <MarketRequestItemMobileContainer>
        <MajorInfo>
          <div className="thumbnail-container">
            <img src={parseImageUrl(image)} alt="" />
          </div>

          <TypographyView variant="label" style={{ lineHeight: '20px' }}>
            {type}
          </TypographyView>
        </MajorInfo>

        <MinorInfo>
          <Typography variant="caption" weight="400" color="shade6">
            {specs?.split(',').join(', ')}
          </Typography>

          <SubMinorInfo>
            <SubMinorDetail>
              {subMinorDetail(
                'Quantity',
                weight?.from +
                  '-' +
                  weight?.to +
                  ' ' +
                  Case.pascal(formatUnitToPricePerUnit(measurementUnit || ''))
              )}
            </SubMinorDetail>

            <SubMinorDetail>
              {subMinorDetail('Time Left', expiry)}
            </SubMinorDetail>

            <SubMinorDetail>
              {subMinorDetail(
                'Size',
                buildSize(
                  metric,
                  size?.from?.toString(),
                  size?.to?.toString(),
                  size?.options
                ) || 'None'
              )}
            </SubMinorDetail>
          </SubMinorInfo>

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
        </MinorInfo>
      </MarketRequestItemMobileContainer>
    );
  };

  return (
    <MarketRequestItemInteraction
      key={item.id}
      type={item.offers > 0 ? 'next' : 'none'}
      onClick={() => onClickItem(item)}
      leftComponent={<MarketRequestItemMobile inDetail={false} {...item} />}
      rightComponent={
        <div className="cta">
          {item.offers > 0 && (
            <div>
              <ChevronRight width={8} height={12} />
            </div>
          )}
          <Button
            iconPosition="before"
            icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
            onClick={
              setItemToDelete &&
              ((e) => {
                e.stopPropagation();
                setItemToDelete({ value: item.id || '' });
              })
            }
            variant="primary"
            size="sm"
            className="delete-button"
          />
        </div>
      }
    />
  );
};

export default RequestsMobileView;
