type IconPathEditProps = {
  color?: string;
  w?: number;
  h?: number;
};

export const IconPathEdit = ({ color, w, h }: IconPathEditProps) => (
  <svg
    width={w || '20'}
    height={h || '20'}
    fontSize="16"
    viewBox="0 0 20 20"
    fill="none"
    color={color || 'primary'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.70215 2.0625H20.4607" stroke="#000028" strokeLinecap="square" />
    <path
      d="M20.0693 11.3257C20.0693 6.20975 15.922 2.0625 10.8061 2.0625C5.69022 2.0625 1.54297 6.20975 1.54297 11.3257"
      stroke="#000028"
      strokeLinecap="round"
    />
    <path
      d="M20.0704 12.8714C21.1363 12.8714 22.0003 12.0074 22.0003 10.9415C22.0003 9.87573 21.1363 9.01172 20.0704 9.01172C19.0046 9.01172 18.1406 9.87573 18.1406 10.9415C18.1406 12.0074 19.0046 12.8714 20.0704 12.8714Z"
      fill="#000028"
    />
    <path
      d="M19.6837 3.99246C20.7495 3.99246 21.6136 3.12845 21.6136 2.06264C21.6136 0.996824 20.7495 0.132812 19.6837 0.132812C18.6179 0.132812 17.7539 0.996824 17.7539 2.06264C17.7539 3.12845 18.6179 3.99246 19.6837 3.99246Z"
      fill="#000028"
    />
    <path
      d="M10.8068 3.99246C11.8726 3.99246 12.7366 3.12845 12.7366 2.06264C12.7366 0.996824 11.8726 0.132812 10.8068 0.132812C9.74096 0.132812 8.87695 0.996824 8.87695 2.06264C8.87695 3.12845 9.74096 3.99246 10.8068 3.99246Z"
      fill="#000028"
    />
    <path
      d="M1.92982 3.99246C2.99563 3.99246 3.85965 3.12845 3.85965 2.06264C3.85965 0.996824 2.99563 0.132812 1.92982 0.132812C0.864011 0.132812 0 0.996824 0 2.06264C0 3.12845 0.864011 3.99246 1.92982 3.99246Z"
      fill="#000028"
    />
    <path
      d="M1.92982 12.8714C2.99563 12.8714 3.85965 12.0074 3.85965 10.9415C3.85965 9.87573 2.99563 9.01172 1.92982 9.01172C0.864011 9.01172 0 9.87573 0 10.9415C0 12.0074 0.864011 12.8714 1.92982 12.8714Z"
      fill="#000028"
    />
  </svg>
);
