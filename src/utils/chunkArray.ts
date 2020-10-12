export default function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  let ndx = 0;
  const retVal = [];

  for (let x = 0; x < arr.length; x += chunkSize) {
    const chunkNdx = x + chunkSize;

    retVal[ndx] = arr.slice(x, chunkNdx);
    ndx++;
  }

  return retVal;
}
