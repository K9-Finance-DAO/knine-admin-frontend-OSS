import { forwardRef, Ref, SVGProps } from 'react';

export const Info = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="18"
        viewBox="0 0 19 18"
        fill="none"
        ref={svgRef}
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 3C6.18629 3 3.5 5.68629 3.5 9C3.5 12.3137 6.18629 15 9.5 15C12.8137 15 15.5 12.3137 15.5 9C15.5 5.68629 12.8137 3 9.5 3ZM2 9C2 4.85786 5.35786 1.5 9.5 1.5C13.6421 1.5 17 4.85786 17 9C17 13.1421 13.6421 16.5 9.5 16.5C5.35786 16.5 2 13.1421 2 9Z"
          fill="current"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.75 12.75V8.25H10.25V12.75H8.75Z"
          fill="current"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.75 6.75V5.25H10.25V6.75H8.75Z"
          fill="current"
        />
      </svg>
    );
  },
);
