import Skeleton from '../components/Skeleton';

function DashbordAnalitic() {
  return (
    <>
      <h2 className="pb-3 mb-4">
        <Skeleton />
      </h2>
      <Skeleton style={{ height: 40, borderRadius: '0.125rem' }} />
      <div className="d-grid gap-2.5 mt-2r">
        <Skeleton style={{ width: 260 }} />
        <Skeleton style={{ width: 340 }} />
        <Skeleton style={{ width: 200 }} />
      </div>
    </>
  );
}

function DashbordSkeleton() {
  return (
    <>
      <div className="d-flex gap-3">
        <Skeleton style={{ width: 56, height: 56 }} className="rounded-circle" />
        <h3 className="d-grid gap-2 w-100">
          <Skeleton />
          <Skeleton style={{ width: '50%' }} />
        </h3>
      </div>
      <div className="mt-4 mb-2.5">
        <Skeleton style={{ height: 40, borderRadius: '0.125rem' }} />
      </div>
      <div className="d-flex mb-3">
        <Skeleton style={{ width: '25%' }} />
        <Skeleton style={{ width: '25%' }} className="ms-auto" />
      </div>
      <div className="d-grid gap-2">
        <Skeleton style={{ width: 240 }} />
        <Skeleton style={{ width: 160 }} />
      </div>
    </>
  );
}

function Skeletons() {
  return (
    <>
      <h1>SKDF Skeletons</h1>

      <h1>
        <Skeleton>Внутри h1</Skeleton>
      </h1>
      <h2>
        <Skeleton>Внутри h2</Skeleton>
      </h2>
      <h3>
        <Skeleton>Внутри h3</Skeleton>
      </h3>
      <Skeleton />

      <hr className="my-5" />

      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="skdf-shadow-down-8dp rounded p-4">
              <DashbordAnalitic />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="skdf-shadow-down-8dp rounded p-4">
              <DashbordSkeleton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Skeletons;
