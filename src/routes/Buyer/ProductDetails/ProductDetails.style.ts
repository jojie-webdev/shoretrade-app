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
  width: 100%;
  max-width: 100%;

  .swiper-pagination-bullets {
    background: ${({ theme }) => theme.grey.shade7};
    display: none;
  }

  .swiper-container {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }

  .swiper-wrapper {
    padding-inline-start: 0;
  }

  .swiper-slide {
    height: 297px;
    padding: 16px;
    border-radius: 4px;
    box-shadow: 0px 0px 0px;
  }
  height: 297px; /**Controls the height of carousel */
  margin-bottom: 16px;

  .swiper-button-prev {
    color: ${({ theme }) => theme.grey.shade7};
    width: 18px;
    height: 11px;
    margin-top: 4px;
  }

  .swiper-button-next {
    color: ${({ theme }) => theme.grey.shade7};
    width: 18px;
    height: 11px;
    margin-top: 4px;
  }
`;

export const Image = styled.img`
  width: 65vw;
  height: 295px;
  margin-left: 103px;
  object-fit: cover;
  border-radius: 4px;
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
  border-width: ${({ fishermanNotes }) =>
    fishermanNotes ? '1px 2px 1px 2px' : '1px 2px 2px 2px'};
  border-radius: ${({ fishermanNotes }) =>
    fishermanNotes ? '0' : '0 0 8px 8px'};
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
