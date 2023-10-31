import { triafly } from '../../triaflyClient';

export type DashbordCardProps = {
  // report?: {
  title: string;
  subTitle: {
    display_title?: string;
    name?: string;
  }[];
  value: {
    calc_value?: number;
    db_value?: number;
  }[];
  // };
};

export type ReportType = {
  data: {
    reportData: {
      data: {
        calc_value?: number;
        db_value?: number;
      }[][];
    };
  };
  headers: {
    colHeader: {
      name: string;
    }[][];
    reportHeaders: {
      row_header: {
        display_title: string;
        link: number;
      }[];
      col_header: {
        display_title?: string;
        name?: string;
      }[];
    };
  };
};

export async function getReport(id: string) {
  const response = await triafly.get<ReportType>(`report/${id}`);
  return response.data;
}
