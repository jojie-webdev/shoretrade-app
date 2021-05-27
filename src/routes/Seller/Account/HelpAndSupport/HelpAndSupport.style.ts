import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .help-text {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    margin: 0;
    margin-bottom: 24px;

    span {
      color: ${(props) => props.theme.brand.primary};
    }
  }

  .accordion-container {
    margin-bottom: 8px;
  }
`;
