import { forwardRef, Ref, SVGProps } from 'react';

export const Telegram = forwardRef(
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
          d="M10.5 17.5C6.35775 17.5 3 14.1423 3 10C3 5.85775 6.35775 2.5 10.5 2.5C14.6423 2.5 18 5.85775 18 10C18 14.1423 14.6423 17.5 10.5 17.5ZM8.1675 10.8775L8.17725 10.8722L8.82975 13.0248C8.91375 13.258 9.02925 13.3 9.1695 13.2805C9.3105 13.2618 9.38475 13.186 9.477 13.0975L10.368 12.2365L12.2805 13.6525C12.63 13.8453 12.8813 13.7455 12.9683 13.3285L14.211 7.462C14.3483 6.916 14.1083 6.697 13.6845 6.871L6.38475 9.691C5.88675 9.8905 5.88975 10.1695 6.29475 10.2933L8.1675 10.8783V10.8775Z"
          fill="current"
        />
      </svg>
    );
  },
);
