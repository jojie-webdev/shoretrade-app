import axios from 'axios';
import md5 from 'blueimp-md5';
import { API } from 'consts';
import last from 'ramda/es/last';
import pathOr from 'ramda/es/pathOr';

const BASE_URL = `${API.URL}/${API.VERSION}/uploads`;

export const uploadImageData = async ({
  file,
  asset,
}: {
  file: File;
  asset: 'company' | 'listing';
}) => {
  const fileName = file.name;
  const type = file.type;
  const extension = last(fileName.split('.')) || 'jpg';
  const hashedName = md5(fileName.split('.').slice(0, -1).join(''));
  const newFileName = `${hashedName}.${extension}`;

  const { data: uploadURLData } = await axios({
    method: 'get',
    url: `${BASE_URL}/get-public-signed-url?name=${newFileName}&type=${type}&asset=${asset}`,
  });

  const uploadUrl = pathOr('', ['data', 'url', 'url'], uploadURLData);

  const downloadUrl = uploadUrl.substr(0, uploadUrl.indexOf('?'));

  const { data: uploadResponse } = await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': type,
    },
  });

  console.log(uploadResponse);

  return {
    status: 200,
    data: {
      url: downloadUrl,
    },
  };
};
