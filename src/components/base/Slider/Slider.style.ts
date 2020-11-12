import ReactSlider from 'react-slider';
import styled from 'utils/styled';

export const Container = styled.div`
  padding-bottom: 24px;
`;

export const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 24px;
  justify-content: space-between;
`;

export const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 2px;
  display: flex;
  align-items: center;
`;

export const StyledThumb = styled.div`
  height: 28px;
  width: 28px;
  background-color: ${({ theme }) => theme.brand.primary};
  border-radius: 50%;
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const StyledTrack = styled.div<{ index: number; single?: boolean }>`
  top: 0;
  bottom: 0;
  background: ${({ index, single, theme }) =>
    index === 1 && !single ? theme.brand.primary : theme.grey.shade3};
  border-radius: 999px;
`;
