import React from 'react';

import { ShoretradeLogo, Exit } from 'components/base/SVG';
import { SVGProps } from 'components/base/SVG/SVG.props';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { DashboardGeneratedProps, NavLinkProps } from './Dashboard.props';
import {
  Container,
  Sidebar,
  Content,
  Navbar,
  SidebarItem,
} from './Dashboard.style';

const NavLink = ({ to, color, iconColor, linkText, Icon }: NavLinkProps) => (
  <SidebarItem to={to}>
    <div className="icon-container">
      {Icon && <Icon fill={iconColor} height={20} width={20} />}
    </div>
    <Typography className="link" color={color} weight="500">
      {linkText}
    </Typography>
  </SidebarItem>
);

const DashboardView = (props: DashboardGeneratedProps): JSX.Element => {
  const theme = useTheme();
  const { routes, pageTitle, currentPath, children } = props;

  return (
    <Container>
      <Sidebar>
        <div>
          <div className="logo-container">
            <ShoretradeLogo />
          </div>
          {routes.map((route) => (
            <NavLink
              key={`sidenav-${route.path}`}
              to={route.path}
              color={route.path === currentPath ? 'primary' : 'noshade'}
              iconColor={
                route.path === currentPath
                  ? theme.brand.primary
                  : theme.grey.noshade
              }
              linkText={route.title || ''}
              Icon={route.icon}
            />
          ))}
        </div>

        <NavLink
          to={'/'}
          color="shade7"
          linkText="Logout"
          Icon={Exit}
          iconColor={theme.grey.shade7}
        />
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
