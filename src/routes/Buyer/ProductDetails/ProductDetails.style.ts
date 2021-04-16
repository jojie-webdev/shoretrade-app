import Button from 'components/base/Button';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import styled, { css } from 'utils/styled';

export const Container = styled.div`
  flex-direction: row;
  padding: 8px;

  .description {
    text-align: center;
    margin-bottom: 16px;
  }
`;

export const BannerContainer = styled.div`
  margin-bottom: 8px;
  width: 100%;
  max-width: 100%;

  .placeholder {
    margin: auto;
    display: block;
    border: 0;
    width: 100%;
    height: 295px;
    object-fit: contain;
  }
`;

export const DetailsContainer = styled(Row)`
  height: 100%;

  .title {
    margin-bottom: 1rem;
  }
`;



export const BoxContainer = styled.div`
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const DesiredQuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;

  @media (max-width: 991px) {
    border-width: 1px 2px 2px 2px;
    border-radius: 0 0 8px 8px;
  }

  @media (min-width: 992px) {
    border-radius: 8px;
    border-width: 2px;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .box-loading {
    display: flex;
    flex-direction: column;
    padding-top: 48px;
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
  display: flex;
  justify-content: flex-end;
`;

export const AddToCartButton = styled(Button)`
  @media ${BREAKPOINTS['sm']} {
    width: 50%;
  }
`;
