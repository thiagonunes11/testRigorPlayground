import React from "react";
import DeeplinkStep from "./DeeplinkStep";

function PageThree() {
  return (
    <DeeplinkStep
      currentPage={3}
      nextPath="/deeplinkNavigation/pageFour"
      nextLabel="Go to Page 4"
    />
  );
}

export default PageThree;
