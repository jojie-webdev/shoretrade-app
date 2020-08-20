import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PreviewImage = styled.img`
  height: 96px;
  width: 96px;
  border: 1px solid red;
  margin-right: 8px;
  border-radius: 4px;
`;

export const DeleteBadge = styled.button`
  padding: 4px 8px;
  background: ${(props) => props.theme.brand.error};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;

  :focus {
    outline: none;
  }
`;
export const DeleteText = styled(Typography)`
  margin-left: 4px;
`;
