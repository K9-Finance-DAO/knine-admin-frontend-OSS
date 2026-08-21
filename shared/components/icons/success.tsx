import { forwardRef, Ref, SVGProps } from 'react';

export const Success = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        width="105"
        height="105"
        viewBox="0 0 95 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        {...props}
      >
        <rect
          x="1.5"
          y="1.5"
          width="92"
          height="92"
          rx="46"
          stroke="#38C793"
          strokeWidth="3"
        />
        <path
          d="M37.8334 48.2384L43.7821 54.1458L57.1667 40.8541"
          stroke="#38C793"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
);
