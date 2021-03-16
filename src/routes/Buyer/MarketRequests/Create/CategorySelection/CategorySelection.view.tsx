import React from 'react';

import TypographyView from 'components/base/Typography';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';

import { CreateRequestHeaderContainer } from '../Create.style';
import {
  CategoryItem,
  CategorySelectionProps,
} from './CategorySelection.props';
import {
  CategoryInterAction,
  CategoryInteractionsContainer,
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
  } = props;
  const handleCategoryClick = (v: CategoryItem) => {
    setSelectedCategory(v);
    setStep(2);
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <div>
          {stepCountComponent}
          <div className="title-container">
            <TypographyView variant="title4">Choose Category</TypographyView>
          </div>
        </div>
        <div className="search-container">
          <Search
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            resetValue={() => setSearchTerm('')}
            placeholder="Search a category..."
            rounded
          />
        </div>
      </CreateRequestHeaderContainer>
      <CategoryInteractionsContainer>
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
          buying.map((item: any) => (
            <CategoryInterAction
              onClick={() => handleCategoryClick(item)}
              key={item.id}
              type="next"
              leftComponent={
                <TypographyView variant="body">{item.name}</TypographyView>
              }
            />
          ))
        )}
      </CategoryInteractionsContainer>
    </>
  );
};

export default CategorySelectionView;
