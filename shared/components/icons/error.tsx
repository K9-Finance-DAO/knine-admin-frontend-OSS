import { forwardRef, Ref, SVGProps } from 'react';

export const Error = forwardRef(
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
          stroke="#DF1C41"
          strokeWidth="3"
        />

        <path
          d="M47.4997 45.432L54.7391 38.1926L56.8071 40.2606L49.5677 47.5L56.8071 54.7394L54.7391 56.8073L47.4997 49.568L40.2604 56.8073L38.1924 54.7394L45.4318 47.5L38.1924 40.2606L40.2604 38.1926L47.4997 45.432Z"
          fill="#DF1C41"
        />
      </svg>
    );
  },
);
