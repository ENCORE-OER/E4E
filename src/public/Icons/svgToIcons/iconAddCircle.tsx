type IconAddCircleProps = {
  stroke: string;
  fill: string;
};

export const IconAddCircle = ({ stroke, fill }: IconAddCircleProps) => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.80029 9.40234H12.8003M9.80029 12.4023V6.40234M9.80029 16.9023C13.9253 16.9023 17.3003 13.5273 17.3003 9.40234C17.3003 5.27734 13.9253 1.90234 9.80029 1.90234C5.67529 1.90234 2.30029 5.27734 2.30029 9.40234C2.30029 13.5273 5.67529 16.9023 9.80029 16.9023Z"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
