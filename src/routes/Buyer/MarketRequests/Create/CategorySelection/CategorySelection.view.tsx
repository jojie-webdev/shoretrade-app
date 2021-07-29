import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import {
  Group194,
  Group195,
  Group196,
  Wave31,
  Wave41,
  Wave51,
} from 'components/base/SVG';
import Group204 from 'components/base/SVG/Group204';
import TypographyView from 'components/base/Typography';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { BUYER_ACCOUNT_ROUTES } from 'consts';

import { CreateRequestHeaderContainer } from '../Create.style';
import {
  CategoryItem,
  CategorySelectionProps,
} from './CategorySelection.props';
import {
  CategoryInterAction,
  CategoryInteractionsContainer,
  EmptyContainer,
  BottomAbsoContainer,
  BottomGroupContainer,
  LeftAbsoContainer,
  LeftGroupContainer,
  TopAbsoContainer,
  TopGroupContainer,
} from './CategorySelection.style';

const CategorySelectionView = (props: CategorySelectionProps) => {
  const {
    step,
    stepCountComponent,
    searchTerm,
    setSearchTerm,
    search,
    buying,
    setSelectedCategory,
    hideSearchResult,
    pendingSearch,
    typeSearchResults,
    setStep,
    updateCategory,
    didFinishStep,
    setDidFinishStep,
    onBack,
  } = props;

  const handleCategoryClick = (v: CategoryItem) => {
    updateCategory(v);
    setSelectedCategory(v);
    setStep(2);
    setDidFinishStep(1);
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <div>
          <Breadcrumbs
            color="shade5"
            sections={[
              { label: 'Category' },
              {
                label: 'Specifications',
                onClick: () => {
                  if (didFinishStep >= 2) {
                    onBack(2);
                  }
                },
                isDone: didFinishStep >= 2,
              },
              {
                label: 'Size',
                onClick: () => {
                  if (didFinishStep >= 3) {
                    onBack(3);
                  }
                },
                isDone: didFinishStep >= 3,
              },
              {
                label: 'Quantity',
                onClick: () => {
                  if (didFinishStep >= 4) {
                    onBack(4);
                  }
                },
                isDone: didFinishStep >= 4,
              },
              {
                label: 'Summary',
                onClick: () => {
                  if (didFinishStep >= 5) {
                    onBack(5);
                  }
                },
                isDone: didFinishStep >= 5,
              },
            ]}
          />
          <div className="title-container">
            <TypographyView
              variant="title5"
              weight="500"
              style={{ fontFamily: 'Media Sans' }}
            >
              Request a Product
            </TypographyView>
          </div>
        </div>
      </CreateRequestHeaderContainer>
      <CategoryInteractionsContainer>
        <div className="search-container">
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            resetValue={() => setSearchTerm('')}
            placeholder="Search a category"
            style={{ borderRadius: 12, width: '100%' }}
          />
        </div>
        {pendingSearch ? (
          <Loading label="Searching" />
        ) : !hideSearchResult && typeSearchResults.length > 0 ? (
          typeSearchResults.map((result) => (
            <CategoryInterAction
              onClick={() =>
                handleCategoryClick({ id: result.value, name: result.label })
              }
              key={result.value}
              type="next"
              leftComponent={
                <TypographyView variant="body">{result.label}</TypographyView>
              }
            />
          ))
        ) : (
          <>
            <TopAbsoContainer>
              <Wave41 />
            </TopAbsoContainer>
            <TopGroupContainer>
              <Group196 />
            </TopGroupContainer>
            <BottomAbsoContainer>
              <Wave31 />
            </BottomAbsoContainer>
            <BottomGroupContainer>
              <Group195 />
            </BottomGroupContainer>
            <LeftAbsoContainer>
              <Wave51 />
            </LeftAbsoContainer>
            <LeftGroupContainer>
              <Group194 />
            </LeftGroupContainer>
            <EmptyContainer>
              <Group204 />
            </EmptyContainer>
          </>
        )}
      </CategoryInteractionsContainer>
    </>
  );
};

export default CategorySelectionView;
