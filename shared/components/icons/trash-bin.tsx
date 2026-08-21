import { forwardRef, Ref, SVGProps } from 'react';

export const TrashBin = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        {...props}
      >
        <path
          d="M14.25 5.5H18V7H16.5V16.75C16.5 16.9489 16.421 17.1397 16.2803 17.2803C16.1397 17.421 15.9489 17.5 15.75 17.5H5.25C5.05109 17.5 4.86032 17.421 4.71967 17.2803C4.57902 17.1397 4.5 16.9489 4.5 16.75V7H3V5.5H6.75V3.25C6.75 3.05109 6.82902 2.86032 6.96967 2.71967C7.11032 2.57902 7.30109 2.5 7.5 2.5H13.5C13.6989 2.5 13.8897 2.57902 14.0303 2.71967C14.171 2.86032 14.25 3.05109 14.25 3.25V5.5ZM15 7H6V16H15V7ZM8.25 9.25H9.75V13.75H8.25V9.25ZM11.25 9.25H12.75V13.75H11.25V9.25ZM8.25 4V5.5H12.75V4H8.25Z"
          fill="current"
        />
      </svg>
    );
  },
);
