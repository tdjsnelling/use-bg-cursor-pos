import { useEffect, useRef, useState, MutableRefObject } from "react";

export default (
  backgroundColor: string,
  highlightColor: string,
  highlightSize: string = "400px",
  active: boolean = true
): [MutableRefObject<HTMLElement>, string] => {
  const [cursorInItem, setCursorInItem] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<[number, number]>([0, 0]);

  const elementRef = useRef<HTMLElement>();

  useEffect(() => {
    if (active) {
      const handleMouseEnter = () => {
        setCursorInItem(true);
      };
      const handleMouseLeave = () => {
        setCursorInItem(false);
      };
      if (elementRef.current) {
        elementRef.current.addEventListener("mouseenter", handleMouseEnter);
        elementRef.current.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          elementRef.current?.removeEventListener(
            "mouseenter",
            handleMouseEnter
          );
          elementRef.current?.removeEventListener(
            "mouseleave",
            handleMouseLeave
          );
        };
      }
    }
  }, [elementRef, active]);

  useEffect(() => {
    if (active) {
      const handleMouseMove = (e) => {
        const rect = elementRef.current.getBoundingClientRect();
        const x = e.clientX - rect.x;
        const y = e.clientY - rect.y;
        const xPerc = (x / rect.width) * 100;
        const yPerc = (y / rect.height) * 100;
        setCursorPos([xPerc, yPerc]);
      };
      if (elementRef.current) {
        if (cursorInItem) {
          elementRef.current.addEventListener("mousemove", handleMouseMove);
        } else {
          elementRef.current.removeEventListener("mousemove", handleMouseMove);
        }
        return () => {
          elementRef.current?.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }
  }, [elementRef, cursorInItem, active]);

  return [
    elementRef,
    cursorInItem
      ? `radial-gradient(circle at ${cursorPos[0]}% ${cursorPos[1]}%, ${highlightColor} 0%, ${backgroundColor} ${highlightSize})`
      : backgroundColor,
  ];
};
