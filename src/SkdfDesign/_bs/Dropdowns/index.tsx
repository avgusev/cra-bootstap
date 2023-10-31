import Examples from './Examples';
import Sizing from './Sizing';
import Dark from './Dark';
import Directions from './Directions';
import Menu from './Menu';
import Alignment from './Alignment';
import Content from './Content';
import AutoClose from './AutoClose';

function Dropdowns() {
  return (
    <>
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/components/dropdowns/" target="_blank" rel="noreferrer">
          Dropdowns
        </a>
      </h1>
      <Examples />
      <Sizing />
      <Dark />
      <Directions />
      <Menu />
      <Alignment />
      <Content />
      <h2>Options...</h2>
      <p>
        <code>data-bs-offset</code> or <code>data-bs-reference</code> — Нет в react-bootstrap
      </p>
      <AutoClose />
    </>
  );
}

export default Dropdowns;
