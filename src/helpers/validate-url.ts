// Throw an error if url is not valid, else return validated url.
export const validateUrl = (url: string): string | Error => {
  const urlObj = new URL(url);

  const strArray = url.split('/');
  const shouldFail =
    strArray[strArray.length - 2] === 'api' &&
    strArray[strArray.length - 1] === 'v1';

  if (shouldFail) throw new Error('baseUrl should not end with `/api/v1`');

  return urlObj.toString().replace(/\/+$/, '');
};
