import React from "react";
import DeeplinkStep from "./DeeplinkStep";

function PageTwo() {
  return (
    <DeeplinkStep
      currentPage={2}
      nextPath="/deeplinkNavigation/pageThree"
      nextLabel="Go to Page 3"
    />
  );
}

export default PageTwo;
