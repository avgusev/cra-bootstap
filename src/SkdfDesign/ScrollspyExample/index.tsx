import ScrollSpySimple from './ScrollSpySimple';
import ScrollSpyNested from './ScrollSpyNested';
import MockLorem from '../mock/Lorem';

export function Lorem() {
  return (
    <p>
      <MockLorem />
    </p>
  );
}

function ScrollSpy() {
  return (
    <>
      <h2>SKDF ScrollSpy</h2>

      <ScrollSpySimple />
      <hr className="my-5" />
      <ScrollSpyNested />
      <hr className="my-5" />
    </>
  );
}

export default ScrollSpy;
