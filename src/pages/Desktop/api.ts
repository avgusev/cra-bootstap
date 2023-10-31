import { triafly } from '../../triaflyDesktopClient';

export async function getDashboards() {
  const response = await triafly.get<{ id: number; '-3': string }[]>('set/-1301');
  return response.data;
}
