import { API } from 'consts';
import { createClient, Entry } from 'contentful';

const contentfulClient = createClient({
  space: API.CONTENTFUL_SPACE_ID,
  environment: 'master',
  accessToken: API.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN,
  host: API.CONTENTFUL_HOST,
});

export const getEntryById = async (id: string) => {
  const entry = (await contentfulClient.getEntry(id)) as Entry<any>;

  return entry;
};
