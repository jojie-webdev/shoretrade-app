import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 152px;
  height: 172px;
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.shade1};
  box-shadow: ${({ theme }) =>
    theme.appType === 'seller'
      ? 'unset'
      : '0px 6px 12px rgba(41, 43, 50, 0.12)'};
  border-radius: 8px;

  @media ${BREAKPOINTS['sm']} {
    width: 150px;
    height: 172px;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 8px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
  padding-bottom: 10px;
`;

export const SectorLabel = styled(Typography)`
  text-align: center;
`;
