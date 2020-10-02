import styled from 'utils/styled';

export const Container = styled.div`
  flex-direction: row;
  padding: 8px;

  .description {
    text-align: center;
    padding: 24px;
  }
`;

export const BannerContainer = styled.div`
  margin-bottom: 16px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const SellerRatingContainer = styled.div<{ fishermanNotes?: string }>`
  padding: 16px;
  background-color: ${({ theme }) => theme.grey.noshade};
  border: 2px solid #edeffa;
`;

export const BoxContainer = styled.div`
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const DesiredQuantityContainer = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.grey.noshade};
  border-color: ${({ theme }) => theme.grey.shade2};
  border-width: 2px 2px 1px 1px;
  border-radius: 8px 8px 0 0;
  border-top-left-radius: 0px;
  border: 2px solid #edeffa;
  height: 100%;
`;

export const TextFieldWrapper = styled.div`
  margin-top: 16px;
`;

export const RemainingWrapper = styled.div`
  margin-top: 8px;
`;

export const BoxRadioContainer = styled.div`
  margin-top: 8px;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
`;
