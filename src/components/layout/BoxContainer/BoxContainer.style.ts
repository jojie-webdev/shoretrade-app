import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 48px;
  background: ${(props) => props.theme.grey.shade2};
  border: 2px solid ${(props) => props.theme.grey.shade3};
  border-radius: 8px;

  @media ${BREAKPOINTS['md']} {
    padding: 32px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 16px;
  }
`;
