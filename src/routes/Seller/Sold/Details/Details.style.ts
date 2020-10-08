import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div``;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
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

export const OrderDetailContainer = styled.div`
  margin-top: 16px;
`;

export const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DetailsColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 48px;
`;

export const ProductList = styled.div`
  margin-top: 64px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

export const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .tags-container {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
  }
  .size-container {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
  }
  .size-label {
    margin-right: 8px;
  }
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
`;

export const ItemImage = styled.img`
  width: 148px;
  height: 148px;
  margin-right: 16px;
  border-radius: 4px;
  object-fit: contain;
  background: ${(props) => props.theme.grey.shade7};
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  background: ${(props) => props.theme.grey.shade9};
  margin-top: 16px;
  .box-item {
    display: flex;
    flex-direction: column;
    margin-right: 48px;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  align-items: flex-end;
  .footer-total-value {
    margin-top: 8px;
  }
`;
