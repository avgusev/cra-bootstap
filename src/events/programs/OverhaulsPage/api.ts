import client from '../../httpClient';

const programsUrl = 'events/programs';

export type OverhaulsResponse = {
  data: {
    program_id: number;
    program_type: number;
    region: {
      id: number;
      name: string;
    };
    status: {
      id: number;
      date: string;
      name: string;
    };
    bkd_fias: number;
    work_type: {
      id: number;
      name: string;
    };
    object_work_type: {
      id: number;
      name: string;
    };
    maintenance: number;
    organization: {
      id: number;
      name: string;
    };
    name: string;
    name_short: string;
    level: {
      id: number;
      name: string;
    };
    years: number[];
    version: {
      id: number;
      date: string;
      name: string;
    };

    sum_cost: number;
    children: OverhaulsResponse['data'];
  }[];
};

export type SearchOption = {
  id: number;
  text: string;
};

export async function fetchPrograms() {
  const response = await client.post<OverhaulsResponse>(programsUrl, { program_type: 2 });
  return response.data;
}
