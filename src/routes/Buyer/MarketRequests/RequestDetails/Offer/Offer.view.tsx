import React from 'react';
import Typography from 'components/base/Typography';
import { Star, StarFilled, TrashCan, PlaceholderProfile } from 'components/base/SVG';
import theme from '../../../../../utils/Theme';
import Button from './../../../../../components/base/Button/Button.view';
import { OfferProps } from './Offer.props';
import { OfferContainer } from './Offer.style';
import ChevronRight from './../../../../../components/base/SVG/ChevronRight';
import { Col, Row } from 'react-grid-system';
import MarketRequestOfferFilterModalView from 'components/module/MarketRequestOfferFilterModal';
import { parseImageUrl } from 'utils/parseImageURL';
import { AvatarContainer, AvatarPreview, AvatarPlaceholder } from './../../../../../components/module/ProductSellerCard/ProductSellerCard.style';
import { sizeToString } from './../../../../../utils/Listing/sizeToString';

const Offer = (props: OfferProps) => {
    const { sellerOffer } = props

    return (
        <>
            {
                sellerOffer.offers.map(offer =>
                    <OfferContainer>
                        <Row style={{ display: "flex", justifyContent: "space-between" }}>
                            <Col sm={12} md={12} xl={4} style={{ display: "flex", alignItems: "center" }}>
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

                                <div style={{
                                    marginLeft: "12px",
                                    display: "flex",
                                    flexFlow: "column",
                                    alignItems: "baseline",
                                    justifyContent: "space-evenly",
                                    height: "100%"
                                }}>
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

                                    <div style={{ display: "flex", alignItems: "center", height: "12px" }}>
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
                                    </div>
                                </div>
                            </Col>

                            <Col className="sub-details" sm={12} md={6} xl={4} >
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
                            </Col>

                            <Col className="cta" sm={12} md={6} xl={4} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                <Button
                                    text="View Offer"
                                    iconPosition="before"
                                    textColor="success"
                                    // onClick={
                                    //   setItemToDelete &&
                                    //   ((e) => {
                                    //     e.stopPropagation();
                                    //     setItemToDelete({ value: mr.id || '' });
                                    //   })
                                    // }
                                    variant="unselected"
                                    size="sm"
                                    style={{ marginRight: "20px", backgroundColor: "#EAFFF9", borderRadius: "8px" }}
                                />
                                <Button
                                    iconPosition="before"
                                    icon={<TrashCan fill={'#FFF'} width={16} height={16} />}
                                    // onClick={
                                    //     setItemToDelete &&
                                    //     ((e) => {
                                    //         e.stopPropagation();
                                    //         setItemToDelete({ value: mr.id || '' });
                                    //     })
                                    // }
                                    variant="primary"
                                    size="sm"
                                    className="delete-button"
                                    style={{ marginRight: "20px" }}
                                />
                                <div>
                                    <ChevronRight width={10} height={10} />
                                </div>
                            </Col>
                        </Row>
                    </OfferContainer>
                )
            }
        </>
    );
}

export default Offer;