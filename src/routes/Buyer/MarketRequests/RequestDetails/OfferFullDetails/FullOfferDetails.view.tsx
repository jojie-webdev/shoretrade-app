import React, { useEffect, useState } from 'react';
import {
    FullOfferDetailsContainer,
    CompanyInfoCol,
    TotalPriceContainer,
    DetailsValueContainer,
    StarContainer,
    StyledAcceptButton,
    TagsContainer,
    StyledTypography,
    StyledTypography2,
    StyledImage
} from './FullOfferDetails.style';
import { Row, Col, Hidden, Visible } from 'react-grid-system';
import Typography from 'components/base/Typography';
import theme from 'utils/Theme';
import Button from '../../../../../components/base/Button/Button.view';
import Refresh from '../../../../../components/base/SVG/Refresh';
import Check from '../../../../../components/base/SVG/Check';
import { parseImageUrl } from 'utils/parseImageURL';
import { AvatarPlaceholder } from 'components/module/ProductSellerCard/ProductSellerCard.style';
import { PlaceholderProfile, Star, StarFilled } from 'components/base/SVG';
import { sizeToString } from 'utils/Listing';
import { useSelector } from 'react-redux';
import { Store } from '../../../../../types/store/Store';
import { useLocation } from 'react-router-dom';
import Badge from 'components/base/Badge/Badge.view';
import { StatusBadgeText } from '../RequestDetails.style';
import { NoActionsYetBadgesContainer } from '../Offer/Offer.style';

const FullOfferDetails = (props: any) => {
    const { handleStartNegotiate, handleAcceptOffer, isAccepted, thereIsNewOffer, counterOffer, newOffer } = props

    const location = useLocation()
    const splits = location.pathname.split("/")
    const offerId = splits[splits.length - 1]

    const activeOffers = useSelector((store: Store) => store.getActiveOffers);
    const [offer, setOffer] = useState<any>({})
    const [seller, setSeller] = useState<any>({})

    useEffect(() => {
        activeOffers.data?.data.marketOffers.forEach(marketOffer =>
            marketOffer.offers.forEach(offer => {
                if (offer.id === offerId) {
                    setOffer(offer)
                    return
                }
            })
        )

        activeOffers.data?.data.marketOffers.forEach(marketOffer => {
            marketOffer.offers.forEach(offer => {
                if (offer.id === offerId) {
                    setSeller(marketOffer.company)
                    return
                }
            })
        })
    }, [offerId])

    const renderTotalPriceContainer = () => (
        <TotalPriceContainer>
            <Typography variant="caption" color="shade7">
                TOTAL VALUE
            </Typography>
            <Typography variant="title3" color="shade8" style={{ marginTop: "8px" }}>
                ${(offer?.weight * offer?.price).toFixed(2)}
            </Typography>
        </TotalPriceContainer>
    )

    const renderOfferSeenTextContainer = () => (
        <div style={{ marginTop: "16px" }}>
            {!isAccepted && (
                <>
                    {!thereIsNewOffer && counterOffer === '' && (
                        <div className="computation-item-container">
                            <Typography variant="label" color="shade9">
                                You have received an offer by the Seller. Either click
                                accept or negotiate to proceed.
                            </Typography>
                        </div>
                    )}

                    {thereIsNewOffer && counterOffer === newOffer && (
                        <div className="computation-item-container">
                            <Typography variant="label" color="shade9">
                                You have received an offer by the Seller. Either click
                                accept or negotiate to proceed.
                            </Typography>
                        </div>
                    )}

                    {!thereIsNewOffer && parseFloat(counterOffer) > 0 && (
                        <div className="computation-item-container">
                            <Typography variant="label" color="shade9">
                                The seller is reviewing your offer.
                            </Typography>
                        </div>
                    )}
                </>
            )}
        </div>
    )

    const renderCTA = () => (
        <div style={{ display: "flex" }}>
            <Button
                onClick={() => handleStartNegotiate()}
                variant="outline"
                text="NEGOTIATE"
                style={{ borderRadius: "12px" }}
                icon={<Refresh />}
                disabled={(!thereIsNewOffer && parseFloat(counterOffer) > 0)}
            />
            <StyledAcceptButton
                text="ACCEPT"
                icon={<Check />}
                onClick={() => handleAcceptOffer()}
                disabled={(!thereIsNewOffer && parseFloat(counterOffer) > 0)}
            />
        </div>
    )

    const renderTags = () => (
        <TagsContainer>
            {
                offer.status === 'DECLINED' || offer.status === 'ACCEPTED' ?
                    <Badge
                        id="status-badge"
                        className="offers-badge"
                        badgeColor={
                            offer.status === 'ACCEPTED' ? "#EAFFF9" : theme.brand.error
                        }
                    >
                        <StatusBadgeText color="success" weight="bold" variant="overline">
                            {offer.status === 'DECLINED' ? 'LOST' : offer.status}
                        </StatusBadgeText>
                    </Badge>
                    :
                    <NoActionsYetBadgesContainer>
                        {
                            offer.price < seller.averagePrice && (
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
                            offer.price > seller.averagePrice && (
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

    return (
        <>
            <FullOfferDetailsContainer>
                <Row>
                    <Col>
                        <Typography variant="caption" color="shade6">
                            SPECIFICATION
                        </Typography>
                        <DetailsValueContainer>
                            <StyledTypography weight="900" variant="caption">
                                {offer?.specifications?.map((spec: string) => spec?.toUpperCase())?.join(", ")}
                            </StyledTypography>
                        </DetailsValueContainer>

                        <Typography variant="caption" color="shade6" style={{ marginTop: "24px" }}>
                            SIZE
                        </Typography>
                        <DetailsValueContainer>
                            <StyledTypography weight="900" variant="caption">
                                {sizeToString(offer?.metric, offer?.size?.from, offer?.size?.to).toUpperCase()}
                            </StyledTypography>
                        </DetailsValueContainer>

                        <Typography variant="caption" color="shade6" style={{ marginTop: "24px" }}>
                            QUANTITY
                        </Typography>
                        <DetailsValueContainer>
                            <StyledTypography weight="900" variant="caption">
                                {offer?.weight}{" "}{offer?.measurementUnit}
                            </StyledTypography>
                        </DetailsValueContainer>
                    </Col>
                    <CompanyInfoCol xl={3}>
                        <div style={{ display: "flex" }}>
                            {
                                seller?.image ?
                                    <StyledImage src={parseImageUrl(seller?.image || "")} /> :
                                    <AvatarPlaceholder width="48px" height="48px" borderRadius="8px">
                                        <PlaceholderProfile width={48} height={48} />
                                    </AvatarPlaceholder>
                            }

                            <StyledTypography2
                                weight="400"
                                variant="body"
                            >
                                {seller?.name || ""}
                            </StyledTypography2>
                        </div>

                        <StarContainer>
                            <Typography variant="label" style={{ marginRight: "5px" }}>{seller?.rating || 0}</Typography>
                            {
                                [...Array(5).keys()].map((r) =>
                                    Number(seller?.rating || 0) > r ? (
                                        <div style={{ marginRight: "3px" }}>
                                            <StarFilled
                                                fill={theme.brand.alert}
                                                width={13}
                                                height={13}
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ marginRight: "3px" }}>
                                            <Star
                                                fill={theme.brand.alert}
                                                width={13}
                                                height={13}
                                            />
                                        </div>
                                    )
                                )
                            }
                        </StarContainer>

                        <Typography variant="label" color="shade7">{Object.values(seller?.address || {}).join(", ")}</Typography>
                    </CompanyInfoCol>
                </Row>
                <Hidden xs sm>
                    <Row>
                        <Col>
                            {renderTotalPriceContainer()}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {renderTags()}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            {renderOfferSeenTextContainer()}
                        </Col>
                    </Row>
                    {
                        offer.status !== "ACCEPTED" &&
                        <Row>
                            <Col style={{ marginTop: "24px" }}>
                                {renderCTA()}
                            </Col>
                        </Row>
                    }

                </Hidden>
            </FullOfferDetailsContainer>

            <Visible xs sm>
                <Row>
                    <Col>
                        {renderTotalPriceContainer()}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        {renderOfferSeenTextContainer()}
                    </Col>
                </Row>
                {
                    offer.status !== "ACCEPTED" &&
                    <Row>
                        <Col style={{ marginTop: "24px" }}>
                            {renderCTA()}
                        </Col>
                    </Row>
                }
            </Visible>
        </>
    );
}

export default FullOfferDetails;