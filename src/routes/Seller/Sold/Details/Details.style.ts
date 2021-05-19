import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .breadcrumb-container {
    margin-bottom: 40px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .actions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  align-items: center;
  border-radius: 2px;

  .action-text {
    margin-left: 6px;
  }
`;

export const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;

  padding: 17px 24px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 8px;

  @media ${BREAKPOINTS['sm']} {
    flex-direction: column;
    padding: 0;
    background: transparent;
    border-radius: 0;
  }
`;

export const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 48px;
`;

export const OrderDetailContainer = styled.div`
  margin-top: 16px;
`;

export const ProductList = styled.div`
  margin-top: 32px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

export const ItemRow = styled.div`
  display: flex;
  flex-direction: row;

  padding: 17px 24px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 8px;

  @media ${BREAKPOINTS['sm']} {
    padding: 0;
    background: transparent;
    border-radius: 0;
  }
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .tags-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media ${BREAKPOINTS['sm']} {
      margin-top: 8px;
    }
  }

  .size-container {
    display: flex;
    flex-direction: row;

    @media ${BREAKPOINTS['sm']} {
      margin-top: 8px;
    }
  }

  .size-label {
    margin-right: 8px;

    @media ${BREAKPOINTS['sm']} {
      margin-top: 4px;
    }
  }
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
`;

export const ItemImage = styled.img`
  width: 58px;
  height: 58px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: contain;
  background: ${(props) => props.theme.grey.noshade};

  @media ${BREAKPOINTS['sm']} {
    width: 72px;
    height: 72px;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  padding: 17px 24px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 8px;
  margin-top: 16px;

  @media ${BREAKPOINTS['sm']} {
    justify-content: center;
    margin: 16px -24px 0 -24px;
    border-radius: 0;
    padding: 12px 16px;
  }

  .box-item {
    display: flex;
    flex-direction: column;
    margin-right: 48px;

    @media ${BREAKPOINTS['sm']} {
      align-items: center;
      margin: 0 20px;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  background-color: ${({ theme }) => theme.grey.shade9};
  border-radius: 8px;
  padding: 17px 24px;

  @media ${BREAKPOINTS['sm']} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: transparent;
    padding: 0;
  }

  .footer-total-value {
    margin-top: 8px;

    @media ${BREAKPOINTS['sm']} {
      margin: 0;
    }
  }
`;
