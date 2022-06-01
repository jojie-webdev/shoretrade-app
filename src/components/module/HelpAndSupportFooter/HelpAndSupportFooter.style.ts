import { Chat, EnvelopeAlt } from 'components/base/SVG';
import styled from 'utils/styled';

export const Container = styled.div`
  margin-top: 48px;
  .help_and_support__contact {
    display: flex;
    gap: 20px;
    margin-top: 24px;
    justify-content: center;

    @media (max-width: 576px) {
      display: grid;
      gap: 8px;
      margin-top: 8px;
      justify-content: normal;
    }
  }
`;

export const Text1 = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export const Content1 = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 32px 16px 18px;
  background: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
  box-shadow: 0px 4px 12px rgb(41 43 50 / 4%);
  border-radius: 12px;
  cursor: pointer;

  @media (min-width: 577px) {
    max-width: 393px;
    width: 100%;
  }

  a {
    color: ${({ theme }) => theme.brand.primary};
    font-weight: 700;
  }
`;

export const Content3 = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 32px 16px 18px;
  background: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
  box-shadow: 0px 4px 12px rgb(41 43 50 / 4%);
  border-radius: 12px;
  cursor: pointer;

  @media (min-width: 577px) {
    max-width: 393px;
    width: 100%;
  }

  b {
    color: ${({ theme }) => theme.brand.primary};
  }
`;

export const ChatWrapper = styled(Chat)`
  width: 25px;
  height: 24px;
`;

export const EnvelopeAltWrapper = styled(EnvelopeAlt)`
  width: 25px;
  height: 24px;
`;
