import TextField from 'components/base/TextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const StyledTextField = styled(TextField)<{ noMargin?: boolean }>`
  flex: 1;
  margin-right: ${({ noMargin }) => (noMargin ? '0' : '24px')};

  @media ${BREAKPOINTS.sm} {
    margin-right: 0;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`;

export const Inputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 24px 0 36px 0;

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media ${BREAKPOINTS.sm} {
    width: 100%;
  }
`;
