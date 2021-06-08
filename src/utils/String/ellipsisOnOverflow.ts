export const ellipsisOnOverflow = (text: string, maxlen: number) => {
  let newtext = text;
  if (text.length > maxlen) {
    newtext = `${text.substring(0, maxlen - 3)}...`;
  }

  return newtext;
};
