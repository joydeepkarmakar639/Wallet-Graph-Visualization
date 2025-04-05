import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import WalletNode from './components/WalletNode';
import CustomEdge from './components/CustomEdge';
import Sidebar from './components/Sidebar';
import { toPng } from 'html-to-image';
import { saveSvgAsPng } from 'save-svg-as-png';
import { useSelector, useDispatch } from 'react-redux';
import { addWallet, updateGraph } from './redux/graphSlice';
import './App.css';

const nodeTypes = {
  wallet: WalletNode,
};

// Register the custom edge component
const edgeTypes = {
  custom: CustomEdge,
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const graphData = useSelector((state) => state.graph);
  const dispatch = useDispatch();

  // Layout calculations
  const getNodePosition = (index, direction, existingNodes) => {
    const spacing = 250;
    const verticalSpacing = 120;
    const centerY = 300;

    // For inflow nodes (left side)
    if (direction === 'inflow') {
      return {
        x: 150,
        y:
          centerY -
          (existingNodes.length * verticalSpacing) / 2 +
          index * verticalSpacing,
      };
    }

    // For outflow nodes (right side)
    if (direction === 'outflow') {
      return {
        x: 650,
        y:
          centerY -
          (existingNodes.length * verticalSpacing) / 2 +
          index * verticalSpacing,
      };
    }

    // For center node
    return { x: 400, y: centerY };
  };

  // Format date and time from timestamp string
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return { date: '', time: '' };

    const dateObj = new Date(dateTimeStr);
    const date = dateObj.toISOString().split('T')[0];
    const time = dateObj.toTimeString().split(' ')[0];

    return { date, time };
  };

  // Initialize graph with search address
  useEffect(() => {
    const searchAddress = 'bc1q6nxdnz58kexp48sm2t3scwqcw9stt7r8s7uuwn';

    const initialNodes = [
      {
        id: searchAddress,
        type: 'wallet',
        data: {
          label: shortenAddress(searchAddress),
          address: searchAddress,
          entityName: 'Search Address',
          tokenType: 'BTC',
          amount: '',
          isMainNode: true,
          date: formatDateTime(new Date().toISOString()).date,
          time: formatDateTime(new Date().toISOString()).time,
        },
        position: { x: 400, y: 300 },
      },
    ];

    setNodes(initialNodes);

    // Simulate API call to get inflow and outflow data
    fetchWalletConnections(searchAddress);
  }, []);

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  // Simulate API call (in real app, this would fetch from your backend)
  const fetchWalletConnections = (address) => {
    // Sample data from your assignment
    const inflowData = {
      message: 'success',
      data: [
        {
          beneficiary_address: 'bc1qq7ldp3mza8q7q9e9gmzg72rzafyegckg57wluu',
          amount: 0.01000191,
          date: '2022-07-17 14:10:09',
          entity_name: 'Unknown',
          token_type: 'BTC',
          transaction_type: 'Normal Tx',
        },
        {
          beneficiary_address: 'bc1qng0keqn7cq6p8qdt4rjnzdxrygnzq7nd0pju8q',
          amount: 2.4163156,
          date: '2022-07-17 14:10:09',
          entity_name: 'Changenow',
          token_type: 'BTC',
          transaction_type: 'Normal Tx',
        },
      ],
    };

    const outflowData = {
      message: 'success',
      data: [
        {
          payer_address: 'bc1qf786lw92dy09cx3tt9qhn4tf69dw9ak7m3ktkk',
          amount: 1.47741817,
          date: '2022-07-13 00:35:37',
          entity_name: 'Whitebit',
          token_type: 'BTC',
          transaction_type: 'Normal Tx',
        },
        {
          payer_address: '3Bn9uxMTY9HpTLaCo9YNBTq96QNhSYRxJk',
          amount: 0.02851,
          date: '2022-07-13 00:35:37',
          entity_name: 'Unknown',
          token_type: 'BTC',
          transaction_type: 'Normal Tx',
        },
        {
          payer_address: '39RxUoh4ETUm37tprzYApgFJioQAUd8im9',
          amount: 0.53667821,
          date: '2022-07-13 00:35:37',
          entity_name: 'Unknown',
          token_type: 'BTC',
          transaction_type: 'Normal Tx',
        },
        {
          payer_address: 'bc1qre7n9nm6fec9ffqgsuk906qmg9mwvvsc99tytz',
          amount: 1.83390415,
          date: '2022-07-13 00:35:37',
          entity_name: 'Unknown',
          token_type: 'BTC',
          transaction_type: 'Normal Tx',
        },
      ],
    };

    // Process inflow data
    const inflowNodes = [];
    const inflowEdges = [];

    inflowData.data.forEach((inflow, index) => {
      // Process date and time
      const { date, time } = formatDateTime(inflow.date);

      // Check if node already exists
      const existingNodeIndex = nodes.findIndex(
        (n) => n.id === inflow.beneficiary_address
      );

      if (existingNodeIndex === -1) {
        // Create new node
        inflowNodes.push({
          id: inflow.beneficiary_address,
          type: 'wallet',
          data: {
            label: shortenAddress(inflow.beneficiary_address),
            address: inflow.beneficiary_address,
            entityName: inflow.entity_name,
            amount: inflow.amount,
            tokenType: inflow.token_type,
            direction: 'inflow',
            date: date, // Add date
            time: time, // Add time
          },
          position: getNodePosition(index, 'inflow', inflowData.data),
        });
      }

      // Create edge with custom type and transaction data
      inflowEdges.push({
        id: `e-${inflow.beneficiary_address}-${address}`,
        source: inflow.beneficiary_address,
        target: address,
        type: 'custom', // Use custom edge type
        animated: true,
        data: {
          balance: `${inflow.amount} ${inflow.token_type}`,
          date: date,
          time: time,
          isOutflow: false,
        },
      });
    });

    // Process outflow data
    const outflowNodes = [];
    const outflowEdges = [];

    outflowData.data.forEach((outflow, index) => {
      // Process date and time
      const { date, time } = formatDateTime(outflow.date);

      // Check if node already exists
      const existingNodeIndex = nodes.findIndex(
        (n) => n.id === outflow.payer_address
      );

      if (existingNodeIndex === -1) {
        // Create new node
        outflowNodes.push({
          id: outflow.payer_address,
          type: 'wallet',
          data: {
            label: shortenAddress(outflow.payer_address),
            address: outflow.payer_address,
            entityName: outflow.entity_name,
            amount: outflow.amount,
            tokenType: outflow.token_type,
            direction: 'outflow',
            date: date, // Add date
            time: time, // Add time
          },
          position: getNodePosition(index, 'outflow', outflowData.data),
        });
      }

      // Create edge with custom type and transaction data
      outflowEdges.push({
        id: `e-${address}-${outflow.payer_address}`,
        source: address,
        target: outflow.payer_address,
        type: 'custom', // Use custom edge type
        animated: true,
        data: {
          balance: `${outflow.amount} ${outflow.token_type}`,
          date: date,
          time: time,
          isOutflow: true,
        },
      });
    });

    // Update nodes and edges
    setNodes((nds) => [...nds, ...inflowNodes, ...outflowNodes]);
    setEdges((eds) => [...eds, ...inflowEdges, ...outflowEdges]);

    // Update Redux store
    dispatch(
      updateGraph({
        nodes: [...nodes, ...inflowNodes, ...outflowNodes],
        edges: [...edges, ...inflowEdges, ...outflowEdges],
      })
    );
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds)),
    [setEdges]
  );

  const onNodeClick = (event, node) => {
    setSelectedNode(node);

    // If this is a new wallet, fetch its connections
    if (!node.data.isMainNode && !node.data.connectionsLoaded) {
      fetchWalletConnections(node.address);

      // Mark that we've loaded connections for this node
      const updatedNodes = nodes.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              connectionsLoaded: true,
            },
          };
        }
        return n;
      });

      setNodes(updatedNodes);
    }
  };

  const handleAddWallet = (walletAddress) => {
    // Check if wallet already exists
    const existingNode = nodes.find((n) => n.id === walletAddress);

    if (existingNode) {
      // If exists, just focus on it
      setSelectedNode(existingNode);
    } else {
      // Get current date and time
      const { date, time } = formatDateTime(new Date().toISOString());

      // Create new node
      const newNode = {
        id: walletAddress,
        type: 'wallet',
        data: {
          label: shortenAddress(walletAddress),
          address: walletAddress,
          entityName: 'Unknown',
          tokenType: 'BTC',
          amount: '',
          isNew: true,
          date: date, // Add date
          time: time, // Add time
        },
        position: { x: 400, y: 500 },
      };

      setNodes((nds) => [...nds, newNode]);
      dispatch(addWallet(walletAddress));

      // Fetch connections for new wallet
      fetchWalletConnections(walletAddress);
    }
  };

  const exportAsPNG = () => {
    const flowElement = document.querySelector('.react-flow');

    if (flowElement) {
      toPng(flowElement, {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
      }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'wallet-graph.png';
        link.href = dataUrl;
        link.click();
      });
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes} // Add edge types
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />

          <Panel position="top-right">
            <label className="switch">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
              />
              <span className="slider round"></span>
            </label>

            <button className="export-button" onClick={exportAsPNG}>
              Export as SVG
            </button>
          </Panel>
        </ReactFlow>
      </div>

      <Sidebar
        selectedNode={selectedNode}
        onAddWallet={handleAddWallet}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;
