import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
  wallets: [],
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    updateGraph: (state, action) => {
      state.nodes = action.payload.nodes;
      state.edges = action.payload.edges;
    },
    addWallet: (state, action) => {
      state.wallets = [...state.wallets, action.payload];
    },
  },
});

export const { updateGraph, addWallet } = graphSlice.actions;

export default graphSlice.reducer;
