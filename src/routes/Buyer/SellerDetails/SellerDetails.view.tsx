import React from 'react';

import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage';
import Search from 'components/module/Search';
import SellerRating from 'components/module/SellerRating';
import { BUYER_ROUTES } from 'consts/routes';
import { useHistory } from 'react-router-dom';

// import { useTheme } from 'utils/Theme';
import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import {
  Container,
  CategoryContainer,
  SpinnerContainer,
  ListingContainer,
  ListingCounter,
  SearchContainer,
  ListContainer,
  ListItemInteraction,
  CategoryImageContainer,
  RightComponent
} from './SellerDetails.style';

const SellerDetailsView = (props: SellerDetailsGeneratedProps) => {
  // const theme = useTheme();
  const history = useHistory();
  const { loading, listings, search, onSearch, categories } = props;

  return (
    <Container>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <>
          <SellerRating {...props} />

          <ListingContainer>
            <Typography variant="title5" color="shade9">
              Active Listing <ListingCounter>{listings?.length}</ListingCounter>
            </Typography>

            <SearchContainer>
              <Search
                value={search}
                resetValue={() => onSearch('')}
                onChange={(e) => onSearch(e.target.value)}
              />
            </SearchContainer>

            <ListContainer>
              {categories &&
                categories
                  .filter((cat) => {
                    if (search && search !== '') {
                      const catName = cat.name.replace(' ', '').toLowerCase();
                      return catName.includes(
                        search.replace(' ', '').toLowerCase()
                      );
                    }
                    return true;
                  })
                  .map((cat, idx) => {
                    return (
                      <ListItemInteraction
                        key={idx}
                        leftComponent={
                          <CategoryContainer>
                            <CategoryImageContainer>
                              <CategoryImage id={cat.id} maxHeight={90} />
                            </CategoryImageContainer>
                            <Typography variant="body" color={'shade9'}>
                              {cat.name}
                            </Typography>
                          </CategoryContainer>
                        }
                        rightComponent={
                          <RightComponent>
                            <ChevronRight width={12} height={16} />
                          </RightComponent>
                        }
                        value={cat.name}
                        padding="0"
                        onClick={() => {
                          history.push(
                            `${BUYER_ROUTES.ROOT}/categories/${cat.id}`
                          );
                        }}
                      />
                    );
                })}
            </ListContainer>
          </ListingContainer>
        </>
      )}
    </Container>
  );
};

export default SellerDetailsView;
