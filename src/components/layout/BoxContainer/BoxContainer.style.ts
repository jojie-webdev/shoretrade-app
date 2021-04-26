import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 48px;
  background: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade8 : theme.grey.shade2};
  border: ${({ theme }) => {
    if (theme.appType === 'seller') return 'none';

    return `2px solid ${theme.grey.shade3}`;
  }};
  border-radius: 8px;

  @media ${BREAKPOINTS['md']} {
    padding: 24px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 16px;
    background: none;
    border: 0;
  }
`;
