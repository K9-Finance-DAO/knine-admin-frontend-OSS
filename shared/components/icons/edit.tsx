import { forwardRef, Ref, SVGProps } from 'react';

export const Edit = forwardRef(
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
          d="M6.43225 14.4996H3.25V11.3173L11.8263 2.74107C11.9669 2.60047 12.1576 2.52148 12.3565 2.52148C12.5554 2.52148 12.7461 2.60047 12.8868 2.74107L15.0085 4.86282C15.1491 5.00347 15.2281 5.1942 15.2281 5.39307C15.2281 5.59195 15.1491 5.78268 15.0085 5.92332L6.43225 14.4996ZM3.25 15.9996H16.75V17.4996H3.25V15.9996Z"
          fill="current"
        />
      </svg>
    );
  },
);
