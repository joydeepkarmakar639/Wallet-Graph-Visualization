import React from 'react';
import { getBezierPath } from 'reactflow';

function getAngleAtMidpoint(sourceX, sourceY, targetX, targetY) {
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
}) {
  const edgeData = data || {};
  const { balance, date, time, isOutflow } = edgeData;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const angle = getAngleAtMidpoint(sourceX, sourceY, targetX, targetY);

  const edgeColor = isOutflow ? '#d14f69' : '#1a73e8';
  const edgeStyle = {
    ...style,
    strokeWidth: isOutflow ? 3 : 1.5,
    stroke: edgeColor,
  };

  const markerId = isOutflow ? 'arrow-outflow' : 'arrow-inflow';

  // Adjust label size if date/time is present
  const labelWidth = 130;
  const labelHeight = date && time ? 54 : 36;

  return (
    <>
      {/* Define Arrow Markers */}
      <defs>
        <marker
          id="arrow-inflow"
          markerWidth="8"
          markerHeight="8"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#1a73e8" />
        </marker>

        <marker
          id="arrow-outflow"
          markerWidth="8"
          markerHeight="8"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="#d14f69" />
        </marker>
      </defs>

      {/* Edge path with marker */}
      <path
        id={id}
        style={edgeStyle}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={`url(#${markerId})`}
      />

      {/* Label box */}
      {balance && (
        <g
          transform={`translate(${labelX}, ${labelY}) rotate(${angle})`}
          pointerEvents="none"
        >
          <rect
            x={-labelWidth / 2}
            y={-labelHeight / 2}
            width={labelWidth}
            height={labelHeight}
            rx={6}
            ry={6}
            fill={edgeColor}
            fillOpacity="0.85"
          />

          <text
            x={0}
            y={-6}
            textAnchor="middle"
            fontSize={11}
            fontWeight="bold"
            fill="white"
          >
            {balance}
          </text>

          {date && time && (
            <text
              x={0}
              y={8}
              textAnchor="middle"
              fontSize={9}
              fill="white"
              opacity={0.9}
            >
              {date} • {time}
            </text>
          )}

          {/* Direction label */}
          <text
            x={0}
            y={date && time ? 22 : 8}
            textAnchor="middle"
            fontSize={9}
            fill="white"
            fontStyle="italic"
            opacity={0.9}
          >
            {isOutflow ? 'Outflow' : 'Inflow'}
          </text>
        </g>
      )}
    </>
  );
}

export default CustomEdge;
