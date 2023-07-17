import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
    responsiveScreenHeight,
    responsiveScreenFontSize
  } from "react-native-responsive-dimensions";

  const basicDimensions = {
    width: 360,
    height: 800,
  };
  
 export const widthPercentage = (width)=> {
    const percentage = (width / basicDimensions.width) * 100;
  
    return responsiveScreenWidth(percentage);
  };
  export const heightPercentage = (height)=> {
    const percentage = (height / basicDimensions.height) * 100;
  
    return responsiveScreenHeight(percentage);
  };
  export const fontPercentage = (size)=> {
   
   const percentage = size * 0.135;
    return responsiveScreenFontSize(percentage);
  };
  