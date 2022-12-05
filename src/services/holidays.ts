import axios from 'axios';

const HOLIDAY_API =
  'https://data.gov.au/data/api/3/action/datastore_search_sql';
const RESOURCE_ID = '33673aca-0857-42e5-b8f0-9981b4755686';
const query = `SELECT "data"."Holiday Name" as "holiday",
               "data"."_id" as "id", TO_DATE("data"."Date",  'YYYYMMDD') AS "holiday_date" 
               from "${RESOURCE_ID}" AS "data"
               WHERE "data"."Jurisdiction" LIKE 'nsw' 
               AND TO_DATE("data"."Date",  'YYYYMMDD') >= NOW()`;

export const getNSWHolidays = () => {
  return axios({
    method: 'get',
    url: `${HOLIDAY_API}?sql=${encodeURIComponent(query)}`,
  })
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      // Ignore error
      return e && e.response ? e.response.data : undefined;
    });
};
