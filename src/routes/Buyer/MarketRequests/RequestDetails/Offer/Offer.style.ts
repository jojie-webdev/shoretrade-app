import styled from './../../../../../utils/styled';
import theme from './../../../../../utils/Theme';
import { BREAKPOINTS } from './../../../../../consts/breakpoints';
import { Row, Col } from 'react-grid-system';

export const OfferContainer = styled.div` 
    background: #FFFFFF;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 8px;
    padding: 8px 24px 8px 8px;
    margin-top: 12px;
    cursor: pointer;

    .sub-details{
        @media (max-width: 833px) {
            background-color: red !important;
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    .cta{
        @media (max-width: 833px) {
            margin-top: 15px;
            justify-content: flex-start !important;
        }
    }

    .sub-details{
        @media (max-width: 1199px) {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }

    .delete-button {
        background-color:  ${theme.grey.shade2};
        height: 32px;
        width: 32px;
        border-radius: 12px;
        align-self: center;
        border: 1px solid ${theme.grey.shade4};

        path {
            fill: ${theme.grey.shade7};
        }
    }

    .badges-col{
        display: flex;
        align-items: center;
        justify-content: center !important;

        @media ${BREAKPOINTS['lg']} {
            margin-bottom: 5px !important;
        }
    }
`

export const MarketRequestItemInteractionContainer = styled.div`
    margin-top: 12px;

    .delete-button {
        background-color:  ${theme.grey.shade2};
        height: 32px;
        width: 32px;
        border-radius: 12px;
        align-self: center;
        border: 1px solid ${theme.grey.shade4};

        path {
            fill: ${theme.grey.shade7};
        }
    }

    .cta{
        display: flex;
        align-items: center;
        height: 100px;
        align-content: space-between;
        flex-direction: column;
        justify-content: space-between;
    }
`

export const TagsContainer = styled.div`
    height: 100%; 
    width: 100%;
    align-items: flex-start !important;
    display: flex;

    #decline-lost-badge{
        margin:auto;
    }
`

export const NoActionsYetBadgesContainer = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 1480px) {
        flex-flow: column !important;
    }

    @media (max-width: 991px) {
        display: -webkit-inline-box !important;
    }
`

export const StarsContainer = styled.div`
    display: flex;
    align-items: center;
    height: 12px;
`

export const MajorInfoContainer = styled.div`
    margin-left: 12px;
    display: flex;
    flex-flow: column;
    align-items: baseline;
    justify-content: space-evenly;
    height: 100%;
`

export const OfferRowContainer = styled(Row)`
    display: flex;
    justify-content: space-between;
`

export const MajorInfoNonMobileContainer = styled.div`
    margin-left: 12px;
    display: flex;
    flex-flow: column;
    align-items: baseline;
    justify-content: space-evenly;
    height: 100%;
`