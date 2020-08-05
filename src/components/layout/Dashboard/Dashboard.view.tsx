import React from 'react';

import { ShoretradeLogo } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Route } from 'types/Routes';
import { useTheme } from 'utils/Theme';

import { DashboardGeneratedProps } from './Dashboard.props';
import {
  Container,
  Sidebar,
  Content,
  Navbar,
  SidebarItem,
} from './Dashboard.style';

const NavLink = ({
  route,
  active,
  activeColor,
}: {
  route: Route;
  active: boolean;
  activeColor: string;
}) => (
  <SidebarItem to={route.path}>
    <div className="icon-container">
      {route.icon && (
        <route.icon
          fill={active ? activeColor : 'white'}
          height={20}
          width={20}
        />
      )}
    </div>
    <Typography
      className="link"
      color={active ? 'primary' : 'noshade'}
      weight="500"
    >
      {route.title}
    </Typography>
  </SidebarItem>
);

const DashboardView = (props: DashboardGeneratedProps) => {
  const theme = useTheme();
  const { routes, pageTitle, currentPath, children } = props;

  return (
    <Container>
      <Sidebar>
        <div className="logo-container">
          <ShoretradeLogo />
        </div>
        {routes.map((route) => (
          <NavLink
            key={`sidenav-${route.path}`}
            route={route}
            active={route.path === currentPath}
            activeColor={theme.brand.primary}
          />
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

export default DashboardView;
