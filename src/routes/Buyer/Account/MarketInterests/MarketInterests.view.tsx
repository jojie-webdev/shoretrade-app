import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import CategoryImage from 'components/module/CategoryImage';
import Loading from 'components/module/Loading/Loading.view';
import Search from 'components/module/Search';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { MarketInterestsGeneratedProps } from 'routes/Buyer/Account/MarketInterests/MarketInterests.props';
import {
  Container,
  BadgeContainer,
} from 'routes/Buyer/Account/MarketInterests/MarketInterests.style';
import { useTheme } from 'utils/Theme';

const MarketInterestsView = ({
  isInner,
  setIsInner,
  currentCategoryId,
  setCurrentCategoryId,

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
      <BoxContainer>
        <Row
          nogutter
          justify="between"
          align="center"
          style={{ marginBottom: !isInner ? 40 : 0 }}
        >
          <Col>
            <Breadcrumbs
              sections={[
                { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
                ...(!isInner
                  ? [{ label: "Products I'm Buying" }]
                  : [
                      {
                        label: "Products I'm Buying",
                        onClick: () => {
                          setIsInner(false);
                          setCurrentCategoryId('');
                          setSearchTerm('');
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
                value={props.searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                resetValue={() => setSearchTerm('')}
                placeholder="Search for a product..."
                rounded
              />
            </div>
          </Col>
        </Row>

        {isInner && (
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
            const buying = props.buying.filter((s) => s.categoryId === c.id);

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

                      <Typography variant="label" className="category-text">
                        {c.name}
                      </Typography>
                    </div>
                  }
                />

                {!isEmpty(buying) && (
                  <BadgeContainer>
                    {buying.map((s) => (
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

        {isInner &&
          innerCategories.map((c) => (
            <Interactions
              padding="8px 20px 8px 16px"
              key={c.id}
              type="checkbox"
              pressed={selectedCategories.some((v) => v.id === c.id)}
              onClick={() =>
                props.onPressInnerCategory({
                  id: c.id,
                  name: c.name,
                  categoryId: currentCategoryId,
                })
              }
              leftComponent={
                <div className="category-container">
                  <img src={c.thumbnail} />
                  <Typography variant="label">{c.name}</Typography>
                </div>
              }
            />
          ))}
      </BoxContainer>
    </Container>
  );
};

export default MarketInterestsView;
