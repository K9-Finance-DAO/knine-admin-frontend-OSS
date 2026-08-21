import { forwardRef, Ref, SVGProps } from 'react';

export const ChevronArrow = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        ref={svgRef}
        {...props}
      >
        <path
          d="M9.121 10.0001L12.8335 13.7126L11.773 14.7731L7 10.0001L11.773 5.22705L12.8335 6.28755L9.121 10.0001Z"
          fill="current"
        />
      </svg>
    );
  },
);
