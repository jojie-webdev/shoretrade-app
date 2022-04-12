import Accordion from 'components/base/Accordion';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const SpeciesContainer = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }

  .search-row {
    margin-bottom: 24px;
  }

  .items-row {
    .market-item {
      display: block;
      margin-bottom: 8px;
    }
  }
  .accordion-content-wrapper {
    background: ${({ theme }) => theme.grey.shade9};
  }
`;

export const SpinnerContainer = styled.div`
  margin-top: 15px;
`;

export const Space = styled.div`
  margin-top: 24px;
`;

export const ProductTagsContainer = styled.div`
  display: flex;

  > div {
    margin-right: 8px;
  }
`;

export const ProductsAccordion = styled(Accordion)``;
