import { forwardRef, Ref, SVGProps } from 'react';

export const ArrowLink = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        {...props}
      >
        <path
          d="M13.0582 8.01999L6.49494 14.5833L5.41669 13.505L11.9792 6.94173H6.19526V5.41663H14.5834V13.8047H13.0582V8.01999Z"
          fill="#8590B6"
        />
      </svg>
    );
  },
);
