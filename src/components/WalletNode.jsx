import React, { memo, useState, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { MoreVertical } from 'lucide-react';

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
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const getNodeColor = () => {
    if (isMainNode) return '#7b68ee';
    if (direction === 'inflow') return '#1a73e8';
    if (direction === 'outflow') return '#d14f69';
    return '#37b24d';
  };

  const exportToCSV = () => {
    const csvContent = `Entity,Address,Amount,Token,Date,Time\n"${entityName}","${address}",${amount},${tokenType},${date},${time}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${entityName}_wallet.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = async () => {
    const jsPDF = (await import('jspdf')).default;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Entity: ${entityName}`, 10, 10);
    doc.text(`Address: ${address}`, 10, 20);
    doc.text(`Amount: ${amount} ${tokenType}`, 10, 30);
    doc.text(`Date: ${date}`, 10, 40);
    doc.text(`Time: ${time}`, 10, 50);

    doc.save(`${entityName}_wallet.pdf`);
  };

  return (
    <div
      className={`wallet-node ${isMainNode ? 'main-node' : ''}`}
      style={{ borderColor: getNodeColor(), position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowMenu(false);
      }}
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

      <div className="wallet-node-content" style={{ position: 'relative' }}>
        <div>{entityName === 'Unknown' ? label : entityName}</div>

        {/* Options button if known entity */}
        {entityName !== 'Unknown' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical size={16} />
          </div>
        )}

        {/* Options dropdown */}
        {showMenu && (
          <div
            ref={menuRef}
            className="options-menu"
            style={{
              position: 'absolute',
              top: 20,
              right: 0,
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              zIndex: 10,
              padding: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            <div
              style={{ padding: '4px 8px', cursor: 'pointer' }}
              onClick={() => {
                exportToPDF();
                setShowMenu(false);
              }}
            >
              Export to PDF
            </div>
            <div
              style={{ padding: '4px 8px', cursor: 'pointer' }}
              onClick={() => {
                exportToCSV();
                setShowMenu(false);
              }}
            >
              Export to CSV
            </div>
          </div>
        )}

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
