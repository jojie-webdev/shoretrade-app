import { SpecialColors } from 'utils/SFMTheme';
import styled from 'utils/styled';

const fontStyle = `
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;
export const Container = styled.div``;

export const Field = styled.textarea<{ height?: number }>`
  ${fontStyle};
  margin-top: 4px;
  width: 100%;
  color: ${({ theme }) =>
    theme.isSFM ? SpecialColors.blue : theme.grey.shade6};
  max-width: 100%;
  min-width: 100%;
  border-radius: 4px;
  padding: 12px 16px;
  border: 0;
  min-height: 48px;
  height: ${({ height }) => (height ? `${height}px` : `48px`)};
  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${({ theme }) =>
      theme.isSFM ? theme.grey.shade6 : theme.grey.shade5};
    opacity: 1;
  }
`;
