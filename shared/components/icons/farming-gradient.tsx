import { forwardRef, Ref, SVGProps } from 'react';

export const FarmingGradient = forwardRef(
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
          d="M15.645 12.0449L20.1 16.4999L15.645 20.9549L14.3724 19.6823L16.6548 17.399L4.80002 17.3999V15.5999H16.6548L14.3724 13.3175L15.645 12.0449ZM8.35502 3.04492L9.62762 4.31752L7.34522 6.59992H19.2V8.39992H7.34522L9.62762 10.6823L8.35502 11.9549L3.90002 7.49992L8.35502 3.04492Z"
          fill="url(#paint0_linear_2349_3082)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2349_3082"
            x1="3.90002"
            y1="20.9549"
            x2="24.0749"
            y2="12.0131"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#DF391F" />
            <stop offset="1" stopColor="#F4A73C" />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);
