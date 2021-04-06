import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
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
  }

  .search-container {
    width: 308px;
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
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const ContainerWithCategoryImageContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  margin-left: 4rem;

  @media ${BREAKPOINTS['lg']} {
    margin-left: 0;
  }

  @media ${BREAKPOINTS['md']} {
    margin-left: 0;
  }

  @media ${BREAKPOINTS['sm']} {
    margin-left: 0;
  }
`;

export const HeroImageContainer = styled.div`
  width: ${pxToRem(300)};
  height: ${pxToRem(300)};
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

    margin-top: 8rem;
    width: 16rem;

    .label {
      margin-left: 0.6rem;
    }
  }
  .btn-get-started {
    max-width: 325px;
    margin-top: 1rem;
  }

  .terms-and-conditions {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
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
