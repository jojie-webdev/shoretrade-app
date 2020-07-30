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

  display: flex;
  flex-direction: column;

  a {
    padding: 12px;
    margin-bottom: 8px;
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
