import { useState } from 'react';
import Pagination from '../components/Pagination';
import SkdfIcon from '../components/SkdfIcon';
import classNames from 'classnames';
import { TableMock } from './mock';
import { FormCheck } from 'react-bootstrap';

function Paginations() {
  const data = [1, 2, 3, '...', 23, 24, '...', 230, 231, '...', 23000, 23001];
  const activeItems = [1, 23, 230, 23000];

  const [page, setPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value: number) => {
    // setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000);
    setPage(value);
  };

  return (
    <>
      <h2>SKDF Pagination</h2>
      <nav aria-label="Page navigation example">
        <ul className="pagination gap-2">
          <li className="page-item disabled">
            <a className="page-link" href="./Pagination" aria-label="Previous">
              <SkdfIcon name={'arrow_left'} />
            </a>
          </li>
          {data.map((item, index) => (
            <li
              key={index}
              className={classNames('page-item', {
                active: activeItems.some((el) => item === el),
                disabled: item === '...',
              })}
            >
              <a className="page-link" href="./Pagination">
                {item}
              </a>
            </li>
          ))}
          <li className="text-center page-item">
            <a className="page-link" href="./Pagination" aria-label="Next">
              <SkdfIcon name={'arrow_right'} />
            </a>
          </li>
        </ul>
      </nav>

      <form>
        <FormCheck
          id="isLoadingCheck"
          label="isLoading"
          // defaultChecked={isLoading}
          checked={isLoading}
          onChange={(e) => {
            setIsLoading(e.currentTarget.checked);
          }}
        />
      </form>

      <h3>Default</h3>
      <div className="d-flex flex-column gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 10, 100, 1000].map((v) => (
          <Pagination isLoading={isLoading} key={v} count={v} page={page} onPageChange={handleChange} />
        ))}
      </div>

      <h3>margin</h3>
      <nav>
        {[
          [0, 0],
          [0, 1],
          [1, 0],
          [1, 1],
          [2, 1],
          [3, 1],
          [1, 2],
          [2, 2],
          [3, 3],
        ].map((v) => {
          const [margin, edge] = v;
          return (
            <div key={`${margin}_${edge}`}>
              margin: {margin}, edge: {edge}
              <Pagination
                count={24}
                isLoading={isLoading}
                page={page}
                marginPagesDisplayed={margin}
                edgePagesDisplayed={edge}
                onPageChange={handleChange}
              />
            </div>
          );
        })}
      </nav>

      <hr className="my-5" />

      <h3>TableMock and Pagination</h3>
      <div className="table-responsive" style={{ maxHeight: '24rem' }}>
        <TableMock className="table skdf table-sticky-header table-hover text-nowrap" repeat={4} />
      </div>
      <Pagination count={24} page={page} onPageChange={handleChange} className="mt-2 mb-4" />
    </>
  );
}

export default Paginations;
