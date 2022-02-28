import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  background: ${({ theme }) => theme.grey.noshade};
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.grey.shade3};
  color: ${({ theme }) => theme.grey.shade7};
  user-select: none;
  font-size: 14px;
  justify-content: flex-end;
  flex-wrap: wrap;

  @media ${BREAKPOINTS['sm']} {
    justify-content: center;
  }

  select {
    border: none;
    margin-left: 8px;
  }

  button {
    background: transparent;
    border: 0;
    width: 40px;
    height: 40px;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
