import React, { useEffect, useState } from 'react';
import { FullOfferDetailsContainer } from './FullOfferDetails.style';
import { Row, Col } from 'react-grid-system';
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

    return (
        <>
            <FullOfferDetailsContainer>
                <Row>
                    <Col>
                        <Typography variant="caption" color="shade6">
                            SPECIFICATION
                        </Typography>
                        <div style={{ marginTop: "12px", padding: "6px 6px", backgroundColor: "#E5E8F5", borderRadius: "8px", width: "fit-content" }}>
                            <Typography weight="900" variant="caption" style={{ fontFamily: "Basis Grotesque Pro", clear: "both" }}>
                                {offer?.specifications?.map((spec: string) => spec?.toUpperCase())?.join(", ")}
                            </Typography>
                        </div>

                        <Typography variant="caption" color="shade6" style={{ marginTop: "24px" }}>
                            SIZE
                        </Typography>
                        <div style={{ marginTop: "12px", padding: "6px 6px", backgroundColor: "#E5E8F5", borderRadius: "8px", width: "fit-content" }}>
                            <Typography weight="900" variant="caption" style={{ fontFamily: "Basis Grotesque Pro", clear: "both" }}>
                                {sizeToString(offer?.metric, offer?.size?.from, offer?.size?.to).toUpperCase()}
                            </Typography>
                        </div>

                        <Typography variant="caption" color="shade6" style={{ marginTop: "24px" }}>
                            QUANTITY
                        </Typography>
                        <div style={{ marginTop: "12px", padding: "6px 6px", backgroundColor: "#E5E8F5", borderRadius: "8px", width: "fit-content" }}>
                            <Typography weight="900" variant="caption" style={{ fontFamily: "Basis Grotesque Pro", clear: "both" }}>
                                {offer?.weight}{" "}{offer?.measurementUnit}
                            </Typography>
                        </div>
                    </Col>
                    <Col xl={3}>
                        <div style={{ display: "flex" }}>
                            {
                                seller?.image ?
                                    <img
                                        style={{ width: "48px", height: "48px", backgroundColor: "grey", borderRadius: "8px" }}
                                        src={parseImageUrl(seller?.image || "")}
                                    /> :
                                    <AvatarPlaceholder width="48px" height="48px" borderRadius="8px">
                                        <PlaceholderProfile width={48} height={48} />
                                    </AvatarPlaceholder>
                            }

                            <Typography
                                weight="400"
                                style={{ marginLeft: "16px", fontFamily: "Basis Grotesque Pro" }}
                                variant="body"
                            >
                                {seller?.name || ""}
                            </Typography>
                        </div>

                        <div style={{ display: "flex", marginTop: "8px", alignItems: "center" }}>
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
                        </div>

                        <Typography variant="label" color="shade7">{Object.values(seller?.address || {}).join(", ")}</Typography>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{
                            background: theme.grey.shade1,
                            border: `1px solid ${theme.grey.shade4}`,
                            borderRadius: "12px",
                            padding: "16px",
                            marginTop: "28px"
                        }}>
                            <Typography variant="caption" color="shade7">
                                TOTAL VALUE
                            </Typography>
                            <Typography variant="title1" color="shade8" style={{ marginTop: "8px" }}>
                                ${(offer?.weight * offer?.price).toFixed(2)}
                            </Typography>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: "24px" }}>
                        <div style={{ display: "flex" }}>
                            <Button
                                onClick={() => handleStartNegotiate()}
                                variant="outline"
                                text="NEGOTIATE"
                                style={{ borderRadius: "12px" }}
                                icon={<Refresh />}
                                disabled={(!thereIsNewOffer && parseFloat(counterOffer) > 0)}
                            />
                            <Button
                                text="ACCEPT"
                                style={{ borderRadius: "12px", marginLeft: "8px" }}
                                icon={<Check />}
                                onClick={() => handleAcceptOffer()}
                                disabled={(!thereIsNewOffer && parseFloat(counterOffer) > 0)}
                            />
                        </div>
                    </Col>
                </Row>
            </FullOfferDetailsContainer>
        </>
    );
}

export default FullOfferDetails;