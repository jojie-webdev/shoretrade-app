import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import styled, { css } from 'utils/styled';

export const Container = styled.div`
  flex-direction: row;
  padding: 8px;

  .description {
    text-align: center;
    padding: 24px;
  }

  .wrapper {
    width: calc(100% - 200px);
    margin: auto;

    @media ${BREAKPOINTS['sm']} {
      width: 100%;
    }

    @media ${BREAKPOINTS['md']} {
      width: calc(100% - 150px);
    }
  }
`;

export const BannerContainer = styled.div`
  margin-bottom: 16px;
  width: 100%;
  max-width: 100%;

  img {
    position: relative;
    object-fit: contain;
    max-width: 844px;
    width: 100%;
    max-height: 633px;
    left: 50%;
    top: 50%;
    border-radius: 4px;
    -webkit-transform: translateY(-50%) translateX(-50%);
  }
`;

export const DetailsContainer = styled(Row)`
  height: 100%;
`;

export const SellerRatingContainer = styled.div<{ fishermanNotes?: string }>`
  padding: 16px;
  background-color: ${({ theme }) => theme.grey.noshade};
  border-color: ${({ theme }) => theme.grey.shade2};

  border: 2px solid #edeffa;

  @media (max-width: 991px) {
    border-width: 2px 2px 1px 2px;
    border-radius: 0 0 0 0;
  }

  @media (min-width: 992px) {
    border-width: 2px 2px 1px 2px;
    border-radius: 0px 0px 8px 8px;
    border-bottom-right-radius: 0px;
  }
`;

export const BoxContainer = styled.div`
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const DesiredQuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: ${({ theme }) => theme.grey.noshade};
  border-color: ${({ theme }) => theme.grey.shade2};
  border: 2px solid #edeffa;
  height: 100%;

  @media (max-width: 991px) {
    border-width: 1px 2px 2px 2px;
    border-radius: 0 0 8px 8px;
  }

  @media (min-width: 992px) {
    border-left: 0px;
    border-radius: 8px 8px 8px 8px;
    border-width: 2px 2px 1px 1px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  .content {
    display: flex;
    /* background-color: #000; */
    flex: 1;
    flex-direction: column;
    /* height: 100%; */
  }
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
  margin-top: 32px;
`;
