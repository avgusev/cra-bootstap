import Overview from './Overview';
import FormControls from './FormControls';
import Select from './Select';
import Checks from './Checks';
import Range from './Range';
import InputGroup from './InputGroup';
import Floating from './Floating';
import Layout from './Layout';
import Validation from './Validation';

function Forms() {
  return (
    <div className="mx-auto w-75">
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/forms/overview" target="_blank" rel="noreferrer">
          Forms
        </a>
      </h1>
      <Overview />
      <FormControls />
      <Select />
      <Checks />
      <Range />
      <InputGroup />
      <Floating />
      <Layout />
      <Validation />
    </div>
  );
}

export default Forms;
