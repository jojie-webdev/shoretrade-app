import axios from 'axios';
import md5 from 'blueimp-md5';
import Compressor from 'compressorjs';
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
  const newFile = new File([file], newFileName, { type });

  const { data: uploadURLData } = await axios({
    method: 'get',
    url: `${BASE_URL}/get-public-signed-url?name=${newFileName}&type=data:${type}&asset=${asset}`,
  });

  const uploadUrl: string = pathOr('', ['data', 'url', 'url'], uploadURLData);

  const downloadUrl = uploadUrl.substr(0, uploadUrl.indexOf('?'));

  const { status: uploadStatus } = await axios.put(uploadUrl, newFile, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  // BE only returns mobileUrl for jpeg/png
  const uploadMobileUrl: string = pathOr(
    '',
    ['data', 'url', 'mobileUrl'],
    uploadURLData
  );

  if (uploadMobileUrl) {
    // Do compression
    const compressedFile = await new Promise<File>((resolve, reject) => {
      new Compressor(newFile, {
        quality: 0.7,
        maxWidth: 800,
        success: (compressedResult) => {
          resolve(new File([compressedResult], newFileName, { type }));
        },
        error: (e) => {
          reject(e.message);
        },
      });
    });

    // Upload file
    await axios.put(uploadMobileUrl, compressedFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }

  return {
    status: uploadStatus,
    data: {
      url: downloadUrl,
    },
  };
};
