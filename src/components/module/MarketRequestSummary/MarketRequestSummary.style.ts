import styled from 'utils/styled';

import marketRequestSummary from '../../../res/images/market-request-summary-bg.png';

export const Container = styled.div`
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.grey.noshade};
  padding: 40px 30px;
  border: 1px solid #dadff2;
  border-radius: 12px;
  min-height: 312px;
  margin: 16px 0px;
  background-image: url(${marketRequestSummary});
`;

export const DetailsHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dadff2;
  margin-top: -16px;
  margin-left: -8px;
  margin-bottom: 16px;
`;

export const DetailsDataContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DetailsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -8px;
  margin-bottom: 16px;
`;
