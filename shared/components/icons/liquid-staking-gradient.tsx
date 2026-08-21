import { forwardRef, Ref, SVGProps } from 'react';

export const LiquidStakingGradient = forwardRef(
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
          d="M12.9 10.2H19.2L11.1 21.9V13.8H4.79999L12.9 2.09998V10.2Z"
          fill="url(#paint0_linear_1021_1715)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1021_1715"
            x1="4.79999"
            y1="21.9"
            x2="23.8382"
            y2="15.1154"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#DF391F" />
            <stop offset="1" stopColor="#F4A73C" />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);
