import Overview from './Overview';
import Variants from './Variants';
import Accented from './Accented';
import Borders from './Borders';
import Small from './Small';
import Divider from './Divider';
import Alignments from './Alignments';
import Nested from './Nested';
import Anatomy from './Anatomy';
import Responsive from './Responsive';

function Tables() {
  return (
    <>
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/content/tables/" target="_blank" rel="noreferrer">
          Tables
        </a>
      </h1>
      <hr />
      <Overview />
      <Variants />
      <Accented />
      <Borders />
      <Small />
      <Divider />
      <Alignments />
      <Nested />
      <Anatomy />
      <Responsive />
    </>
  );
}

export default Tables;
