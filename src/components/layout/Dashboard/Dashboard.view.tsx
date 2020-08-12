import React from 'react';

import { ShoretradeLogo, Exit } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Container } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import {
  DashboardGeneratedProps,
  NavLinkProps,
  HeaderProps,
} from './Dashboard.props';
import {
  DashboardContainer,
  Sidebar,
  Content,
  HeaderContainer,
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

const Header = ({ pageTitle }: HeaderProps) => (
  <HeaderContainer className="appbar">
    <Typography variant="title4" color="noshade">
      {pageTitle}
    </Typography>

    <div className="right-content">
      <div className="text-container">
        <Typography color="noshade">Manettas Seafood</Typography>
        <Typography
          variant="caption"
          color="shade6"
          weight="500"
          style={{ textAlign: 'right' }}
        >
          Peter Manettas
        </Typography>
      </div>
      <img src="" alt="" />
    </div>
  </HeaderContainer>
);

const DashboardView = (props: DashboardGeneratedProps): JSX.Element => {
  const theme = useTheme();
  const {
    routes,
    pageTitle,
    isInnerRoute,
    shouldIncludePadding,
    children,
  } = props;

  console.log(shouldIncludePadding);

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
              color={isInnerRoute(route.path) ? 'primary' : 'noshade'}
              iconColor={
                isInnerRoute(route.path)
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
      <Content shouldIncludePadding={shouldIncludePadding}>
        <Header pageTitle={pageTitle}></Header>
        <div className="screen-wrapper">
          <div className="screen">
            <Container className="container">{children}</Container>
          </div>
        </div>
      </Content>
    </DashboardContainer>
  );
};

export default DashboardView;
