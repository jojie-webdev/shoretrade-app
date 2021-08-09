import Button from 'components/base/Button';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const ProgressBar = styled.div<{
  progress: number;
}>`
  border: ${({ theme }) => `2px solid ${theme.brand.success}`};
  width: ${(props) => (props.progress ? `${props.progress}%` : '0px')};
  position: absolute;
  top: -48px;
  left: -48px;

  @media (min-width: 577px) and (max-width: 1200px) {
    top: -24px;
    left: -24px;
  }

  @media ${BREAKPOINTS['sm']} {
    position: fixed;
    top: 0;
    z-index: 999;
  }
`;

export const CreateRequestContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  padding-bottom: 16px;
`;

export const CreateRequestHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  .title-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    align-items: center;
    margin-top: 32px;
  }

  .search-container {
    width: 100%;
    margin-bottom: 24px;
  }

  @media ${BREAKPOINTS['md']} {
    .search-container {
      width: 100%;
    }
  }

  @media ${BREAKPOINTS['sm']} {
    .search-container {
      width: 100%;
    }
  }
`;

export const ContainerWithCategoryImagePreview = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1201px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.grey.noshade};
  width: 65%;
  padding: 48px;
  border: 1px solid #dadff2;
  border-radius: 12px;
  z-index: 2;

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 16vh;
  }
`;

export const ContainerWithCategoryImageContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
`;

export const HeroImageContainer = styled.div`
  background-color: ${(props) => props.theme.grey.shade4};
  border-radius: 50%;
  margin: 0 auto;

  @media ${BREAKPOINTS['md']} {
    width: ${pxToRem(180)};
    height: ${pxToRem(180)};
  }

  @media ${BREAKPOINTS['sm']} {
    width: ${pxToRem(180)};
    height: ${pxToRem(180)};
  }

  .image {
    height: ${pxToRem(306)};
    width: ${pxToRem(306)};

    @media ${BREAKPOINTS['md']} {
      width: ${pxToRem(186)};
      height: ${pxToRem(180)};
    }

    @media ${BREAKPOINTS['sm']} {
      width: ${pxToRem(186)};
      height: ${pxToRem(186)};
    }
  }
`;

export const MainAgreementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  .checkbox {
    display: flex;
    flex-direction: row;
    flex: 0 1 auto;

    margin-top: 1rem;
    width: 16rem;

    .label {
      margin-left: 0.6rem;
    }
  }
  .btn-get-started {
    max-width: 325px;
    margin-top: 1rem;

    @media ${BREAKPOINTS['sm']} {
      max-width: 100%;
    }
  }

  .terms-and-conditions {
    cursor: pointer;
    text-decoration: underline;
    // &:hover {
    //   text-decoration: underline;
    // }
  }
`;

export const TextAgreementContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  .text-content {
    max-width: 24rem;
    margin-bottom: 1rem;

    @media ${BREAKPOINTS['md']} {
      max-width: 80%;
      text-align: justify;
    }

    @media ${BREAKPOINTS['sm']} {
      max-width: 100%;
      text-align: justify;
    }
  }
`;

export const HeroContainer = styled.div`
  width: 380px;

  @media ${BREAKPOINTS['sm']} {
    width: 100%;
    text-align: justify;
  }
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  align-items: flex-start;

  .label {
    margin-left: 4px;
  }
`;

export const HeaderContainer = styled.div`
  margin-bottom: 40px;
`;

export const GetStartedButton = styled(Button)`
  max-width: 310.67px;
  border-radius: 12px;
`;

export const TopAbsoContainer = styled.div`
  position: absolute;
  top: -10%;
  right: 0;
`;

export const TopGroupContainer = styled.div`
  position: absolute;
  top: -2%;
  right: 10%;
`;

export const BottomAbsoContainer = styled.div`
  position: absolute;
  bottom: -10%;
  right: -10%;
`;

export const BottomGroupContainer = styled.div`
  position: absolute;
  bottom: -2%;
  right: 10%;
`;

export const LeftAbsoContainer = styled.div`
  position: absolute;
  bottom: -10%;
  left: -6%;
`;

export const LeftGroupContainer = styled.div`
  position: absolute;
  bottom: -5%;
  left: 21%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

export const RequestRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-around;
`;

export const RequestDetailsContainer = styled.div<{ currentStep?: number }>`
  width: 35%;
  z-index: 2;
  background-color: ${({ theme }) => theme.grey.noshade};
  padding: 48px;
  border: 1px solid #dadff2;
  border-radius: 12px;
  margin-top: 16px;

  margin-left: 16px;
  min-height: 312px;
  max-height: 312px;
`;

export const DetailsHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #dadff2;
  margin-top: -16px;
  margin-left: -8px;
  margin-bottom: 16px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -16px;
  margin-left: -8px;
  margin-bottom: 16px;
`;

export const DetailsContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -8px;
  margin-bottom: 16px;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailsDataContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MultipleTopAbsoContainer = styled.div`
  position: absolute;
  top: 0%;
  right: 0;
`;

export const MultipleTopGroupContainer = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
`;

export const MultipleBottomAbsoContainer = styled.div`
  position: absolute;
  bottom: -10%;
  right: -10%;
`;

export const MultipleBottomGroupContainer = styled.div`
  position: absolute;
  bottom: 0%;
  right: 2%;
`;

export const MultipleLeftAbsoContainer = styled.div`
  position: absolute;
  bottom: 15%;
  left: -10%;
`;

export const MultipleLeftGroupContainer = styled.div`
  position: absolute;
  bottom: 5%;
  left: -2%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const PreviousButton = styled(Button)`
  border-radius: 12px;
  max-width: 64px;
  margin-top: auto;
`;

export const ProceedButton = styled(Button)`
  border-radius: 12px;
  max-width: 124px;
  margin-left: 8px;
`;
