import { useState, useEffect } from "react";
import Layout from '../components/Layout';
import '../styles/homePage.css';
import '../styles/screenResolution.css';


const ScreenResolution = () => {
  const getInitialResolution = () => ({
    width: typeof window !== "undefined" ? window.screen.width : 0,
    height: typeof window !== "undefined" ? window.screen.height : 0,
  });

  const getInitialViewport = () => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [resolution, setResolution] = useState(getInitialResolution);
  const [viewport, setViewport] = useState(getInitialViewport);

  useEffect(() => {
    const handleResize = () => {
      setViewport(getInitialViewport());
      setResolution(getInitialResolution());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout
      title="Screen Resolution"
      description="Check the size of your screen."
    >
      <div className="container py-4 justify-content-center text-center resolution-container">
        <h2 className="mb-3">Monitor Resolution</h2>
        <div className="form-control p-3 mb-4 border rounded">
          <p className="mb-1 resolution-content">
            <strong>Screen Resolution (Monitor):</strong> {resolution.width} x {resolution.height}
          </p>
          <p className="mb-1 resolution-content">
            <strong>Viewport (Browser Window):</strong> {viewport.width} x {viewport.height}
          </p>
        </div>
        <small className="text-muted">
          The screen resolution refers to your monitor's size, while the viewport is the visible browser area.
        </small>
      </div>
    </Layout>
  );
};

export default ScreenResolution;
