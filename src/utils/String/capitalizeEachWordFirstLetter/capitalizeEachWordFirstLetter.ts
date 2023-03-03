const capitalizeEachWordFirstLetter = (text: string) => {
  const words = text.split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  const modifiedWords = words.join(' ');

  return modifiedWords;
};

export default capitalizeEachWordFirstLetter;
