import TextField from 'components/base/TextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const StyledTextField = styled(TextField)<{ noMargin?: boolean }>`
  flex: 1;
  margin-right: ${({ noMargin }) => (noMargin ? '0' : '24px')};
  width: 100%;
  margin-bottom: 16px;
  min-width: 426px;

  > div {
    border-radius: 8px;
  }

  @media ${BREAKPOINTS.sm} {
    margin-right: 0;
    min-width: 100%;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: flex-end; */
  padding: 24px 0 36px 0;

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  .btn-add {
    border-radius: 8px;
    max-width: 94px;
    padding: 14px 16px;
  }

  @media ${BREAKPOINTS.sm} {
    width: 100%;
  }
`;
