import React from "react";
import DeeplinkStep from "./DeeplinkStep";

function PageFour() {
  return (
    <DeeplinkStep
      currentPage={4}
      nextPath="/deeplinkNavigation/pageFive"
      nextLabel="Go to Page 5"
    />
  );
}

export default PageFour;
