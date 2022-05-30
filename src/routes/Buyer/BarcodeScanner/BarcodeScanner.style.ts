import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  max-width: 50%;

  @media (max-width: 568px) {
    max-width: unset;
  }
`;

export const ImgContainer = styled.div`
  margin-top: 32px;
  margin-left: 12px;

  img {
    width: 468px;
  }

  @media (max-width: 568px) {
    display: none;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  margin-top: 24px;
  flex-wrap: wrap;

  button:first-of-type {
    margin-right: 8px;
  }
`;

export const LinkButton = styled.button`
  display: flex;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ theme }) => theme.grey.shade9};
  border: 0;
  padding: 12px 16px;
  width: 205px;

  svg {
    margin-right: 12px;
    height: 40px;
    width: 40px;
  }
`;
