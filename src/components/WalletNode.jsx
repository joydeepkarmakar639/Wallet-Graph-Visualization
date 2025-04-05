import React, { memo } from 'react';
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
  } = data;

  // Determine node type color
  const getNodeColor = () => {
    if (isMainNode) return '#7b68ee'; // Main search address
    if (direction === 'inflow') return '#1a73e8'; // Inflow nodes
    if (direction === 'outflow') return '#d14f69'; // Outflow nodes
    return '#37b24d'; // Default for newly added nodes
  };

  return (
    <div
      className={`wallet-node ${isMainNode ? 'main-node' : ''}`}
      style={{ borderColor: getNodeColor() }}
    >
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

      <div className="wallet-node-content">
        <div className="wallet-address">{label}</div>
        <div className="wallet-details">
          {entityName && <div className="entity-name">{entityName}</div>}
          {amount && (
            <div className="amount">
              {amount} {tokenType}
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#d14f69',
          visibility:
            isMainNode || direction === 'inflow' ? 'visible' : 'hidden',
        }}
        isConnectable={false}
      />
    </div>
  );
}

export default memo(WalletNode);
