import { forwardRef, Ref, SVGProps } from 'react';

export const StatisticsGradient = forwardRef(
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
          d="M3 12.9004H8.4V20.1004H3V12.9004ZM9.3 3.90039H14.7V20.1004H9.3V3.90039ZM15.6 8.40039H21V20.1004H15.6V8.40039Z"
          fill="url(#paint0_linear_1373_11000)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1373_11000"
            x1="3"
            y1="20.1004"
            x2="23.6877"
            y2="8.83706"
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
