import { API } from 'consts';
import { createClient, Entry, EntryCollection } from 'contentful';

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

/**
 * Using the entry Id of assumed topicId
 * get the caterory id and slug with the topic slug as well
 * @param id
 */
export const getEntryHyperLink = async (id: string) => {
  const entry = (await contentfulClient.getEntry(id)) as Entry<any>;
};
