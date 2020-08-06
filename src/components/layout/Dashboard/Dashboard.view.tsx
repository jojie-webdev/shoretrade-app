import React from 'react';

import { ShoretradeLogo, Exit } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Container } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { DashboardGeneratedProps, NavLinkProps } from './Dashboard.props';
import {
  DashboardContainer,
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
    <DashboardContainer>
      <Sidebar>
        <div>
          <div className="logo-container">
            <ShoretradeLogo />
          </div>
          {routes.map((route) => (
            <NavLink
              key={`sidenav-${route.path}`}
              to={route.path}
              color={
                // To handle inner routes
                currentPath.search(route.path.split('/')[2]) > 0
                  ? 'primary'
                  : 'noshade'
              }
              iconColor={
                currentPath.search(route.path.split('/')[2]) > 0
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

          <h3>Manettas Seafood</h3>
        </Navbar>
        <div className="screen">
          <Container>{children}</Container>
        </div>
      </Content>
    </DashboardContainer>
  );
};

export default DashboardView;
