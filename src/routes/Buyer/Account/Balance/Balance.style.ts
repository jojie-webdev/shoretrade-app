import Interactions from 'components/base/Interactions';
import InteractionCreditCard from 'components/module/InteractionCreditCard';
import styled from 'utils/styled';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-content: space-between;

  /* padding: 24px;
  margin: -24px;
  margin-bottom: 8px;
  background-color: ${(
    props
  ) => props.theme.grey.noshade}; */

  & > * {
    display: flex;
    align-items: flex-start;
    flex-flow: column nowrap;
    flex-grow: 1;
    padding: 0px 5px;
  }
`;

export const ContentLeft = styled.div`
  & > * {
    margin-bottom: 18px;
  }
`;

export const ContentRight = styled.div`
  & > * {
    margin-bottom: 18px;
  }
`;

export const CreditBalance = styled.div``;

export const TopContainer = styled.div`
  padding: 24px;
  margin: -24px;
  margin-bottom: 8px;
  background-color: ${(props) => props.theme.grey.noshade};
`;

export const Footer = styled.div`
  padding: 16px 24px 16px 24px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.grey.shade2};
`;

export const CreditWrapper = styled.div`
  margin-top: 8px;
`;

export const LinkCreditHistory = styled(Interactions)`
  margin-bottom: 18px;
`;

export const LinkCreditCard = styled(InteractionCreditCard)`
  max-height: 70px;
`;
