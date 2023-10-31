import client from '../../httpClient';
import type { AccessMatrix } from './types';
import { defaultAccessMatrix } from './defaultAccessMatrix';

export async function fetchAccessMatrix() {
  let data: AccessMatrix = defaultAccessMatrix;
  await client.get<AccessMatrix>('common/user/resources-visibility').then((response) => {
    if (response) {
      data = response.data;
    }
  });
  return data;
}
