import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { Search, ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import HelpAndSupportFooter from 'components/module/HelpAndSupportFooter';
import Pagination from 'components/module/Pagination';
import { BUYER_ACCOUNT_ROUTES, SHORETRADE_EMAIL } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { SHORETRADE_TEL } from '../HelpAndSupport.constants';
import { PAGE_SIZE } from './Category.constants';
import { CategoryGeneratedProps } from './Category.props';
import {
  Account,
  Container,
  SearchFieldWrapper,
  SearchContent,
  SubCategory,
  SubCategories,
  EnvelopeAltWrapper,
  ChatWrapper,
  Text1,
  Content,
  Content2,
} from './Category.style';

const CategoryView = (props: CategoryGeneratedProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container className="category">
      <Account className="category__account" variant="title5" weight="700">
        Account
      </Account>

      <div className="category__breadcrumb">
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Help & Support',
              link: BUYER_ACCOUNT_ROUTES.HELP_AND_SUPPORT,
              isDone: true,
            },
            { label: props.category?.fields?.title },
          ]}
        />
      </div>

      <SearchContent>
        {props.category?.fields?.title && (
          <Typography variant={isMobile ? 'copy' : 'title5'} weight="500">
            {props.category?.fields?.title}
          </Typography>
        )}
        <SearchFieldWrapper
          value={props.searchKeyword}
          onChange={(e: any) => props.handleSearchChange(e)}
          placeholder={`Search in ${props.category?.fields?.title}`}
          LeftComponent={<Search />}
        />
      </SearchContent>

      <SubCategories>
        {props?.filteredTopics
          ?.slice((props.page - 1) * PAGE_SIZE, props.page * PAGE_SIZE)
          .map((topic: any) => (
            <SubCategory
              key={`category_topic-${topic?.sys?.id}`}
              onClick={() =>
                props.handleTopicClick(topic?.sys?.id, topic?.fields?.slug)
              }
            >
              {topic?.fields?.title && (
                <Typography weight="500">{topic?.fields?.title}</Typography>
              )}
              <div style={{ marginLeft: 'auto' }}>
                <ChevronRight
                  fill={theme.brand.primary}
                  height={14}
                  width={24}
                />
              </div>
            </SubCategory>
          ))}
      </SubCategories>

      {props?.filteredTopics?.length > PAGE_SIZE && (
        <Pagination
          className="category_pagination"
          numPages={props.totalPages}
          currentValue={props.page}
          onClickButton={props.handlePageChange}
          variant="number"
          iconColor={theme.grey.shade7}
          color="shade7"
        />
      )}

      <HelpAndSupportFooter
        contactNo={SHORETRADE_TEL}
        email={SHORETRADE_EMAIL}
        handleEmailClick={props.handleEmailUsClick}
      />
    </Container>
  );
};

export default CategoryView;
