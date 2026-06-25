import React from "react";
import DeeplinkStep from "./deeplinkNavigation/DeeplinkStep";

function DeeplinkNavigation() {
  return (
    <DeeplinkStep
      currentPage={1}
      nextPath="/deeplinkNavigation/pageTwo"
      nextLabel="Go to Page 2"
    />
  );
}

export default DeeplinkNavigation;
