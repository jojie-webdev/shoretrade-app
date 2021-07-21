import React from 'react';

import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Link } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { BreadcrumbsProps } from './Breadcrumbs.props';
import { Container } from './Breadcrumbs.style';

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const { isLight, color } = props;
  return (
    <Container>
      {props.sections.map((section, i) => {
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <div className="divider">
                <ChevronRight
                  width={8}
                  height={12}
                  fill={isLight ? theme.grey.shade5 : theme.grey.shade4}
                />
              </div>
            )}
            {section.link && (
              <Link key={i} to={section.link}>
                <Typography
                  color={
                    color ||
                    (isSeller ? (isLight ? 'shade9' : 'noshade') : 'shade9')
                  }
                >
                  {section.label}
                </Typography>
              </Link>
            )}

            {section.onClick && (
              <Typography
                className="alt-link"
                color={
                  color ||
                  (isSeller ? (isLight ? 'shade9' : 'noshade') : 'shade9')
                }
                onClick={section.onClick}
              >
                {section.label}
              </Typography>
            )}

            {!section.link && !section.onClick && (
              <Typography color="primary">{section.label}</Typography>
            )}
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default React.memo(Breadcrumbs);
