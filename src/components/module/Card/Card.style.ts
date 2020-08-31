import styled from 'utils/styled';

export const CardContainer = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  /* Grey / White */
  background: #ffffff;
  /* Shadow / Medium */
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;
  width: 203px;
  height: 160px;
  padding: 16px;
`;

export const TopCardContainer = styled.img`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 30%;
  display: block;
  width: 203px;
  height: 70%;
`;

export const BottomCardContainer = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  margin-top: 120px;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;
`;
