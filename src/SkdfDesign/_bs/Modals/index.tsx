import Examples from './Examples';
import LiveDemo from './LiveDemo';
import StaticBackdrop from './StaticBackdrop';
import WithoutAnimation from './WithoutAnimation';
import VerticallyCentered from './VerticallyCenteredModal';
import UsingGrid from './UsingGrid';
import FocusElement from './FocusElement';
import OptionalSizes from './OptionalSizes';
import FullscreenModal from './FullscreenModal';
import Scrolling from './Scrolling';
import ScrollingCustom from './ScrollingCustom';

function Modals() {
  return (
    <>
      <h1>
        <a href="https://getbootstrap.com/docs/5.2/components/modal" target="_blank" rel="noreferrer">
          Modal
        </a>
      </h1>
      <Examples />
      <LiveDemo />
      <StaticBackdrop />
      <Scrolling />
      <WithoutAnimation />
      <VerticallyCentered />
      <h2>Tooltips and popovers...</h2>
      <UsingGrid />
      <h2>Varying modal content...</h2>
      <h2>Toggle between modals...</h2>
      <FocusElement />
      <OptionalSizes />
      <FullscreenModal />
      <ScrollingCustom />
    </>
  );
}

export default Modals;
