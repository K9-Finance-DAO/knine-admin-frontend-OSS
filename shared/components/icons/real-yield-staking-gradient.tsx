import { forwardRef, Ref, SVGProps } from 'react';

export const RealYieldStakingGradient = forwardRef(
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
          d="M5.58571 3.90039H18.4143C18.5563 3.90037 18.6963 3.93396 18.8229 3.9984C18.9494 4.06285 19.0589 4.15632 19.1424 4.27119L22.5831 9.00159C22.6443 9.08576 22.6744 9.18852 22.6683 9.29239C22.6622 9.39627 22.6204 9.49482 22.5498 9.57129L12.3303 20.6422C12.2882 20.6877 12.2371 20.7241 12.1802 20.7489C12.1234 20.7737 12.062 20.7866 12 20.7866C11.938 20.7866 11.8766 20.7737 11.8198 20.7489C11.7629 20.7241 11.7118 20.6877 11.6697 20.6422L1.45021 9.57219C1.37942 9.49566 1.3374 9.39693 1.33133 9.29286C1.32526 9.18879 1.3555 9.08584 1.41691 9.00159L4.85761 4.27119C4.94111 4.15632 5.05061 4.06285 5.17715 3.9984C5.3037 3.93396 5.4437 3.90037 5.58571 3.90039Z"
          fill="url(#paint0_linear_2017_10669)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2017_10669"
            x1="1.33057"
            y1="20.7866"
            x2="24.3133"
            y2="6.55575"
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
