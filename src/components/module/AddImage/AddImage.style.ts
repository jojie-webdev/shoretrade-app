import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${(props) => props.theme.grey.shade9};
  justify-content: space-between;
  .left-content {
    display: flex;
    flex-direction: row;
  }
`;

export const PreviewImage = styled.img`
  height: 66px;
  width: 66px;
  margin: 11px 17px;
  border-radius: 8px;
`;

export const DeleteBadge = styled.button`
  padding: 4px 8px;
  background: ${(props) => props.theme.grey.shade9};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  margin-right: 24px;
  :focus {
    outline: none;
  }
`;
export const DeleteText = styled(Typography)`
  margin-left: 4px;
`;

export const FileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 38%;
  margin-top: 24px;

  @media ${BREAKPOINTS['sm']} {
    margin-right: 8px;
  }
  .format-size {
    display: flex;
    flex-direction: row;
    .filesize-text {
      margin-right: 3px;
    }
  }
`;
