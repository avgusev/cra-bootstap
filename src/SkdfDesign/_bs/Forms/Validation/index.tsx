import ValidationCustom from './ValidationCustom';
import ValidationBrowser from './ValidationBrowser';
import Supported from './Supported';
import Tooltips from './Tooltips';
import ServerSide from './ServerSide';

function Validation() {
  return (
    <>
      <h2>Validation</h2>
      <ValidationCustom />
      <ValidationBrowser />
      <ServerSide />
      <Supported />
      <Tooltips />
    </>
  );
}

export default Validation;
