import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage';
import Loading from 'components/module/Loading/Loading.view';
import Search from 'components/module/Search';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Col, Row } from 'react-grid-system';
import { MarketInterestsGeneratedProps } from 'routes/Seller/Account/MarketInterests/MarketInterests.props';
import {
  Container,
  BadgeContainer,
} from 'routes/Seller/Account/MarketInterests/MarketInterests.style';
import { useTheme } from 'utils/Theme';

const MarketInterestsView = ({
  isInner,
  setIsInner,

  setSearchTerm,
  selectedCategories,
  setSelectedCategories,

  categories,
  innerCategories,
  loadingInnerCategories,
  ...props
}: MarketInterestsGeneratedProps) => {
  const theme = useTheme();

  if (!categories || loadingInnerCategories) {
    return <Loading />;
  }

  return (
    <Container>
      <Row nogutter justify="between" align="center" className="header">
        <Col>
          <Breadcrumbs
            sections={[
              { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
              ...(!isInner
                ? [{ label: "Products I'm Selling" }]
                : [
                    {
                      label: "Products I'm Selling",
                      onClick: () => {
                        setIsInner(false);
                        setSearchTerm('');
                      },
                    },
                    {
                      label: 'Details',
                    },
                  ]),
            ]}
          />
        </Col>
        <Col xs="content">
          <div style={{ width: 300 }}>
            <Search
              value={props.searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              resetValue={() => setSearchTerm('')}
              placeholder="Search for a product..."
              rounded
            />
          </div>
        </Col>
      </Row>

      <BadgeContainer>
        {props.selling.map((s) => {
          return (
            <div key={s.id} className="badge-item-container">
              <Badge badgeColor={theme.grey.shade3}>
                <Typography variant="overline" color="shade9">
                  {s.name}
                </Typography>
              </Badge>
            </div>
          );
        })}
      </BadgeContainer>

      {!isInner &&
        categories.map((c) => (
          <Interactions
            padding="16px 20px 16px 8px"
            key={c.id}
            onClick={() => props.onPressCategory(c.id)}
            leftComponent={
              <div className="category-container">
                <div style={{ width: 48 }}>
                  <CategoryImage
                    id={c.id}
                    containerHeight={30}
                    maxHeight={30}
                  />
                </div>

                <Typography
                  variant="label"
                  color="noshade"
                  className="category-text"
                >
                  {c.name}
                </Typography>
              </div>
            }
          />
        ))}

      {isInner &&
        innerCategories.map((c) => (
          <Interactions
            padding="8px 20px 8px 16px"
            key={c.id}
            type="checkbox"
            pressed={selectedCategories.some((v) => v.id === c.id)}
            onClick={() => props.onPressInnerCategory(c)}
            leftComponent={
              <div className="category-container">
                <img src={c.thumbnail} />
                <Typography variant="label" color="noshade">
                  {c.name}
                </Typography>
              </div>
            }
          />
        ))}

      {isInner && (
        <Button loading={props.isSaving} onClick={props.onSave} text="Save" />
      )}
    </Container>
  );
};

export default MarketInterestsView;
