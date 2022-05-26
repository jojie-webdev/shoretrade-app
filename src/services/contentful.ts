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
}
export const getEntryBySlug = async (slug: string) => {
  const entries = (await contentfulClient.getEntries({
    'fields.slug': slug,
  })) as EntryCollection<any>;

  return entries;
};

export const searchTopicsByKeyword = async (
  keyword: string,
  user: string = 'buyer' || 'seller',
  contentType = 'topic'
) => {
  const options = {
    'fields.userGroup[match]': user,
    'fields.title[match]': keyword,
    content_type: contentType,
  };

  const entries = (await contentfulClient.getEntries(
    options
  )) as EntryCollection<any>;

  return entries;
};

export const getLinkedEntries = async (id: string) => {
  const entries = (await contentfulClient.getEntries({
    links_to_entry: id,
  })) as EntryCollection<any>;

  return entries;
};
