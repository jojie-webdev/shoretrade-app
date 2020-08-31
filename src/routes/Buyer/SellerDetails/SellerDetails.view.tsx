import React from 'react';

import { BUYER_ROUTES } from 'consts/routes';
import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Typography from 'components/base/Typography';
import Search from 'components/module/Search';
import SellerRating from 'components/module/SellerRating';
import { useHistory } from 'react-router-dom';

// import { useTheme } from 'utils/Theme';
import { SellerDetailsGeneratedProps } from './SellerDetails.props';
import { Container, SpinnerContainer, ListingContainer, ListingCounter, SearchContainer, CategoryContainer, ListItemInteraction } from './SellerDetails.style';

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

            <CategoryContainer>
              {categories &&
                categories
                  .filter((cat) => {
                    if (search && search !== '') {
                      const catName = cat.name.toLowerCase();
                      return catName.startsWith(search.toLowerCase());
                    }

                    return true;
                  })
                  .map((cat, idx) => {
                    return (
                      <ListItemInteraction
                        key={idx}
                        value={cat.name}
                        onClick={() => {
                          history.push(
                            `${BUYER_ROUTES.ROOT}/categories/${cat.id}`
                          );
                        }}
                      />
                    );
                })}
            </CategoryContainer>
          </ListingContainer>
        </>
      )}
    </Container>
  );
};

export default SellerDetailsView;
