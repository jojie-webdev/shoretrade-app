import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div``;

export const CustomInteractions = styled(Interactions)`
  padding: 16px;
`;

export const LeftComponent = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const RightComponent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  & > * {
    margin-left: 24px;
  }
`;

export const CardName = styled(Typography)`
  margin-bottom: 6px;
`;

export const CCImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => `2px solid ${props.theme.grey.shade3}`};
  padding: 0px 4px;
  border-radius: 5px;
  min-height: 20px;
  min-width: 34px;
  text-align: center;
  margin-right: 4px;
  & > svg {
    vertical-align: middle;
  }
`;

export const CCNumRow = styled.div`
  flex: 1;
`;
