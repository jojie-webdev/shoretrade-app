import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;
  padding: 32px 32px 96px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SkipButton = styled.button`
  padding: 4px 8px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;

  .text {
    margin-right: 4px;
  }
`;

export const SvgContainer = styled.div`
  margin: 32px 0;
  width: 100%;
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  height: 64px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 32px;
  background-color: ${({ theme }) => theme.grey.shade9};
`;
