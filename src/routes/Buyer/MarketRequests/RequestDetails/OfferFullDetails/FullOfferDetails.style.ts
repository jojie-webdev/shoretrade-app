import styled from 'utils/styled';
import { BREAKPOINTS } from 'consts/breakpoints';

export const FullOfferDetailsContainer = styled.div`
    background: #FFFFFF;
    border: 1px solid ${({ theme }) => theme.grey.shade4};
    box-sizing: border-box;
    border-radius: 12px;
    padding: 48px;

    @media ${BREAKPOINTS['sm']} {
        padding: 16px;
    }
`;