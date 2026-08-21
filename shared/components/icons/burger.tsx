import { forwardRef, Ref, SVGProps } from 'react';

export const Burger = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        {...props}
      >
        <path
          d="M3.90039 4.79999H20.1004V6.59999H3.90039V4.79999ZM3.90039 11.1H20.1004V12.9H3.90039V11.1ZM3.90039 17.4H20.1004V19.2H3.90039V17.4Z"
          fill="#8590B6"
        />
      </svg>
    );
  },
);
