import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";

const ConnectTheDots = () => {
  const canvasRef = useRef(null);
  const [dots, setDots] = useState([]);
  const [lines, setLines] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastDot, setLastDot] = useState(null);
  const [tempLineEnd, setTempLineEnd] = useState(null);
  const [showMoreDots, setShowMoreDots] = useState(false);

  // Redraw the canvas when any relevant state changes.
  useEffect(() => {
    drawCanvas();
  }, [dots, lines, lastDot, isDrawing, tempLineEnd]);

  // Draw all elements on the canvas.
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw dots.
    ctx.fillStyle = "black";
    dots.forEach((dot, index) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(index + 1, dot.x, dot.y - 15);
    });

    // Draw permanent lines.
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    lines.forEach(([startIdx, endIdx]) => {
      ctx.beginPath();
      ctx.moveTo(dots[startIdx].x, dots[startIdx].y);
      ctx.lineTo(dots[endIdx].x, dots[endIdx].y);
      ctx.stroke();
    });

    // Draw a temporary line (if drawing and a mouse position is set).
    if (isDrawing && tempLineEnd && lastDot !== null) {
      ctx.beginPath();
      ctx.moveTo(dots[lastDot].x, dots[lastDot].y);
      ctx.lineTo(tempLineEnd.x, tempLineEnd.y);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  // Check if a dot is under the cursor.
  const getDotUnderCursor = (x, y) => {
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const distance = Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2);
      if (distance < 10) return i;
    }
    return null;
  };

  // Start drawing when the mouse is pressed.
  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const clickedDot = getDotUnderCursor(offsetX, offsetY);
    if (clickedDot !== null) {
      setIsDrawing(true);
      setCurrentPath([clickedDot]);
      setLastDot(clickedDot);
    }
  };

  // Draw or update the temporary line on mouse move.
  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    setTempLineEnd({ x: offsetX, y: offsetY });

    const hoveredDot = getDotUnderCursor(offsetX, offsetY);
    if (hoveredDot !== null && !currentPath.includes(hoveredDot)) {
      setLines((prevLines) => [...prevLines, [lastDot, hoveredDot]]);
      setCurrentPath((prevPath) => [...prevPath, hoveredDot]);
      setLastDot(hoveredDot);
      // Clear the temporary line once a permanent connection is made.
      setTempLineEnd(null);

      // Check if the last dot connects back to the first dot.
      if (hoveredDot === 0 && currentPath.length === dots.length) {
        setLines((prevLines) => [...prevLines, [lastDot, 0]]);
        setIsDrawing(false);
        setTempLineEnd(null);
        setLastDot(null);
      }
    }
  };

  // End drawing when the mouse is released.
  const handleMouseUp = () => {
    setIsDrawing(false);
    setTempLineEnd(null);
    setLastDot(null);
  };

  // Clear drawing state if mouse leaves the canvas.
  const handleMouseLeave = () => {
    if (isDrawing) {
      setIsDrawing(false);
      setTempLineEnd(null);
      setLastDot(null);
    }
  };

  // Set up the triangle shape.
  const showTriangle = () => {
    setDots([
      { x: 200, y: 100 }, // top
      { x: 300, y: 300 }, // right
      { x: 100, y: 300 }, // left
    ]);
    setLines([]);
    setCurrentPath([]);
    setIsDrawing(false);
    setLastDot(null);
    setTempLineEnd(null);
    setShowMoreDots(false);
  };

  // Set up the hexagon shape.
  const showHexagon = () => {
    setDots([
      { x: 200, y: 80 }, // top
      { x: 320, y: 160 }, // top right
      { x: 320, y: 280 }, // bottom right
      { x: 200, y: 360 }, // bottom
      { x: 80, y: 280 }, // bottom left
      { x: 80, y: 160 }, // top left
    ]);
    setLines([]);
    setCurrentPath([]);
    setIsDrawing(false);
    setLastDot(null);
    setTempLineEnd(null);
    setShowMoreDots(true);
  };

  // Set the default shape (triangle) on component mount.
  useEffect(() => {
    showTriangle();
  }, []);

  return (
    <Layout
      title={"Connect The Dots"}
      description={"Use the mouse to connect all of the dots on the canvas."}
    >
      <div className="text-center">
        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ border: "1px solid black" }}
        ></canvas>

        <div className="mt-3">
          <button
            className="btn btn-primary btn-modern"
            onClick={showHexagon}
            style={{ display: showMoreDots ? "none" : "inline-block" }}
          >
            Connect more dots
          </button>
          <button
            className="btn btn-primary btn-modern"
            onClick={showTriangle}
            style={{ display: showMoreDots ? "inline-block" : "none" }}
          >
            Connect less dots
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ConnectTheDots;
