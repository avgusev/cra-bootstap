import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SkdfIcon from '../../../components/SkdfIcon';
import classes from '../MainPage.module.scss';
import { formatKilometers, formatNumber } from '../../../utils';
import { DashbordCardProps, getReport, ReportType } from '../api';
import Skeleton from '../../../components/Skeleton';
import classNames from 'classnames';

function Legend({ color = '', title = '', total = '' }) {
  return (
    <div className="d-inline-flex flex-wrap">
      <div
        className="rounded-circle my-auto me-2"
        style={{
          width: '0.75rem',
          height: '0.75rem',
          backgroundColor: color,
        }}
      />
      <span className="pe-3 text-nowrap">{title}</span>
      {total && (
        <>
          <span className="d-none d-md-flex ms-3 fw-semibold text-nowrap">{total}</span>
          <span className="d-md-none ms-3 fw-semibold text-nowrap">{total}</span>
        </>
      )}
    </div>
  );
}

function Line({ count = 0, total = 0, color = '' }) {
  return (
    <div
      className="py-2 px-2.5 text-white"
      style={{
        minWidth: '3rem',
        width: total > 0 ? Math.round((count * 100) / total) + '%' : 50 + '%',
        backgroundColor: color ? color : 'transparent',
      }}
    >
      &nbsp;{total > 0 ? Math.round((count * 100) / total) + '%' : ''}
    </div>
  );
}

function AnaliticsSkeleton() {
  return (
    <>
      <h2 className="pb-3 mb-4">
        <Skeleton />
      </h2>
      <Skeleton style={{ height: 40, borderRadius: '0.125rem' }} />
      <div className="d-flex flex-wrap gap-2.5 mt-2r">
        <Skeleton style={{ width: 260 }} />
        <Skeleton style={{ width: 340 }} />
        <Skeleton style={{ width: 200 }} />
      </div>
    </>
  );
}

function ConsolidatedSkeleton() {
  return (
    <>
      <h2 className="d-grid gap-2 w-100 pb-3 mb-4">
        <Skeleton />
        {/* <Skeleton style={{ width: '50%' }} /> */}
      </h2>
      <div className="mt-4 mb-2.5">
        <Skeleton style={{ height: 40, borderRadius: '0.125rem' }} />
      </div>
      <div className="d-flex">
        <Skeleton style={{ width: '25%' }} />
        <Skeleton style={{ width: '25%' }} className="ms-auto" />
      </div>
      <div className="d-grid gap-2.5 mt-4">
        <Skeleton style={{ height: 20, width: 240 }} />
        <Skeleton style={{ height: 20, width: 160 }} />
      </div>
    </>
  );
}

function DashbordCard({ report }: { report?: DashbordCardProps }) {
  const count = report && report.value[0].calc_value ? report.value[0].calc_value : 0;
  const total =
    report && report.value[0].calc_value && report.value[1].calc_value
      ? report.value[0].calc_value + report.value[1].calc_value
      : 0;
  const totalTitle =
    report &&
    report.value[0].calc_value &&
    report.value[1].calc_value &&
    (Math.round(total * 100) / 100).toLocaleString();

  return (
    <div className="position-relative bg-white skdf-shadow-down-8dp rounded p-4 w-100 mt-5 mb-4">
      {report ? (
        <>
          <div className="d-none d-lg-flex gap-3  mb-4">
            <h2
              className="mb-3 me-auto"
              // style={{ maxWidth: '18.5rem' }}
            >
              {report.title}:
            </h2>
            {totalTitle ? <h2 className="mb-0 text-end">{totalTitle} млн&nbsp;₽</h2> : <h2>нет данных</h2>}
          </div>
          <div className="d-lg-none  mb-4">
            <h2 className="mb-3 me-auto">
              {report.title}: {totalTitle ? <span>{totalTitle} млн&nbsp;₽</span> : <span>нет данных</span>}
            </h2>
          </div>

          <div
            className="d-flex text-end mt-4 mb-2.5"
            style={{
              borderRadius: '0.125rem',
              background: `linear-gradient(90deg, #0D47A1 ${
                total > 0 ? Math.round((count * 100) / total) + '%' : 50 + '%'
              }, #E5E7E8 2%)`,
            }}
          >
            <Line count={count} total={total} />
          </div>

          <div className="d-flex">
            <div className="d-flex flex-wrap gap-lg-5 gap-2.5 mt-4">
              <Legend
                color={'#0D47A1'}
                title={report.subTitle[0].display_title}
                total={
                  report.value[0].calc_value
                    ? formatNumber(Math.round(report.value[0].calc_value * 100) / 100) + ' млн ₽'
                    : 'Нет данных'
                }
              />
              <Legend
                color={'#E5E7E8'}
                title={report.subTitle[1].display_title}
                total={
                  report.value[1].calc_value
                    ? formatNumber(Math.round(report.value[1].calc_value * 100) / 100) + ' млн ₽'
                    : 'Нет данных'
                }
              />
            </div>
            <Link
              to="/indicators/Расходы"
              className="ps-2 ms-auto mt-auto text-decoration-none"
              target="_blank"
              rel="noreferrer"
            >
              <SkdfIcon name="arrow-left" className="text-primary" style={{ transform: 'rotate(180deg)' }} />
            </Link>
          </div>
        </>
      ) : (
        <ConsolidatedSkeleton />
      )}
    </div>
  );
}

const TransformData = (report: ReportType) => {
  return {
    title: report.headers.reportHeaders.row_header[0].display_title,
    subTitle: report.headers.reportHeaders.col_header,
    value: report.data.reportData.data[0],
  };
};

// const colors = ['#4178D0', '#0D47A1', '#002C70'];
const colors = ['#002C70', '#0D47A1', '#4178D0'];

function Dashboards() {
  const [report, setReport] = useState<ReportType>();
  const [reportGeneral, setReportGeneral] = useState<DashbordCardProps>();

  useEffect(() => {
    getReport('29223477')
      .then((data) => setReport(data))
      .catch((e) => console.log(e));
    getReport('29643203')
      .then((data) => setReportGeneral(TransformData(data)))
      .catch((e) => console.log(e));
  }, []);

  const total =
    report && report.data
      ? report.data.reportData.data.reduce((sum: number, elem: { db_value?: number }[]) => {
          return elem[0].db_value ? sum + elem[0]?.db_value : 0;
        }, 0)
      : 0;

  return (
    <div className="py-xl-6r py-5" style={{ backgroundColor: '#E7ECF5' }}>
      <div className="container">
        <div className={classes.anchor} id="analitics" />
        <h1 className="mb-5">Аналитические показатели</h1>

        <div className="position-relative bg-white skdf-shadow-down-8dp rounded p-4 w-100 mt-5 mb-4">
          {report && report.data ? (
            <>
              <div className="d-none d-lg-flex justify-content-between mb-4">
                <h2 className="mb-3">{report.headers?.colHeader[0] ? report.headers?.colHeader[0][0].name : ''}:</h2>
                <h2 className="mb-3 text-nowrap">{formatKilometers(total)}</h2>
              </div>
              <div className="d-lg-none mb-4">
                <h2 className="mb-3">
                  {report.headers.colHeader[0] ? report.headers.colHeader[0][0].name : ''}:{' '}
                  <span className="text-nowrap">{formatKilometers(total)}</span>
                </h2>
              </div>

              <div className={classNames('d-flex text-end  mb-2.5', classes.lineRounded)}>
                {report.data.reportData.data
                  .map((data, index) => (
                    <Line key={index} count={data[0].db_value} total={total} color={colors[index]} />
                  ))
                  .reverse()}
              </div>
              <div className="d-flex">
                <div className="d-xl-flex d-grid gap-xl-5 gap-2.5 mt-4">
                  {report.data.reportData.data
                    .map((data, index) => (
                      <Legend
                        key={index}
                        color={colors[index]}
                        title={report.headers.reportHeaders.row_header[index].display_title}
                        total={data[0]?.db_value ? formatKilometers(data[0]?.db_value) : ''}
                      />
                    ))
                    .reverse()}
                </div>
                <Link
                  to="/indicators/Все%20дороги"
                  className="ms-auto mt-auto text-decoration-none"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SkdfIcon name="arrow-left" className="text-primary" style={{ transform: 'rotate(180deg)' }} />
                </Link>
              </div>
            </>
          ) : (
            <AnaliticsSkeleton />
          )}
        </div>

        <div className="row">
          <div className="col-12 mb-4">
            <DashbordCard report={reportGeneral} />
          </div>
        </div>

        <div className="mt-4">
          <Link to="/desktop" className="text-decoration-none">
            Все показатели
            <SkdfIcon name="arrow-left" className="ms-2" style={{ transform: 'rotate(180deg)' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboards;
