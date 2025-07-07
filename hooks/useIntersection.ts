import React, { useEffect } from "react";

const useIntersection = ({
  onIntersect,
  targetRef,
  enabled,
}: {
  onIntersect: () => void;
  targetRef: React.RefObject<HTMLDivElement | null>;
  enabled?: boolean;
}) => {
  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect();
      }
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef, onIntersect, enabled]);
};

export default useIntersection;
