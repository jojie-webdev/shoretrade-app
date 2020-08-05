import { Link } from 'react-router-dom';
import styled from 'utils/styled';

// TODO: Change this basic layout to the figma spec
export const Container = styled.div`
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

  .logo-container {
    margin-top: 68px;
    margin-bottom: 60px;
  }
`;

export const SidebarItem = styled(Link)`
  height: 48px;
  width: 100%;
  margin-bottom: 12px;
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
  background: #09131d;
  color: white;
`;

export const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
