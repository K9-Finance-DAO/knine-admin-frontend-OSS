import { forwardRef, Ref, SVGProps } from 'react';

export const StatisticsActive = forwardRef(
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
          d="M2.5 10.75H7V16.75H2.5V10.75ZM7.75 3.25H12.25V16.75H7.75V3.25ZM13 7H17.5V16.75H13V7Z"
          fill="current"
        />
      </svg>
    );
  },
);
