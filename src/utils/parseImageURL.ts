const urlMapping: {
  signedURL: string;
  cloudFrontURL: string;
}[] = [
  {
    signedURL:
      'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/',
    cloudFrontURL: 'https://assets-prod.shoretrade.com/',
  },
  {
    signedURL:
      'https://shoretrade-staging-assets.s3.ap-southeast-2.amazonaws.com/',
    cloudFrontURL: 'https://assets-staging.shoretrade.com/',
  },
  {
    signedURL:
      'https://shoretrade-prod-assets.s3.ap-southeast-2.amazonaws.com/',
    cloudFrontURL: 'https://assets-prod.shoretrade.com/',
  },
];

export const parseImageUrl = (url: string, fallback?: string) => {
  const mapIndex = urlMapping.findIndex((a) => url.includes(a.signedURL));
  if (mapIndex >= 0) {
    return url.replace(
      urlMapping[mapIndex].signedURL,
      urlMapping[mapIndex].cloudFrontURL
    );
  }

  const extension = url.substr(url.lastIndexOf('.'));
  if (
    extension !== '.jpg' &&
    extension !== '.png' &&
    extension !== '.jpeg' &&
    fallback
  ) {
    return fallback;
  }

  return url;
};
