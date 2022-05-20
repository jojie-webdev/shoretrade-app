// Create temporary token that can be used for v2 endpoints
// Ideally used for token that is included in url request (ex. download pdf urls )
export const toTemporaryTokenV2 = (authToken: string) => {
  return Buffer.from(`Bearer ${authToken}:${new Date().getTime()}`)
    .toString('base64')
    .split('')
    .reverse()
    .join('');
};
