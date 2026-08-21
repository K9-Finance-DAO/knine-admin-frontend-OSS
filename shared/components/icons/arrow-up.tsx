import { forwardRef, Ref, SVGProps } from 'react';

export const ArrowUp = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        ref={svgRef}
        {...props}
      >
        <path
          d="M7.16658 6.01187L4.58916 8.5893L3.41064 7.41079L7.9999 2.82153L12.5892 7.41079L11.4106 8.5893L8.83325 6.01191L8.83325 12.0001H7.16659L7.16658 6.01187Z"
          fill="current"
        />
      </svg>
    );
  },
);
