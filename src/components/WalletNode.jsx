import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

function WalletNode({ data }) {
  const {
    label,
    address,
    entityName,
    amount,
    tokenType,
    direction,
    isMainNode,
    date,
    time,
  } = data;

  const [hovered, setHovered] = useState(false);

  const getNodeColor = () => {
    if (isMainNode) return '#7b68ee';
    if (direction === 'inflow') return '#1a73e8';
    if (direction === 'outflow') return '#d14f69';
    return '#37b24d';
  };

  return (
    <div
      className={`wallet-node ${isMainNode ? 'main-node' : ''}`}
      style={{ borderColor: getNodeColor() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Incoming connection handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#1a73e8',
          visibility:
            isMainNode || direction === 'outflow' ? 'visible' : 'hidden',
        }}
        isConnectable={false}
      />

      {/* Main content */}
      <div className="wallet-node-content">
        <div>{entityName === 'Unknown' ? label : entityName}</div>

        {/* Hover details */}
        {hovered && (
          <div className="wallet-details" style={{ marginTop: '4px' }}>
            {entityName && <div className="entity-name">{entityName}</div>}
            {amount && (
              <div className="amount">
                {amount} {tokenType}
              </div>
            )}
            {date && time && (
              <div className="transaction-datetime">
                <span className="date">{date}</span> •{' '}
                <span className="time">{time}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Outgoing connection handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#d14f69',
          visibility:
            isMainNode || direction === 'inflow' ? 'visible' : 'hidden',
          width: direction === 'outflow' ? '12px' : '6px',
          height: direction === 'outflow' ? '12px' : '6px',
          borderRadius: '50%',
        }}
        isConnectable={false}
      />
    </div>
  );
}

export default memo(WalletNode);
