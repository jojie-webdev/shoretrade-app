import styled from './../../../../../utils/styled';
import theme from './../../../../../utils/Theme';

export const OfferContainer = styled.div` 
    background: #FFFFFF;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 8px;
    padding: 8px 24px 8px 8px;
    margin-top: 12px;

    @media (max-width: 833px) {
        .sub-details{
            margin-top: 15px;
        }

        .cta{
            margin-top: 15px;
            justify-content: flex-start !important;
        }

    }

    @media (max-width: 1199px) {
        .sub-details{
            margin-top: 15px;
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
`