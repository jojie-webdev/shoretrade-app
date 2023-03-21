export const transformGetListingBoxes = (listingBoxes: {
  token: string;
  boxes: {
    count: number | null;
    id: string;
    quantity: number | null;
    weight: number;
  }[][];
  shipping: [];
}) => {
  const modifiedBoxes = listingBoxes.boxes.map((groupedBoxes) =>
    groupedBoxes.map((box) => {
      return {
        id: box.id,
        count: box.count || 0,
        weight: box.weight,
        quantity: box.quantity || 0,
      };
    })
  );

  const modifiedListingBoxes = { ...listingBoxes, boxes: modifiedBoxes };
  return modifiedListingBoxes;
};
