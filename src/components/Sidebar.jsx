// src/components/Sidebar.js
import React, { useState } from 'react';

function Sidebar({ selectedNode, onAddWallet, isDarkMode }) {
  const [newWalletAddress, setNewWalletAddress] = useState('');

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
        <div className="sidebar-section">{renderConnectionDetails()}</div>
      )}
    </div>
  );
}

export default Sidebar;
