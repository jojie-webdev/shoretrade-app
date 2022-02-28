import React, { useState } from 'react';

import Button from 'components/base/Button';
import StarRating from 'components/base/StarRating';
import {
  TrashCan,
  PlaceholderProfile,
  Crab,
  ChevronRight,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyStateView from 'components/module/EmptyState';
import OfferTag from 'components/module/OfferTag';
import { Col, Visible, Hidden } from 'react-grid-system';
import { formatEstDelivery } from 'utils/formatEstDelivery';
import { sizeToString } from 'utils/Listing';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { getOfferLatestPrice } from 'utils/MarketRequest';
import { transformMarketRequestStatusText } from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { OfferItemProps } from './OfferItem.props';
import {
  MajorInfo,
  MarketRequestItemInteraction,
  MarketRequestItemMobileContainer,
  AvatarPlaceholder,
  OfferContainer,
  MarketRequestItemInteractionContainer,
  MajorInfoContainer,
  OfferRowContainer,
  MajorInfoNonMobileContainer,
} from './OfferItem.style';

const Offer = (props: OfferItemProps) => {
  const { sellerOffer, onOfferDelete, onClickItem } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [offerIdToDelete, setOfferIdToDelete] = useState<string>('');
  const theme = useTheme();
  const getCorrectedSize = (offer: any) => {
    let convertedSize = sizeToString(
      offer.metric,
      offer.size.from,
      offer.size.to
    );

    if (
      offer?.options &&
      Array.isArray(offer?.options) &&
      offer?.options.length > 1
    ) {
      convertedSize = 'Various';
    }

    return convertedSize;
  };

  const renderSubDetails = (offer: any) => (
    <div className="sub-details">
      <Typography
        weight="700"
        variant="caption"
        style={{
          fontFamily: 'Basis Grotesque Pro',
        }}
        color="shade10"
      >
        {offer.weight}
        {formatUnitToPricePerUnit(offer.measurementUnit)} at $
        {getOfferLatestPrice(offer)}/
        {formatUnitToPricePerUnit(offer.measurementUnit)}
      </Typography>
      <Typography
        weight="400"
        variant="small"
        style={{
          fontFamily: 'Basis Grotesque Pro',
        }}
        color="shade7"
      >
        Specs: {offer.specifications.join(', ')}
      </Typography>
      <Typography
        weight="400"
        variant="small"
        style={{
          fontFamily: 'Basis Grotesque Pro',
        }}
        color="shade7"
      >
        Size: {getCorrectedSize(offer)}
      </Typography>
      <Typography
        weight="400"
        variant="small"
        style={{
          fontFamily: 'Basis Grotesque Pro',
        }}
        color="shade7"
      >
        {formatEstDelivery(offer.deliveryDate)}
      </Typography>
    </div>
  );

  const renderOffersForMobile = (offer: any) => {
    const statusTextProps = transformMarketRequestStatusText(
      theme,
      offer.statusText
    );
    return (
      <MarketRequestItemMobileContainer>
        <MajorInfo id="major info">
          <div className="thumbnail-container">
            {sellerOffer?.company?.image ? (
              <img
                src={parseImageUrl(sellerOffer?.company?.image || '')}
                alt={Math.random().toString()}
              />
            ) : (
              <AvatarPlaceholder width="48px" height="48px" borderRadius="8px">
                <PlaceholderProfile width={48} height={48} />
              </AvatarPlaceholder>
            )}
          </div>

          <MajorInfoContainer>
            <Typography variant="label" style={{ lineHeight: '20px' }}>
              {sellerOffer?.company?.name}
            </Typography>
            <StarRating
              rating={sellerOffer?.company?.rating || 0}
              spacing={3}
              starSize={12}
              unfilledColor={theme.brand.alert}
            />
          </MajorInfoContainer>
        </MajorInfo>

        <div style={{ marginTop: '8px' }}>{renderSubDetails(offer)}</div>

        <div style={{ marginTop: '8px' }}>
          {statusTextProps.text !== '' && (
            <OfferTag
              text={statusTextProps.text}
              badgeColor={statusTextProps.badgeColor || ''}
              variantColor={statusTextProps.variantColor}
              color={statusTextProps.tagColor}
            />
          )}
        </div>
      </MarketRequestItemMobileContainer>
    );
  };

  const renderMobile = () =>
    sellerOffer?.offers?.length > 0 ? (
      sellerOffer?.offers?.map((offer) => (
        <MarketRequestItemInteractionContainer key={offer.id}>
          <MarketRequestItemInteraction
            type={'next'}
            onClick={() => onClickItem(offer)}
            leftComponent={renderOffersForMobile(offer)}
            rightComponent={
              <div className="cta">
                <div>
                  <ChevronRight width={8} height={12} />
                </div>

                {offer.status !== 'ACCEPTED' && offer.status !== 'DECLINED' && (
                  <Button
                    iconPosition="before"
                    icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                    onClick={(e) => handleTrashIconClick(e, offer.id)}
                    variant="primary"
                    size="sm"
                    className="delete-button"
                  />
                )}
              </div>
            }
          />
        </MarketRequestItemInteractionContainer>
      ))
    ) : (
      <EmptyStateView Svg={Crab} height={240} width={249} fluid />
    );

  const handleTrashIconClick = (e: any, offerId: string) => {
    setIsModalOpen(true);
    setOfferIdToDelete(offerId);
    e.stopPropagation();
  };

  const renderNonMobile = () => {
    return sellerOffer.offers.map((offer, index) => {
      const statusTextProps = transformMarketRequestStatusText(
        theme,
        offer.statusText
      );

      return (
        <OfferContainer key={index} onClick={() => onClickItem(offer)}>
          <OfferRowContainer>
            <Col
              sm={12}
              md={6}
              lg={4}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {sellerOffer.company.image ? (
                <img
                  style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: 'grey',
                    borderRadius: '8px',
                  }}
                  src={parseImageUrl(sellerOffer.company.image || '')}
                  alt=""
                />
              ) : (
                <AvatarPlaceholder
                  width="48px"
                  height="48px"
                  borderRadius="8px"
                >
                  <PlaceholderProfile width={48} height={48} />
                </AvatarPlaceholder>
              )}

              <MajorInfoNonMobileContainer>
                <Typography
                  weight="700"
                  variant="label"
                  style={{
                    fontFamily: 'Basis Grotesque Pro',
                    marginTop: '3px',
                  }}
                  color="shade9"
                >
                  {sellerOffer.company.name}
                </Typography>
                <StarRating
                  rating={sellerOffer?.company?.rating || 0}
                  spacing={3}
                  starSize={12}
                  unfilledColor={theme.brand.alert}
                />
              </MajorInfoNonMobileContainer>
            </Col>

            <Col sm={12} md={6} lg={3}>
              {renderSubDetails(offer)}
            </Col>

            <Col className="badges-col" sm={12} md={6} lg={3}>
              {statusTextProps.text !== '' && (
                <OfferTag
                  text={statusTextProps.text}
                  badgeColor={statusTextProps.badgeColor || ''}
                  variantColor={statusTextProps.variantColor}
                  color={statusTextProps.tagColor}
                />
              )}
            </Col>

            <Col
              className="cta"
              sm={12}
              md={6}
              lg={2}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {offer.status !== 'ACCEPTED' && offer.status !== 'DECLINED' && (
                <Button
                  iconPosition="before"
                  icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                  onClick={(e) => handleTrashIconClick(e, offer.id)}
                  variant="primary"
                  size="sm"
                  className="delete-button"
                  style={{ marginRight: '20px' }}
                />
              )}
              <div>
                <ChevronRight width={10} height={10} />
              </div>
            </Col>
          </OfferRowContainer>
        </OfferContainer>
      );
    });
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Offer"
        description="Are you sure you want to delete this offer?"
        action={() => onOfferDelete(offerIdToDelete)}
        actionText="DELETE"
        onClickClose={() => setIsModalOpen(false)}
      />

      <Hidden xs sm>
        {renderNonMobile()}
      </Hidden>
      <Visible xs sm>
        {renderMobile()}
      </Visible>
    </>
  );
};

export default Offer;
