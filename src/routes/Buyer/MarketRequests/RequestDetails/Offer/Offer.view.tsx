import React from 'react';
import Typography from 'components/base/Typography';
import { Star, StarFilled, TrashCan } from 'components/base/SVG';
import theme from '../../../../../utils/Theme';
import Button from './../../../../../components/base/Button/Button.view';
import { OfferProps } from './Offer.props';
import { OfferContainer } from './Offer.style';
import ChevronRight from './../../../../../components/base/SVG/ChevronRight';
import { Col, Row } from 'react-grid-system';
import MarketRequestOfferFilterModalView from 'components/module/MarketRequestOfferFilterModal';

const Offer = (props: OfferProps) => {
    return (
        <OfferContainer>
            <Row style={{ display: "flex", justifyContent: "space-between" }}>
                <Col sm={12} md={12} xl={4} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "48px", height: "48px", backgroundColor: "grey", borderRadius: "8px" }}>image</div>
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
                            Seller Name
                        </Typography>

                        <div style={{ display: "flex", alignItems: "center", height: "12px" }}>
                            {
                                [...Array(5).keys()].map((r) =>
                                    Number(3 || 0) > r ? (
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
                        100kg – $59/kg
                    </Typography>
                    <Typography
                        weight="400"
                        variant="caption"
                        style={{
                            fontFamily: "Basis Grotesque Pro",
                        }}
                        color="shade7"
                    >
                        Specs: Live, Fresh, Cleaned
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
                        Size: Baby, Medium, Large
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
    );
}

export default Offer;