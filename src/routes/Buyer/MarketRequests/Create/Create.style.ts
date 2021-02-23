import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TypographyView from 'components/base/Typography';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const ProgressBar = styled.div<{
  progress: number;
}>`
  border: ${({ theme }) => `2px solid ${theme.brand.success}`};
  width: ${(props) => (props.progress ? `${props.progress}%` : '0px')};
  position: absolute;
  top: 2px;
  left: 0;
`;

export const CreateRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 16px;
`;

export const CreateRequestHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .title-container {
    display: flex;
    flex-direction: row;
  }
`;

export const ContainerWithCategoryImagePreview = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

export const HeroImageContainer = styled.div`
  width: ${pxToRem(300)};
  height: ${pxToRem(300)};
  background-color: ${(props) => props.theme.grey.shade4};
  border-radius: 50%;
  margin: 0 auto;

  .image {
    height: ${pxToRem(306)};
    width: ${pxToRem(306)};
  }
`;

export const MainAgreementContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TextAgreenmentContainer = styled.div`
  display: flex;
  flex-direction: column;

  .text-content {
    max-width: 24rem;
  }

  .checkbox {
    display: flex;
    flex-direction: row;

    margin-top: 12rem;
    width: 16rem;

    .label {
      margin-left: 0.6rem;
    }
  }

  .btn-get-started {
    margin-top: 1rem;
  }
`;

export const HeroRightContainer = styled.div`
  width: 380px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  align-items: flex-start;

  .label {
    margin-left: 4px;
  }
`;
