import { useEffect, useRef, useState } from 'react';
// import { ScrollSpy } from 'bootstrap';
import ScrollSpy from 'bootstrap/js/dist/scrollspy';

function useBSScrollSpy(smoothScroll = true) {
  const ref = useRef(null);
  const refTarget = useRef(null);

  const [active, setActive] = useState('');

  useEffect(() => {
    if (!ref.current || !refTarget.current) return;

    const element = ref.current as HTMLElement;
    const target = refTarget.current;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ScrollSpy.getOrCreateInstance(element, { target, smoothScroll });

    element.addEventListener('activate.bs.scrollspy', function (event) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setActive(event.relatedTarget.hash);
    });

    return () => {
      ScrollSpy.getInstance(element)?.dispose();
    };
  }, [smoothScroll]);

  return { ref, refTarget, ScrollSpy, active, setActive };
}

export default useBSScrollSpy;
