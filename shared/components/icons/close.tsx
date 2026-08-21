import { forwardRef, Ref, SVGProps } from 'react';

export const Close = forwardRef(
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
          d="M12.0001 10.7275L16.4551 6.27246L17.7277 7.54506L13.2727 12.0001L17.7277 16.4551L16.4551 17.7277L12.0001 13.2727L7.54506 17.7277L6.27246 16.4551L10.7275 12.0001L6.27246 7.54506L7.54506 6.27246L12.0001 10.7275Z"
          fill="#525E88"
        />
      </svg>
    );
  },
);
