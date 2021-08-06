import styled from 'utils/styled';

export const Container = styled.div``;

export const Tab = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 9px 24px;
  justify-content: center;
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.brand.primary : theme.grey.shade9)};
  cursor: pointer;

  .tab-text {
    color: ${({ theme, active }) =>
      active ? theme.grey.noshade : theme.grey.shade6};

    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`;