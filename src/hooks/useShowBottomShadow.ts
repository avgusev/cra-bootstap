import { useCallback, useState } from 'react';

export const getScrollPosition = (target: Element) => {
  const epsilon = 5;
  const { clientHeight, scrollHeight, scrollTop } = target;
  // console.log(clientHeight, scrollHeight, scrollTop, clientHeight + scrollTop);

  if (clientHeight === scrollHeight) return 'none';
  if (scrollTop === 0) return 'top';
  if (scrollTop + clientHeight + epsilon >= scrollHeight) return 'bottom';
  return 'middle';
};

export default function useShowBottomShadow(): [boolean, boolean, (e: Element | null) => void] {
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const elementRef = useCallback((element: Element | null) => {
    if (!element) return;

    function handle() {
      if (!element) return;
      const position = getScrollPosition(element);
      setHasScrollbar(position !== 'none');
      setShowBottomShadow(position !== 'bottom' && position !== 'none');
    }

    element.addEventListener('scroll', handle);
    new ResizeObserver(handle).observe(element);
    handle();
  }, []);

  return [hasScrollbar, showBottomShadow, elementRef];
}
