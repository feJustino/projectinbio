import React, { useEffect } from 'react';

function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement | null>,
  handler?: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event?.target as HTMLElement;
      if (!ref.current || ref.current.contains(target)) {
        return;
      }
      if (handler) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mouseleave', listener);
      document.removeEventListener('touchend', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
