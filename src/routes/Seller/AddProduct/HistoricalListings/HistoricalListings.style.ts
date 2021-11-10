import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: 680px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.grey.shade9};
  padding: 24px;
  border-radius: 12px;
`;

export const GetStartedCard = styled(Card)`
  @media (min-width: 681px) {
    margin-right: 10px;
  }

  .iconContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 48px 0px;

    @media (max-width: 680px) {
      display: none;
    }
  }

  .actionContainer {
    display: flex;
    flex-direction: row;
    @media (max-width: 680px) {
      margin-top: 32px;
    }

    button {
      width: 50%;
    }

    button:not(:first-child) {
      margin-left: 8px;
    }
  }
`;

export const HistoricalListingsCard = styled(Card)`
  flex: 1.5;
  @media (min-width: 681px) {
    margin-left: 10px;
  }
  @media (max-width: 680px) {
    margin-top: 16px;
  }

  .searchFieldContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 24px 0px;
  }
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.grey.noshade};
  font-family: Media Sans;
  font-weight: bold;
  font-size: 20px;
  line-height: 32px;
`;

export const Description = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade7};
  font-weight: 400;
  margin-top: 2px;
`;

export const ListingCard = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 24px 8px 8px;
  background: #050e16;
  border-radius: 12px;
  margin-bottom: 8px;

  .previewImage {
    width: 56px;
    height: 56px;
    border-radius: 6px;
  }

  .textDetailsContainer {
    margin-left: 12px;
    display: flex;
    flex: 1;
    flex-direction: column;

    p:not(:first-child) {
      margin-top: 2px;
    }
  }
`;
