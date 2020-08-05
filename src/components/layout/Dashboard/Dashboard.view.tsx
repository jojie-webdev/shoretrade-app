import React from 'react';

import { Link } from 'react-router-dom';
import { Route } from 'types/Routes';

import { DashboardGeneratedProps } from './Dashboard.props';
import { Container, Sidebar, Content, Navbar } from './Dashboard.style';

const SidebarItem = ({ route }: { route: Route }) => (
  <Link to={route.path}>{route.title}</Link>
);

const DashboardView = (props: DashboardGeneratedProps) => {
  // const theme = useTheme();
  const { routes, pageTitle, children } = props;

  return (
    <Container>
      <Sidebar>
        {routes.map((route) => (
          <SidebarItem key={`sidenav-${route.path}`} route={route} />
        ))}
      </Sidebar>
      <Content>
        <Navbar className="appbar">
          <h1>{pageTitle}</h1>
          <div>
            <h3>Manettas Seafood</h3>
          </div>
        </Navbar>
        {children}
      </Content>
    </Container>
  );
};

export default React.memo(DashboardView);
