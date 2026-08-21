import { forwardRef, Ref, SVGProps } from 'react';

export const LiquidStakingActive = forwardRef(
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
          d="M10.75 8.5H16L9.25 18.25V11.5H4L10.75 1.75V8.5Z"
          fill="current"
        />
      </svg>
    );
  },
);
