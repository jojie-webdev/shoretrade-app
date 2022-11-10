import Button from 'components/base/Button';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

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

    margin-bottom: 10px;
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

    @media (hover: none) and (pointer: coarse) {
      :hover {
        opacity: 1;
      }
    }

    @media ${BREAKPOINTS['sm']} {
      padding: 18px;
    }
  }

  .template-btn.last-btn {
    margin-bottom: 32px;
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
    align-items: center;
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
  height: 32px;
`;

export const PlaceholderImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.grey.shade2};
  display: flex;
  justify-content: center;
  align-items: center;
`;
