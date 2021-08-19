import Checkbox from 'components/base/Checkbox';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div``;

export const CustomCheckBoxContainer = styled.div`
  width: 156px;
  height: 128px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${BREAKPOINTS['sm']} {
    width: 150px;
  }

  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade8 : theme.grey.shade1};
`;

export const OptionsContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
  padding: 16px;
  display: grid;
  grid-template-columns: 156px 156px 156px 156px;

  row-gap: 10px;
  column-gap: 10px;

  @media ${BREAKPOINTS['sm']} {
    grid-template-columns: 150px 150px;
    padding: 8px;
  }
  border-radius: 0px 0px 8px 8px;
`;

export const StyledCheckbox = styled(Checkbox)``;

export const LeftComponentContainer = styled.div`
  display: flex;
  align-items: center;
  .icon-container {
    margin-right: 8px;
  }
`;

export const TextIndicatorsContainer = styled.div`
  display: flex;
  .text-indicator {
    margin-right: 10px;
  }
`;
