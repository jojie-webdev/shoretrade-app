import { Theme } from 'types/Theme';
import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

// Number Variant

const PaginationButtonColor: Record<Theme['appType'], string> = {
  buyer: theme.grey.noshade,
  seller: theme.grey.shade9,
};

export const PaginationButton = styled.button<{ active?: boolean }>`
  height: 40px;
  width: 40px;
  background: ${(props) =>
    props.active
      ? props.theme.brand.primary
      : PaginationButtonColor[props.theme.appType]};
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;
  margin-right: 16px;
  border: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  :focus {
    outline: none;
  }
`;

// Dot Variant
export const PaginationDot = styled.div<{ active?: boolean }>`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  margin-right: 24px;
  background: ${(props) =>
    props.active ? props.theme.brand.primary : props.theme.grey.shade3};
`;

// Infinite Dot Variant
export const InfiniteDot = styled.div<{ active?: boolean }>`
  height: ${(props) => (props.active ? '8px' : '4px')};
  width: ${(props) => (props.active ? '8px' : '4px')};
  border-radius: 4px;

  margin-right: 24px;

  background: ${(props) =>
    props.active ? props.theme.brand.primary : props.theme.grey.shade3};
`;