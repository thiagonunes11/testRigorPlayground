import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";

const edgeKey = (a, b) => (a < b ? `${a}-${b}` : `${b}-${a}`);

const hasEdge = (lines, a, b) => {
  const key = edgeKey(a, b);
  return lines.some(([x, y]) => edgeKey(x, y) === key);
};

/** True when lines form a single cycle covering every vertex (any order). */
const isClosedLoop = (lines, n) => {
  if (n === 0) return false;

  const uniqueKeys = new Set();
  const adjacency = Array.from({ length: n }, () => []);

  for (const [a, b] of lines) {
    const key = edgeKey(a, b);
    if (uniqueKeys.has(key)) continue;
    uniqueKeys.add(key);
    adjacency[a].push(b);
    adjacency[b].push(a);
  }

  if (uniqueKeys.size !== n) return false;

  let start = -1;
  for (let i = 0; i < n; i++) {
    if (adjacency[i].length > 0) {
      start = i;
      break;
    }
  }
  if (start === -1) return false;

  const visited = new Set();
  const stack = [start];
  while (stack.length) {
    const v = stack.pop();
    if (visited.has(v)) continue;
    visited.add(v);
    for (const neighbor of adjacency[v]) {
      if (!visited.has(neighbor)) stack.push(neighbor);
    }
  }

  return visited.size === n;
};

const ConnectTheDots = () => {
  const canvasRef = useRef(null);
  const [dots, setDots] = useState([]);
  const [lines, setLines] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastDot, setLastDot] = useState(null);
  const [tempLineEnd, setTempLineEnd] = useState(null);
  const [showMoreDots, setShowMoreDots] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Redraw the canvas when any relevant state changes.
  useEffect(() => {
    drawCanvas();
  }, [dots, lines, lastDot, isDrawing, tempLineEnd]);

  // Update completion when lines or dots change.
  useEffect(() => {
    setIsComplete(isClosedLoop(lines, dots.length));
  }, [lines, dots]);

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
    if (
      hoveredDot !== null &&
      hoveredDot !== lastDot &&
      !hasEdge(lines, lastDot, hoveredDot)
    ) {
      setLines((prevLines) => [...prevLines, [lastDot, hoveredDot]]);
      setCurrentPath((prevPath) => [...prevPath, hoveredDot]);
      setLastDot(hoveredDot);
      setTempLineEnd(null);
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
    setIsComplete(false);
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
    setIsComplete(false);
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
          id="canvas"
          width="400"
          height="400"
          title="Canvas"
          aria-label="Canvas"
          data-testid="canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ border: "1px solid black" }}
        ></canvas>

        {isComplete && (
          <p className="mt-3 mb-0" aria-label="All dots connected!">
            All dots connected!
          </p>
        )}

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
