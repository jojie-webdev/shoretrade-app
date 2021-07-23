import Button from 'components/base/Button';
import styled from 'utils/styled';

import { ContainerWithCategoryImageContent } from '../Create.style';

export const SpecificationFormContainer = styled(
  ContainerWithCategoryImageContent
)`
  .spec-row {
    min-width: 180px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    div {
      margin-right: 4rem;
      margin-bottom: 1rem;
      width: 120px;
      display: flex;
      align-items: flex-start;
    }
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProceedButton = styled(Button)`
  border-radius: 12px;
  max-width: 124px;
  margin-left: 8px;
`;

export const PreviousButton = styled(Button)`
  border-radius: 12px;
  max-width: 64px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-around;
`;

export const RequestDetailsContainer = styled.div`
  width: 35%;
  background-color: ${({ theme }) => theme.grey.noshade};
  padding: 48px;
  border: 1px solid #dadff2;
  border-radius: 12px;
  margin-top: 16px;
  min-height: 312px;
`;

export const AnchorContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dadff2;
  margin-top: -16px;
  margin-left: -8px;
  margin-bottom: 16px;
  min-width: 263px;
`;
