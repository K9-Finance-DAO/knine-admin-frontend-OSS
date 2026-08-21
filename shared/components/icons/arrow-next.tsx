import { forwardRef, Ref, SVGProps } from 'react';

export const ArrowNext = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        {...props}
      >
        <path
          d="M3.879 5.00044L0.166504 1.28794L1.227 0.227437L6 5.00044L1.227 9.77344L0.166504 8.71294L3.879 5.00044Z"
          fill="currentColor"
        />
      </svg>
    );
  },
);
