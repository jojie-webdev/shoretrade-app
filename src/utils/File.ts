export const fileToBase64 = (
  file: File | null
): Promise<{
  name: string;
  type: string;
  data: string | ArrayBuffer | null;
}> => {
  return new Promise((resolve, reject) => {
    if (file !== null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          name: file.name,
          type: file.type,
          data: reader.result,
        });
      reader.onerror = (error) => reject(error);
    } else {
      reject('File is null');
    }
  });
};

export const base64ToFile = (
  url: string | ArrayBuffer | null,
  filename: string,
  mimeType: string
) => {
  if (typeof url === 'string') {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }
  throw new Error('Failed  to convert base64 to file');
};
