import React from 'react';
import Typography from 'components/base/Typography';
import { Star, StarFilled, TrashCan, PlaceholderProfile, Crab } from 'components/base/SVG';
import theme from '../../../../../utils/Theme';
import Button from './../../../../../components/base/Button/Button.view';
import { OfferProps } from './Offer.props';
import {
    OfferContainer,
    MarketRequestItemInteractionContainer,
    TagsContainer,
    NoActionsYetBadgesContainer,
    StarsContainer,
    MajorInfoContainer,
    OfferRowContainer,
    MajorInfoNonMobileContainer
} from './Offer.style';
import ChevronRight from './../../../../../components/base/SVG/ChevronRight';
import { Col, Visible, Hidden } from 'react-grid-system';
import { parseImageUrl } from 'utils/parseImageURL';
import { AvatarPlaceholder } from './../../../../../components/module/ProductSellerCard/ProductSellerCard.style';
import { sizeToString } from './../../../../../utils/Listing/sizeToString';
import { useHistory } from 'react-router';
import { MajorInfo, MarketRequestItemInteraction, MarketRequestItemMobileContainer } from '../../Landing/Landing.style';
import EmptyStateView from 'components/module/EmptyState';
import { BUYER_ROUTES } from 'consts';
import Badge from 'components/base/Badge/Badge.view';
import { StatusBadgeText } from '../RequestDetails.style';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';

const Offer = (props: OfferProps) => {
    const { sellerOffer, onOfferDelete } = props

    const history = useHistory()

    const onClickItem = (offer: any) => {
        if (sellerOffer.offers.length > 0) {
            history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(sellerOffer.marketRequest.id, offer.id));
        }
    };

    const renderSubDetails = (offer: any) => (
        <div className="sub-details" >
            <Typography
                weight="700"
                variant="caption"
                style={{
                    fontFamily: "Basis Grotesque Pro",
                }}
                color="shade10"
            >
                {offer.weight}{offer.measurementUnit} – ${offer.price}/{offer.measurementUnit}
            </Typography>
            <Typography
                weight="400"
                variant="caption"
                style={{
                    fontFamily: "Basis Grotesque Pro",
                }}
                color="shade7"
            >
                Specs: {offer.specifications.join(", ")}
            </Typography>
            <div></div>
            <Typography
                weight="400"
                variant="caption"
                style={{
                    fontFamily: "Basis Grotesque Pro",
                }}
                color="shade7"
            >
                Size: {sizeToString(offer.metric, offer.size.from, offer.size.to)}
            </Typography>
        </div>
    )

    const renderStars = () => (
        <StarsContainer>
            {
                [...Array(5).keys()].map((r) =>
                    Number(sellerOffer.company.rating || 0) > r ? (
                        <div style={{ marginRight: "3px" }}>
                            <StarFilled
                                fill={theme.brand.alert}
                                width={12}
                                height={12}
                            />
                        </div>
                    ) : (
                        <div style={{ marginRight: "3px" }}>
                            <Star
                                fill={theme.brand.alert}
                                width={12}
                                height={12}
                            />
                        </div>
                    )
                )
            }
        </StarsContainer>
    )

    const renderOffersForMobile = (offer: any) => {
        return (
            <MarketRequestItemMobileContainer>
                <MajorInfo>
                    <div className="thumbnail-container">
                        {
                            sellerOffer.company.image ?
                                <img src={parseImageUrl(sellerOffer.company.image || '')} alt={Math.random().toString()} /> :
                                <AvatarPlaceholder width="48px" height="48px" borderRadius="8px">
                                    <PlaceholderProfile width={48} height={48} />
                                </AvatarPlaceholder>
                        }
                    </div>

                    <MajorInfoContainer>
                        <Typography variant="label" style={{ lineHeight: '20px' }}>
                            {sellerOffer.company.name}
                        </Typography>

                        {renderStars()}
                    </MajorInfoContainer>
                </MajorInfo>

                <div style={{ marginTop: "8px" }}>
                    {renderSubDetails(offer)}
                </div>

                <div style={{ marginTop: "8px" }}>
                    {renderTags(offer)}
                </div>
            </MarketRequestItemMobileContainer>
        );
    };

    const renderMobile = () => (
        sellerOffer.offers.length > 0 ? (
            sellerOffer.offers.map((offer) => (
                <MarketRequestItemInteractionContainer>
                    <MarketRequestItemInteraction
                        key={offer.id}
                        type={'next'}
                        onClick={() => onClickItem(offer)}
                        leftComponent={renderOffersForMobile(offer)}
                        rightComponent={
                            <div className="cta">
                                <div>
                                    <ChevronRight width={8} height={12} />
                                </div>

                                <Button
                                    iconPosition="before"
                                    icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                                    onClick={(e) => handleTrashIconClick(e, offer.id)}
                                    variant="primary"
                                    size="sm"
                                    className="delete-button"
                                />

                            </div>
                        }
                    />
                </MarketRequestItemInteractionContainer>
            ))
        ) : (
            <EmptyStateView Svg={Crab} height={240} width={249} fluid />
        )
    );

    const handleTrashIconClick = (e: any, offerId: string) => {
        e.stopPropagation();
        onOfferDelete(offerId)
    }

    const renderTags = (offer: any) => (
        <TagsContainer>
            {
                offer.status === 'DECLINED' || offer.status === 'ACCEPTED' ?
                    <Badge
                        id="decline-lost-badge"
                        className="offers-badge"
                        badgeColor={
                            offer.status === 'ACCEPTED' ? theme.brand.success : theme.brand.error
                        }
                    >
                        <StatusBadgeText color="shade1" weight="bold" variant="overline">
                            {offer.status === 'DECLINED' ? 'LOST' : offer.status}
                        </StatusBadgeText>
                    </Badge>
                    :
                    <NoActionsYetBadgesContainer>
                        {
                            offer.price < sellerOffer.marketRequest.averagePrice && (
                                <Badge
                                    className="offers-badge"
                                    badgeColor={theme.brand.success}
                                >
                                    <StatusBadgeText
                                        color="shade1"
                                        weight="bold"
                                        variant="overline"
                                    >
                                        Great Value
                                    </StatusBadgeText>
                                </Badge>
                            )
                        }
                        {
                            offer.price > sellerOffer.marketRequest.averagePrice && (
                                <Badge className="offers-badge" badgeColor={theme.brand.error}>
                                    <StatusBadgeText
                                        color="shade1"
                                        weight="bold"
                                        variant="overline"
                                    >
                                        Above Market
                                    </StatusBadgeText>
                                </Badge>
                            )
                        }
                        {
                            offer.negotiations && (
                                <Badge className="offers-badge" badgeColor="#FFF7F2" padding="5px 8px">
                                    <StatusBadgeText weight="bold" variant="overline" color="warning">
                                        Negotiation
                                    </StatusBadgeText>
                                </Badge>
                            )
                        }
                    </NoActionsYetBadgesContainer>
            }
        </TagsContainer>
    )

    const renderNonMobile = () => {
        return sellerOffer.offers.map(offer =>
            <OfferContainer onClick={() => onClickItem(offer)}>
                <OfferRowContainer>
                    <Col sm={12} md={6} lg={4} style={{ display: "flex", alignItems: "center" }}>
                        {
                            sellerOffer.company.image ?
                                <img
                                    style={{ width: "48px", height: "48px", backgroundColor: "grey", borderRadius: "8px" }}
                                    src={parseImageUrl(sellerOffer.company.image || '')}
                                /> :
                                <AvatarPlaceholder width="48px" height="48px" borderRadius="8px">
                                    <PlaceholderProfile width={48} height={48} />
                                </AvatarPlaceholder>
                        }

                        <MajorInfoNonMobileContainer>
                            <Typography
                                weight="700"
                                variant="label"
                                style={{
                                    fontFamily: "Basis Grotesque Pro",
                                    marginTop: "3px"
                                }}
                                color="shade9"
                            >
                                {sellerOffer.company.name}
                            </Typography>

                            {renderStars()}
                        </MajorInfoNonMobileContainer>
                    </Col>

                    <Col sm={12} md={6} lg={3} >
                        {renderSubDetails(offer)}
                    </Col>

                    <Col className="badges-col" sm={12} md={6} lg={3}>
                        {renderTags(offer)}
                    </Col>

                    <Col className="cta" sm={12} md={6} lg={2} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <Button
                            iconPosition="before"
                            icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                            onClick={(e) => handleTrashIconClick(e, offer.id)}
                            variant="primary"
                            size="sm"
                            className="delete-button"
                            style={{ marginRight: "20px" }}
                        />
                        <div>
                            <ChevronRight width={10} height={10} />
                        </div>
                    </Col>
                </OfferRowContainer>
            </OfferContainer>
        )
    }

    return (
        <>
            <Hidden xs sm>
                {renderNonMobile()}
            </Hidden>
            <Visible xs sm>
                {renderMobile()}
            </Visible>
        </>
    );
}

export default Offer;