import { forwardRef, Ref, SVGProps } from 'react';

export const Twitter = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        {...props}
      >
        <g clipPath="url(#clip0_2444_3322)">
          <path
            d="M10.5 20.125C15.8157 20.125 20.125 15.8157 20.125 10.5C20.125 5.18426 15.8157 0.875 10.5 0.875C5.18426 0.875 0.875 5.18426 0.875 10.5C0.875 15.8157 5.18426 20.125 10.5 20.125Z"
            stroke="currentColor"
            strokeMiterlimit="10"
          />
          <path
            d="M4.56342 4.91406L9.16405 11.0654L4.53442 16.0668H5.57645L9.62978 11.6879L12.9046 16.0668H16.4504L11.5909 9.56949L15.9001 4.91406H14.8581L11.1253 8.94679L8.10923 4.91406H4.56342ZM6.09576 5.68153H7.72469L14.9179 15.2993H13.289L6.09576 5.68153Z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  },
);
