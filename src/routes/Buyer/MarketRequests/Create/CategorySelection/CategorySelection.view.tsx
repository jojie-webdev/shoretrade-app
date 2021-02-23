import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { Filter } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import Search from 'components/module/Search';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { useHistory, Link } from 'react-router-dom';
import theme from 'utils/Theme';

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
    categories,
    setSelectedCategory,
  } = props;
  const history = useHistory();

  const handleCategoryClick = (v: CategoryItem) => {
    console.log(v);
    setSelectedCategory(v);
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <div className="">
          {stepCountComponent}
          <TypographyView variant="title4">Choose Category</TypographyView>
        </div>
        <div style={{ maxWidth: '308px' }}>
          <Search
            value={searchTerm}
            onChange={(event: any) => setSearchTerm(event.currentTarget.value)}
            resetValue={() => props.setSearchTerm('')}
            placeholder="Search a category..."
            rounded
          />
        </div>
      </CreateRequestHeaderContainer>
      <CategoryInteractionsContainer>
        {categories.map((category) => (
          <CategoryInterAction
            onClick={() => handleCategoryClick(category)}
            key={category.id}
            type="next"
            leftComponent={
              <TypographyView variant="body">{category.name}</TypographyView>
            }
          ></CategoryInterAction>
        ))}
      </CategoryInteractionsContainer>
    </>
  );
};

export default CategorySelectionView;
