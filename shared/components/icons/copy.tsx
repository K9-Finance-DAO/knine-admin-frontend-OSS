import { SVGProps, forwardRef, Ref } from 'react';

export const Copy = forwardRef(function Copy(
  props: SVGProps<SVGSVGElement>,
  svgRef?: Ref<SVGSVGElement>,
) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      ref={svgRef}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3333 2.5H3.33331V14.1667H6.66665V17.5H16.6666V5.83333H13.3333V2.5ZM11.6666 5.83333V4.16667H4.99998V12.5H6.66665V5.83333H11.6666ZM8.33331 15.8333V7.5H15V15.8333H8.33331Z"
        fill="current"
      />
    </svg>
  );
});
