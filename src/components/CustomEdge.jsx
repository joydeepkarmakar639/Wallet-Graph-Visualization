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
  markerEnd,
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

  // Basic padding settings
  const horizontalPadding = 8;
  const verticalPadding = 6;
  const labelWidth = 120;
  const labelHeight = date && time ? 40 : 20;

  const edgeStyle = {
    ...style,
    strokeWidth: isOutflow ? 3 : 1.5,
    stroke: isOutflow ? '#d14f69' : '#1a73e8',
  };

  return (
    <>
      <path
        id={id}
        style={edgeStyle}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />

      {balance && (
        <g
          transform={`translate(${labelX}, ${labelY}) rotate(${angle})`}
          pointerEvents="none"
        >
          {/* Label background */}
          <rect
            x={-labelWidth / 2}
            y={-labelHeight / 2}
            width={labelWidth}
            height={labelHeight}
            rx={6}
            ry={6}
            fill={isOutflow ? '#d14f69' : '#1a73e8'}
            fillOpacity="0.85"
          />

          {/* Balance line */}
          <text
            x={0}
            y={-2}
            textAnchor="middle"
            fontSize={11}
            fontWeight="bold"
            fill="white"
          >
            {balance}
          </text>

          {/* Date + time line */}
          {date && time && (
            <text
              x={0}
              y={12}
              textAnchor="middle"
              fontSize={9}
              fill="white"
              opacity={0.9}
            >
              {date} • {time}
            </text>
          )}
        </g>
      )}
    </>
  );
}

export default CustomEdge;
