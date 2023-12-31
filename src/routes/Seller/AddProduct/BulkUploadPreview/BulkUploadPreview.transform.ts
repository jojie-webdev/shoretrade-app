import { reduce } from 'ramda';
import { UploadBulkState } from 'types/store/UploadBulkState';

//left is error, right is valid
export const showListingCount = (listings: UploadBulkState[]): number[] => {
  return listings.reduce(
    (acc: Array<number>, listing, index: number): Array<number> => {
      const specifications: boolean =
        listing.specifications.length > 0 &&
        listing.specifications.every((a) => a.length > 0);

      const boxErrorCounter: number = listing.boxes.reduce(
        (boxCount: number, box): number => {
          const isSuccess: boolean =
            Boolean(box.weight) && Boolean(box.quantity);
          return boxCount + Number(isSuccess);
        },
        0
      );

      const stock: number = reduce(
        (weightCount: number, box): number =>
          weightCount + box.weight * box.quantity,
        0,
        listing.boxes
      );

      const isSuccess: '' | undefined | 0 | false | boolean =
        listing.type &&
        listing.pricePerKilo &&
        Boolean(boxErrorCounter) &&
        specifications &&
        !isNaN(stock);

      if (!isSuccess) {
        // console.log(`Row ${index}: FAIL`);
      }

      return [acc[0] + Number(!isSuccess), acc[1] + Number(isSuccess)];
    },
    [0, 0]
  );
};

export const getTotalWeight = (boxes: UploadBulkState['boxes']) => {
  return reduce(
    (acc, box): number => acc + box.weight * box.quantity,
    0,
    boxes
  );
};
