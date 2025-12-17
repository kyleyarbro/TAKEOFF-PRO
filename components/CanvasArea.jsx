import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Circle, Line } from "react-konva";

export const CanvasArea = ({ tool, devices, activeProject }) => {
  const stageRef = useRef();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [markers, setMarkers] = useState([]);
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    const scaleBy = 1.1;
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale
    };
    setScale(newScale);
    setPosition({
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale
    });
  };

  const handleClick = (e) => {
    const stage = stageRef.current.getStage();
    const point = stage.getPointerPosition();
    const transformed = {
      x: (point.x - position.x) / scale,
      y: (point.y - position.y) / scale
    };
    if (tool === "point") {
      setMarkers([...markers, transformed]);
    } else if (tool === "line") {
      if (e.evt.detail === 2) {
        setLines([...lines, [...currentLine, transformed]]);
        setCurrentLine([]);
      } else {
        setCurrentLine([...currentLine, transformed]);
      }
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={scale}
      scaleY={scale}
      x={position.x}
      y={position.y}
      onWheel={handleWheel}
      onClick={handleClick}
      draggable
      ref={stageRef}
      className="absolute top-0 left-0 z-10"
    >
      <Layer>
        {markers.map((m, i) => (
          <Circle key={i} x={m.x} y={m.y} radius={5} fill="red" />
        ))}
        {lines.map((line, i) => (
          <Line key={i} points={line.flatMap(p => [p.x, p.y])} stroke="blue" strokeWidth={2} />
        ))}
        {currentLine.length > 0 && (
          <Line points={currentLine.flatMap(p => [p.x, p.y])} stroke="blue" strokeWidth={2} dash={[4, 4]} />
        )}
      </Layer>
    </Stage>
  );
};
