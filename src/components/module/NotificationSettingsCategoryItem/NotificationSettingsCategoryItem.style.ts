import Checkbox from 'components/base/Checkbox';
import styled from 'utils/styled';

export const Container = styled.div``;

export const CustomCheckBoxContainer = styled.div`
  width: 156px;
  height: 128px;
  border-radius: 8px;
  margin-right: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade8 : theme.grey.noshade};
`;

export const OptionsContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.shade1};
  padding: 16px;
  display: flex;
  align-items: center;
  border-radius: 0px 0px 8px 8px;
`;

export const StyledCheckbox = styled(Checkbox)``;

export const LeftComponentContainer = styled.div`
  display: flex;
  .icon-container {
    margin-right: 8px;
  }
`;

export const RightComponentContainer = styled.div`
  display: flex;
  .text-indicator {
    margin-right: 10px;
  }
`;
