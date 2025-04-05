import React, { useState } from 'react';

function Sidebar({ selectedNode, onAddWallet, isDarkMode }) {
  const [newWalletAddress, setNewWalletAddress] = useState('');
  const [showInflow, setShowInflow] = useState(false);
  const [showOutflow, setShowOutflow] = useState(false);

  const handleAddWallet = () => {
    if (newWalletAddress.trim()) {
      onAddWallet(newWalletAddress.trim());
      setNewWalletAddress('');
    }
  };

  const renderConnectionDetails = () => {
    if (!selectedNode) return null;

    return (
      <div className="connection-details">
        <h3>Wallet Details</h3>
        <div className="detail-item">
          <span className="detail-label">Address:</span>
          <span className="detail-value">{selectedNode.data.address}</span>
        </div>

        {selectedNode.data.entityName && (
          <div className="detail-item">
            <span className="detail-label">Entity:</span>
            <span className="detail-value">{selectedNode.data.entityName}</span>
          </div>
        )}

        {selectedNode.data.amount && (
          <div className="detail-item">
            <span className="detail-label">Amount:</span>
            <span className="detail-value">
              {selectedNode.data.amount} {selectedNode.data.tokenType}
            </span>
          </div>
        )}

        {selectedNode.data.direction && (
          <div className="detail-item">
            <span className="detail-label">Direction:</span>
            <span className="detail-value">{selectedNode.data.direction}</span>
          </div>
        )}
      </div>
    );
  };

  const renderInflowDetails = () => {
    if (!selectedNode || selectedNode.data.direction !== 'inflow') return null;

    return (
      <div className="connection-details">
        <h3>Inflow Transaction</h3>
        <div className="detail-item">
          <span className="detail-label">Amount:</span>
          <span className="detail-value">
            {selectedNode.data.amount} {selectedNode.data.tokenType}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date:</span>
          <span className="detail-value">{selectedNode.data.date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Time:</span>
          <span className="detail-value">{selectedNode.data.time}</span>
        </div>
      </div>
    );
  };

  const renderOutflowDetails = () => {
    if (!selectedNode || selectedNode.data.direction !== 'outflow') return null;

    return (
      <div className="connection-details">
        <h3>Outflow Transaction</h3>
        <div className="detail-item">
          <span className="detail-label">Amount:</span>
          <span className="detail-value">
            {selectedNode.data.amount} {selectedNode.data.tokenType}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Date:</span>
          <span className="detail-value">{selectedNode.data.date}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Time:</span>
          <span className="detail-value">{selectedNode.data.time}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={`sidebar ${isDarkMode ? 'dark' : ''}`}>
      <div className="sidebar-section">
        <h2>Add Wallet</h2>
        <div className="add-wallet-form">
          <input
            type="text"
            placeholder="Enter wallet address"
            value={newWalletAddress}
            onChange={(e) => setNewWalletAddress(e.target.value)}
            className="wallet-input"
          />
          <button className="add-wallet-btn" onClick={handleAddWallet}>
            Add
          </button>
        </div>
      </div>

      {selectedNode && (
        <div className="sidebar-section">
          {renderConnectionDetails()}

          <div className="toggle-section">
            <button onClick={() => setShowInflow(!showInflow)}>
              {showInflow ? 'Hide Inflow' : 'Show Inflow'}
            </button>
            <button onClick={() => setShowOutflow(!showOutflow)}>
              {showOutflow ? 'Hide Outflow' : 'Show Outflow'}
            </button>
          </div>

          {showInflow && renderInflowDetails()}
          {showOutflow && renderOutflowDetails()}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
