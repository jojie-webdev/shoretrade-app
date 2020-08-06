// TODO: Handle upload service
// Reference code from app version

// import axios from 'axios';
// import md5 from 'blueimp-md5';
// import { API } from 'consts';
// import last from 'ramda/es/last';
// import pathOr from 'ramda/es/pathOr';
// import RNFetchBlob from 'rn-fetch-blob';

// const BASE_URL = `${API.URL}/${API.VERSION}/uploads`;

export const uploadImageData = async ({
  fileName,
  data,
  type,
  asset,
}: {
  fileName: string;
  data: string;
  type: string;
  asset: 'company' | 'listing';
}) => {
  // const extension = last(fileName.split('.')) || 'jpg';
  // const hashedName = md5(fileName.split('.').slice(0, -1).join(''));
  // const newFileName = `${hashedName}.${extension}`;

  // const { data: uploadURLData } = await axios({
  //   method: 'get',
  //   url: `${BASE_URL}/get-public-signed-url?name=${newFileName}&type=${type}&asset=${asset}`,
  // });

  // const uploadUrl = pathOr('', ['data', 'url', 'url'], uploadURLData);

  // const downloadUrl = uploadUrl.substr(0, uploadUrl.indexOf('?'));

  // const uploadResponse = await RNFetchBlob.fetch(
  //   'PUT',
  //   uploadUrl,
  //   {
  //     'Content-Type': 'application/octet-stream',
  //   },
  //   data
  // );

  // return {
  //   status: uploadResponse.respInfo.status,
  //   data: {
  //     url: downloadUrl,
  //   },
  // };

  // TODO: Replace this fake response
  return {
    status: 200,
    data: {
      url: 'https://picsum.photos/id/1041/512/512.jpg',
    },
  };
};
