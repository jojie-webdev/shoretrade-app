import Button from 'components/base/Button';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

// Step 1
export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  .btn-container {
    display: flex;
    margin-top: 20px;

    @media ${BREAKPOINTS['sm']} {
      flex-direction: column;
    }
  }

  .btn-container > button {
    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 16px;
    }
  }

  .blk-sub {
    margin-top: 4px;
    margin-bottom: 40px;
  }

  .blk-sub2 {
    margin-top: 4px;
    margin-bottom: 8px;
  }

  .template-btn {
    max-height: 48px;
    padding: 18px 32px;
    margin-bottom: 32px;
    background-color: ${({ theme }) => theme.brand.primary};
    border-radius: 4px;
    cursor: pointer;
    width: fit-content;

    :focus {
      outline: none;
    }

    :hover {
      opacity: 0.5;
    }

    @media ${BREAKPOINTS['sm']} {
      padding: 18px;
    }
  }

  input {
    display: none;
  }

  .interactions {
    height: 64px;
    margin-bottom: 8px;
  }
  .title-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    .title-text {
      margin-top: 16px;
    }
    margin-bottom: 40px;
  }
`;

export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
  margin-left: -16px;
`;

export const ButtonImport = styled(Button)`
  border-radius: 8px;
  height: 32px;
`;
