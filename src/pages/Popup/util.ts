export const getRemoteURI = (): string | null => {
  return localStorage.getItem('remoteUrl');
};
export const doFetch = async (path: string, options: RequestInit) => {
  const url = getRemoteURI();
  if (url) {
    return await fetch((url + path).replace('//', '/'), options);
  } else {
    return new Promise((_, rej) => rej('Not found Remote Url'));
  }
};
