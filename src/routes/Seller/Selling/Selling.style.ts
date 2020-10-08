import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;
  margin: 0 -40px;

  .row {
    height: 100%;
  }
`;

export const ItemCard = styled(Row)`
  background: ${(props) => props.theme.grey.shade9};
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 4px;
  ${({ onClick }) =>
    onClick
      ? `cursor: pointer;
  &:hover {
    opacity: 0.9;
  }`
      : ''};

  .content {
    flex: 1;
    margin-right: 24px;

    .item-title {
      margin-bottom: 16px;
    }

    .tags-container {
      margin-bottom: 16px;
      display: flex;
    }
  }

  .pricing {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  @media ${BREAKPOINTS['md']} {
    padding-bottom: 32px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 32px;
  }
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade8};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemImage = styled.img`
  width: 176px;
  height: 176px;
  object-fit: contain;
  background: ${(props) => props.theme.grey.shade7};

  margin-right: 16px;
  border-radius: 4px;

  @media ${BREAKPOINTS['md']} {
    width: 148px;
    height: 148px;
  }
`;

export const ItemDetail = styled(Typography)`
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  span {
    font-weight: 900;
    color: ${(props) => props.theme.grey.noshade};
  }
`;
