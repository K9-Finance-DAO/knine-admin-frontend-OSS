import { forwardRef, Ref, SVGProps } from 'react';

export const Plus = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    const color = props?.color || 'currentColor';
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        ref={svgRef}
        {...props}
      >
        <path
          d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
          fill={color}
        />
      </svg>
    );
  },
);
