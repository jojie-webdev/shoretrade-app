import styled from 'utils/styled';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import { theme } from 'utils/Theme';

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
    margin-top: 28px;

    @media ${BREAKPOINTS['sm']}{
        border: 1px solid ${({ theme }) => theme.grey.shade4};
    }

    @media ${BREAKPOINTS['md']}{
        margin-top: 16px;
    }
`