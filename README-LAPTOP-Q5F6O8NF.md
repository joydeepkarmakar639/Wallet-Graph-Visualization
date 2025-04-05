# Wallet Graph Visualization

An interactive graph visualization tool that allows users to explore connections between wallet addresses. Each node represents a wallet address and has inflow and outflow connections, with automatic linking when new nodes are added.

![Wallet Graph Visualization]

## Features

- **Interactive Graph Visualization**: Explore relationships between wallet addresses through an intuitive node-based interface
- **Automatic Node Linking**: Wallet addresses are automatically connected if they share relationships with existing nodes
- **Inflow/Outflow Visualization**: Clear visual distinction between inflow (left side) and outflow (right side) connections
- **Customizable Node Display**: Nodes display shortened addresses and entity information
- **Infinite Navigation**: Smooth panning and zooming for exploring complex graphs
- **Dark/Light Mode**: Toggle between dark and light themes for different viewing preferences
- **SVG Export**: Export the full graph as an SVG file for use in documentation or presentations
- **Connection Details**: View detailed information about selected nodes in the sidebar
- **Add Wallet Functionality**: Easily add new wallet addresses to the visualization

## Technologies Used

- **React**: Frontend framework
- **React Flow**: Library for interactive node-based UIs
- **Redux Toolkit**: State management
- **HTML-to-Image/Save-SVG-as-PNG**: Export functionality
- **CSS3**: Styling and theme management

### Adding New Wallet Addresses

1. Enter a wallet address in the sidebar input field
2. Click "Add" to add it to the visualization
3. If the wallet has connections to existing nodes, they will be automatically linked

### Viewing Wallet Details

1. Click on any node in the graph
2. The sidebar will display detailed information about the selected wallet

### Exporting the Graph

1. Arrange the graph as desired
2. Click "Export as SVG" button in the top right corner
3. The SVG file will be downloaded to your device

### Changing Theme

1. Click the theme toggle button in the top right corner to switch between dark and light mode

## Data Structure

The application works with wallet connection data in the following format:

```json
{
  "message": "success",
  "data": [
    {
      "beneficiary_address": "bc1q...",
      "amount": 0.01000191,
      "date": "2022-07-17 14:10:09",
      "entity_name": "Unknown",
      "token_type": "BTC",
      "transaction_type": "Normal Tx"
    }
  ]
}
```

## Project Structure

```
wallet-graph-visualization/
├── public/
├── src/
│   ├── components/
│   │   ├── WalletNode.js
│   │   └── Sidebar.js
│   ├── redux/
│   │   ├── graphSlice.js
│   │   └── store.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Acknowledgements

- [React Flow](https://reactflow.dev/) for providing the graph visualization library
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Save-SVG-as-PNG](https://github.com/exupero/saveSvgAsPng) for SVG export functionality
