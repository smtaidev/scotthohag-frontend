import MyImage from "@/components/shared/myImage/MyImage";
import React from "react";
import sideImage from "@/assets/auth/sideImage.jpg"
const AuthSide = () => {
  return (
    <div>
      <MyImage
        height={865}
        imageSrc={sideImage.src}
        width={628}
      />
    </div>
  );
};

export default AuthSide;
