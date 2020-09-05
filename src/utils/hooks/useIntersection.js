import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import 'intersection-observer'; // For IE

const baseOption = {
  root: null, // 부모가 되는 element
  threshold: 0.5, // 겹치는 정도.
  rootMargin: '0px', // rootMargin 이 있으면, threshold 계산할 때, rootMargin 영역 만큼 더 계산.
};

const useInterSection = (onIntersect, option) => {
  const [ref, setRef] = useState(null);
  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...baseOption,
        ...option,
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef];
};

export default useInterSection;
