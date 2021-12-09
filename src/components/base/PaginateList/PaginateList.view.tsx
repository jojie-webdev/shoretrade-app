import React, { useState } from 'react';

import Pagination from 'components/module/Pagination';
import { pathOr, splitEvery } from 'ramda';

// import { useTheme } from 'utils/Theme';
import { PaginateListProps } from './PaginateList.props';
import {
  Container,
  ListContainer,
  ListItemInteraction,
} from './PaginateList.style';

const PaginateList = (props: PaginateListProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const { list, labelPath, onClickItem, maxItemPerPage } = props;

  const numPages = Math.ceil(list.length / maxItemPerPage);
  const culledList: any[] = splitEvery(maxItemPerPage, list);

  if (!culledList || !culledList.length) return <Container />;

  return (
    <Container>
      <ListContainer>
        {culledList[currentPage].map((item: any, idx: number) => {
          const label = pathOr(item, labelPath || [], item);
          return (
            <ListItemInteraction
              key={idx}
              value={`${label}`}
              onClick={() => onClickItem(item)}
              resultCount={`${item.count} ${
                item.count > 1 ? 'results' : 'result'
              }`}
            />
          );
        })}
      </ListContainer>

      {numPages > 1 && (
        <Pagination
          numPages={numPages}
          currentValue={currentPage + 1}
          variant="number"
          onClickButton={(page) => setCurrentPage(page - 1)}
        />
      )}
    </Container>
  );
};

export default React.memo(PaginateList);
