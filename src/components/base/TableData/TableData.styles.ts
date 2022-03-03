import styled from 'utils/styled';

export const TableDataContainer = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  position: relative;
  background: ${({ theme }) => theme.grey.noshade};
  border-bottom: 1px solid ${({ theme }) => theme.grey.shade4};
  font-weight: 500;

  &[data-row-sticky='true'] {
    left: 0;
    position: sticky;
    z-index: 10;
  }

  &[data-row-type='header'] {
    font-weight: 700;
    background: ${({ theme }) => theme.grey.shade3};
    border-bottom: 0;
    cursor: pointer;

    & > div {
      justify-content: space-between;
      align-items: center;
      flex-grow: 0 !important;
    }

    &[data-column-type='column-first'] {
      border-top-left-radius: 8px;
    }

    &[data-column-type='column-last'] {
      border-top-right-radius: 8px;
    }
  }

  &[data-column-type='column-last'] {
    div::after {
      border-right: 0;
    }
  }

  &[data-row-type='last-row'] {
    border-bottom: 0;

    &[data-column-type='column-first'] {
      border-bottom-left-radius: 8px;
    }

    &[data-column-type='column-last'] {
      border-bottom-right-radius: 8px;
    }
  }

  .btn-view-product {
    display: flex;
    background: #ffffff;
    border: 1px solid ${({ theme }) => theme.brand.primary};
    border-radius: 8px;
    padding: 6px 8px 4px 8px;
    position: absolute;
    right: 16px;
    p {
      margin-top: 1px;
      align-self: center;
    }
    :hover {
      cursor: pointer;
    }
  }
`;

export const DataWrapper = styled.div`
  display: flex;
  padding-left: 16px;
  padding-right: 16px;
  flex-grow: 1;
  position: relative;

  &::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    height: 24px;
    border-right: 1px solid ${({ theme }) => theme.grey.shade5};
    top: 0;
  }
`;

export const WidthComputer = styled.div`
  visibility: hidden;
  position: fixed;
  right: 0;
  bottom: 0;
  user-select: none;
  pointer-events: none;
`;
