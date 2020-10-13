import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  position: relative;
`;

export const SearchLocationContainer = styled.div`
  padding: 0 8px;
  cursor: pointer;
`;

export const Results = styled.div`
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.grey.shade9};
  border-radius: 4px;
  box-shadow: 0 12px 24px rgba(41, 43, 50, 0.25);
  margin-top: 8px;
  background-color: ${({ theme }) => theme.grey.shade9};
  max-height: 200px;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;

  .item:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
`;

const font = `
    font-size: ${pxToRem(14)};
    line-height: 24px;
    font-weight: 500;`;

export const Item = styled.div<{ isSelected?: boolean }>`
  ${font};
  cursor: pointer;
  display: block;
  background-color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.brand.primary
      : theme.appType === 'seller'
      ? theme.grey.shade9
      : theme.grey.noshade};
  color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.grey.noshade
      : theme.appType === 'seller'
      ? theme.grey.noshade
      : theme.grey.shade9};
  padding: 12px 16px;

  &:hover {
    background-color: ${({ theme }) =>
      theme.appType === 'seller' ? '#ffffff20' : '#00000020'};
  }
`;
