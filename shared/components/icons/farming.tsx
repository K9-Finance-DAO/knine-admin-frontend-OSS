import { forwardRef, Ref, SVGProps } from 'react';

export const Farming = forwardRef(
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
          d="M13.0375 10.0376L16.75 13.7501L13.0375 17.4626L11.977 16.4021L13.879 14.4993L4 14.5001V13.0001H13.879L11.977 11.0981L13.0375 10.0376ZM6.9625 2.5376L8.023 3.5981L6.121 5.5001H16V7.0001H6.121L8.023 8.9021L6.9625 9.9626L3.25 6.2501L6.9625 2.5376Z"
          fill="current"
        />
      </svg>
    );
  },
);
