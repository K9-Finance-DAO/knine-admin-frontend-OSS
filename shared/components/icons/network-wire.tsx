import { forwardRef, Ref, SVGProps } from 'react';

export const NetworkWire = forwardRef(
  (props: SVGProps<SVGSVGElement>, svgRef: Ref<SVGSVGElement>) => {
    return (
      <svg
        width="82"
        height="53"
        viewBox="0 0 82 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={svgRef}
        {...props}
      >
        <g opacity="0.66">
          <path
            d="M0 25.9941H29.9983C35.5672 25.9941 40.0818 30.5087 40.0818 36.0776V37.5901C40.0818 43.1591 44.5963 47.6736 50.1652 47.6736H80.1635"
            stroke="#525E88"
            strokeWidth="2.01669"
          />
          <path
            d="M7.05859 25.9941H29.9985C35.5674 25.9941 40.0819 21.4796 40.0819 15.9107V14.9023C40.0819 9.33339 44.5964 4.81888 50.1654 4.81888H73.1053"
            stroke="#525E88"
            strokeWidth="2.01669"
          />
          <rect
            x="73.105"
            y="0.787109"
            width="8.57094"
            height="8.57094"
            rx="2.01669"
            fill="#525E88"
          />
          <rect
            x="73.105"
            y="43.6426"
            width="8.57094"
            height="8.57094"
            rx="2.01669"
            fill="#525E88"
          />
          <rect
            y="21.9629"
            width="8.57094"
            height="8.57094"
            rx="2.01669"
            fill="#525E88"
          />
        </g>
      </svg>
    );
  },
);
