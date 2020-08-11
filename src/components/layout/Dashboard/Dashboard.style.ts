import { Link } from 'react-router-dom';
import styled from 'utils/styled';

// TODO: Change this basic layout to the figma spec
export const DashboardContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

export const Sidebar = styled.aside`
  width: 235px;
  padding: 0 24px;
  background: #020a13;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .logo-container {
    margin-top: 68px;
    margin-bottom: 60px;
  }
`;

export const SidebarItem = styled(Link)`
  height: 24px;
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  border-bottom: none;
  text-decoration: none;

  .icon-container {
    margin-right: 12px;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 150px;
  background: ${(props) => props.theme.grey.shade9};
  color: white;

  .screen {
    background: ${(props) => props.theme.grey.shade8};
    height: 80%;
    padding: 40px 80px;
    border-radius: 2px;
    overflow-y: auto;

    .container {
      height: 100%;
      width: 100%;
    }
  }
`;

export const HeaderContainer = styled.nav`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .right-content {
    display: flex;
    align-items: center;

    .text-container {
      margin-right: 8px;
    }

    img {
      height: 56px;
      width: 56px;
      border-radius: calc(56px / 2);
      border: 1px solid red;
    }
  }
`;
