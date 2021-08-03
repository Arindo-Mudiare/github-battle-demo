import React from "react";

export default function useHover() {
  const onMouseOver = () => setHovering(true);
  const onMouseOut = () => setHovering(false);

  return [
    hovering,
    {
      onMouseOut,
      onMouseOver,
    },
  ];
}
