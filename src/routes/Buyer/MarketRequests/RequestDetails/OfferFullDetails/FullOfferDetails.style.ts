import styled from 'utils/styled';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import { theme } from 'utils/Theme';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';

export const FullOfferDetailsContainer = styled.div`
    background: #FFFFFF;
    border: 1px solid ${({ theme }) => theme.grey.shade4};
    box-sizing: border-box;
    border-radius: 12px;
    padding: 48px;

    @media ${BREAKPOINTS['sm']} {
        padding: 16px;
        border: none;
    }
`;

export const CompanyInfoCol = styled(Col)`
    @media ${BREAKPOINTS['sm']} {
        margin-top: 16px;
    }

    @media (max-width: 1200px) {
        margin-top: 16px;
    }
`

export const TotalPriceContainer = styled.div`
    background: ${({ theme }) => theme.grey.shade1};
    border: 1px solid ${({ theme }) => theme.grey.shade1};
    border-radius: 12px;
    padding: 16px;
    margin-top: 16px;

    @media ${BREAKPOINTS['sm']}{
        border: 1px solid ${({ theme }) => theme.grey.shade4};
    }

    @media ${BREAKPOINTS['md']}{
        margin-top: 16px;
    }
`

export const DetailsValueContainer = styled.div`
    margin-top: 12px;
    padding: 6px 6px;
    background-color: #E5E8F5;
    border-radius: 8px;
    width: fit-content;
`

export const StarContainer = styled.div`
    display: flex;
    margin-top: 8px;
    align-items: center;
`

export const StyledAcceptButton = styled(Button)`
    border-radius: 12px;
    padding: 15px 28px;
    width: 100%;
    height: 100%;
`

export const StyledNegotiateButton = styled(Button)`
    border-radius: 12px;
    padding: 15px 28px;
    width: 100%;
`

export const TagsContainer = styled.div`
    display: flex;
    margin-top: 24px;
`

export const StyledTypography = styled(Typography)`
    font-family: "Basis Grotesque Pro";
    clear: both;
`

export const StyledTypography2 = styled(Typography)`
    margin-left: 16px;
    font-family: Basis Grotesque Pro;
`

export const StyledImage = styled.img`
    width: 48px;
    height: 48px;
    background-color: grey;
    border-radius: 8px;
`

export const StyledNumberRating = styled(Typography)`
    margin-right: 5px;
    margin-top: 3px;
`

export const CTAContainer = styled.div`
    display: flex;
    width: 100%;
    margin-top: 24px;
`

export const StyledNegotiateButtonContainer = styled.div`
    width: 148px;
    margin-right: 10px;
`