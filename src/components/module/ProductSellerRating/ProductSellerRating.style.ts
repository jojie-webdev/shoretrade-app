import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const PreviewContainer = styled.div`
  margin-right: 16px;
  border-radius: 4px;
  position: relative;
`;

export const FlexShrinked = styled.div`
  flex-shrink: 1;
  margin-top: 4px;
`;

export const Preview = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 4px;
`;

export const Bold = styled(Typography)``;

export const StarContainer = styled.div<{ location?: string }>`
  margin-right: 6px;
  margin-top: ${({ location }) => (location ? '9px' : 0)};
`;

export const Favorite = styled.button`
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: -12px;
  right: 8px;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.grey.noshade};
  border-radius: 20px;
  ${() => `
    shadow-color: rgba(41, 43, 50, 0.12);
    shadow-opacity: 1.34;
    shadow-radius: 6.27;
    shadow-offset: 0 5px;
    elevation: 3;`};
`;
