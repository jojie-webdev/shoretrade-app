import React from 'react';

import { Link } from 'react-router-dom';

import { DashboardGeneratedProps } from './Dashboard.props';
import { Container, Sidebar, Content, Navbar } from './Dashboard.style';

const DashboardView: React.FC<DashboardGeneratedProps> = (props) => {
  // const theme = useTheme();
  const { routes, pageTitle, children } = props;

  return (
    <Container>
      <Sidebar>
        {routes.map((route) => (
          <Link to={route.path} key={`sidenav-${route.path}`}>
            {route.title}
          </Link>
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
