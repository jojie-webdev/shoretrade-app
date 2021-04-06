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
import { isEmpty } from 'ramda';
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
  currentCategoryId,
  setCurrentCategoryId,

  searchTerm,
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
      <Row
        nogutter
        justify="between"
        align="center"
        style={{
          marginBottom: !isInner && isEmpty(innerCategories) ? 40 : 0,
        }}
      >
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
                        setCurrentCategoryId('');
                        setSearchTerm('');
                        props.setCategories([]);
                        props.setInnerCategories([]);
                      },
                    },
                    {
                      label:
                        categories.find((c) => c.id === currentCategoryId)
                          ?.name || 'Details',
                    },
                  ]),
            ]}
          />
        </Col>
        <Col xs="content">
          <div style={{ width: 300 }}>
            <Search
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              resetValue={() => setSearchTerm('')}
              placeholder="Search for a product..."
              rounded
            />
          </div>
        </Col>
      </Row>

      {!isEmpty(innerCategories) && (
        <Row style={{ marginBottom: 16 }}>
          <Col />
          <Col xs="content">
            <Button
              loading={props.isSaving}
              onClick={props.onSave}
              text="Save"
            />
          </Col>
        </Row>
      )}

      {!isInner &&
        categories.map((c) => {
          const selling = props.selling.filter((s) => s.categoryId === c.id);

          return (
            <>
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

              {!isEmpty(selling) && (
                <BadgeContainer>
                  {selling.map((s) => (
                    <div key={s.id} className="badge-item-container">
                      <Badge badgeColor={theme.grey.shade3}>
                        <Typography variant="overline" color="shade9">
                          {s.name}
                        </Typography>
                      </Badge>
                    </div>
                  ))}
                </BadgeContainer>
              )}
            </>
          );
        })}

      {innerCategories.map((c) => (
        <Interactions
          padding="8px 20px 8px 16px"
          key={c.id}
          type="checkbox"
          pressed={selectedCategories.some((v) => v.id === c.id)}
          onClick={() =>
            props.onPressInnerCategory({
              id: c.id,
              name: c.name,
              categoryId: c.categoryId || currentCategoryId,
            })
          }
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
    </Container>
  );
};

export default MarketInterestsView;
