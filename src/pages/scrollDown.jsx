import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Demo from "../components/Demo.jsx";

const ScrollDown = () => {
  return (
    <Demo>


        <div className="row justify-content-center text-center mb-5">
          <div className="col-6 border p-2">
            <h1 className="fs-2 fw-bold mt-3 mb-4">Scroll Down</h1>
            <p><small>Scroll down in order to find the desired fruit name.</small></p>
          </div>
        </div>

        {/* Fruit List with Scroll */}
        <div className="row m-4">
          <div className="col p-3">
            <p>The first fruit is pineapple.</p>
            <div style={{ height: "100vh" }}></div>
            <p>The second fruit is guarana.</p>
            <div style={{ height: "100vh" }}></div>
            <p>The third fruit is cashew.</p>
            <div style={{ height: "100vh" }}></div>
            <p>The fourth fruit is passion fruit.</p>
            <div style={{ height: "100vh" }}></div>
            <p>The fifth fruit is pitanga.</p>
            <div style={{ height: "100vh" }}></div>
            <p>And the sixth and final fruit is jabuticaba.</p>
          </div>
        </div>
    </Demo>
  );
};

export default ScrollDown;
