import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  font-size: 14px;
  overflow: auto;
  // margin-top: 16px;
`;

export const Table = styled.div`
  display: grid;
  position: relative;
`;

export const PreloaderWrapper = styled.div`
  padding: 24px 0;
`;

export const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 48px 0;

  div {
    margin-top: 24px;
    color: ${theme.grey.shade7};
    font-weight: 500;
  }
`;
