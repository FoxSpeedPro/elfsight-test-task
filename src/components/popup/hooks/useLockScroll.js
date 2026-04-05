import { useEffect } from 'react';

export function useLockScroll(isLocked) {
  useEffect(() => {
    if (!isLocked) {
      return;
    }

    const scrollY = window.scrollY;
    const { style } = document.body;

    const previousStyles = {
      position: style.position,
      top: style.top,
      width: style.width,
      overflowY: style.overflowY
    };

    style.position = 'fixed';
    style.top = `-${scrollY}px`;
    style.width = '100%';
    style.overflowY = 'scroll';

    return () => {
      style.position = previousStyles.position;
      style.top = previousStyles.top;
      style.width = previousStyles.width;
      style.overflowY = previousStyles.overflowY;

      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
