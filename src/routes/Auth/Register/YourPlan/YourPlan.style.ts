import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  margin-top: 8px;
`;

export const TopSection = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media ${BREAKPOINTS['sm']} {
    display: grid;
    grid-row-gap: 10px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const ChangeMarketSector = styled.div<{
  isSeller: boolean;
}>`
  margin-left: 50px;
  @media ${BREAKPOINTS['sm']} {
    margin-left: 0;
  }
  padding: 8px;
  border-radius: 12px;
  background: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  ${({ theme }) =>
    theme.appType !== 'seller' ? `border: 1px solid ${theme.grey.shade3};` : ''}
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 150px;
  min-width: 85px;

  p {
    text-align: center;
  }

  .change-btn:hover {
    cursor: pointer;
  }
`;

export const AdditionalSubscription = styled.div`
  margin-top: ${({ theme }) => (theme.appType === 'seller' ? '0' : '32px')};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckboxContainer = styled.div`
  padding: 4px;
`;

export const Footer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap 8px;
`;

export const BenefitsList = styled.ul`
  margin-top: 32px;
  margin-left: 32px;
  display: flex;
  flex-direction: column;
  gap 8px;

  li {
    color: ${({ theme }) => theme.grey.shade6}
  }
`;

export const ReverseMarketFreePerks = styled.div`
  margin-left: 50px;
  margin-bottom: 16px;
`;
export const ReverseMarketPerkItems = styled.div`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
`;
