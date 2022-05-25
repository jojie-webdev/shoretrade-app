import { API } from 'consts';
import { createClient, Entry, EntryCollection } from 'contentful';

const contentfulClient = createClient({
  space: API.CONTENTFUL_SPACE_ID,
  environment: 'master',
  accessToken: API.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN,
  host: API.CONTENTFUL_HOST,
});

export const getEntryById = async (id: string) => {
  if (id) {
    const entry = (await contentfulClient.getEntry(id)) as Entry<any>;
    return entry;
  }
};

export const getEntriesByContentType = (
  content_type: string,
  additionalParams = {}
): Promise<any> => {
  return contentfulClient
    .getEntries({
      ...additionalParams,
      content_type,
      include: 2,
    })
    .then((res) => res);
};
