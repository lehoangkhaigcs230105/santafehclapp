import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const UserIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      {...props}
    >
      <Path
        d="M8 10.416c2.447 0 7.334 1.285 7.334 3.834v1.916H.667V14.25c0-2.549 4.885-3.834 7.333-3.834zm0 1.917c-2.466 0-5.29 1.227-5.5 1.917h11c-.184-.68-3.025-1.917-5.5-1.917zm0-11.5c2.025 0 3.666 1.716 3.667 3.833C11.667 6.784 10.025 8.5 8 8.5c-2.026 0-3.666-1.716-3.666-3.834C4.334 2.55 5.974.834 8 .833zM8 2.75c-1.008 0-1.833.862-1.833 1.916 0 1.054.824 1.917 1.833 1.917 1.008 0 1.834-.862 1.834-1.917C9.834 3.612 9.008 2.75 8 2.75z"
        fill="#000"
        fillOpacity={0.44}
      />
    </Svg>
  );
};

export default UserIcon;
