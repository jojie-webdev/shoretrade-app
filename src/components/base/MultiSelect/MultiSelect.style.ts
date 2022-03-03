import styled from 'utils/styled';

import Typography from '../Typography';

export const Container = styled.div`
  width: 100%;

  .icon_down_dir:before {
    content: unset;
  }

  .highlightOption,
  .highlightOption:hover,
  .option:hover {
    background: ${({ theme }) => theme.brand.primary};
  }

  .notFound {
    font-family: 'Basis Grotesque Pro', sans-serif;
    font-size: 0.875rem;
  }
`;

export const Label = styled(Typography)`
  margin-bottom: 4px;
`;

export const SelectListContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.grey.noshade};
  padding: 24px;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 8px;
  position: absolute;
  top: 78px;
  right: 0;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const Divider = styled.div`
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.grey.shade5};
`;
