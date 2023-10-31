import client, { filesURL } from './httpClient';

export async function fetchBlobImage(storageFileId: string, size = 768) {
  const response = await client.get<Blob>(`${filesURL}/image/${storageFileId}/${size}/${size}`, {
    responseType: 'blob',
  });

  return response.data;
}
