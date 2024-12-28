
const SendIcon = ({
  // eslint-disable-next-line react/prop-types
  height = "1em", strokeWidth = "2", fill = "none", focusable = "false",
  ...props
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m3 3l3 9l-3 9l19-9Zm3 9h16"
    />
  </svg>
);

export default SendIcon;

