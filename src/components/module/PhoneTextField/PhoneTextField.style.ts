import Typography from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { fontStyle } from 'consts/textField';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const CountryContainer = styled.div`
  margin-right: 16px;
`;

export const Country = styled.div<{ readOnly?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 4px;
  height: 48px;
  width: 88px;
  border-radius: 4px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.grey.shade5};
  color: ${({ theme }) => theme.grey.shade9};
  background-color: ${({ readOnly, theme }) =>
    readOnly ? theme.grey.shade3 : theme.grey.noshade};
  cursor: pointer;
  ${fontStyle};
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;

export const InteractionsContainer = styled.div`
  margin-top: 15px;
`;

export const Results = styled.div`
  overflow-y: scroll;
  max-height: 50vh;

  @media ${BREAKPOINTS['sm']} {
    max-height: 100%;
  }
`;
