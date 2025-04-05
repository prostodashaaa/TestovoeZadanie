import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REQUEST_GROUPS, REQUEST_METRICS } from "../components/utils/api";
import axios, { AxiosError } from "axios";
import { STATUS_PRIORITY } from "../components/utils/StatusConfig";
import { select } from "../constants/Select";

const initialState = {
  data: [],
  filteredData: [],
  metrics: [],
  status: 'idle',
  statusMetrics: 'idle',
  commonStatus: null,
  error: null,
  errorMetrics: null,
  selectedNodeId: null,
  selectedNodeCaption: null,
  selectedNodeGroups: []
};

export const getGroups = createAsyncThunk(
  'group/nodes',
  async () => {
    try {
      const response = await axios.get(REQUEST_GROUPS);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getMetrics = createAsyncThunk(
  'group/metrics',
  async () => {
    try {
      const response = await axios.get(REQUEST_METRICS);
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    filterData(state, action) {
      if (!action.payload) {
        // state.filteredData = state.data;
        state.commonStatus = null;
        state.selectedNodeId = null;
        return;
      }

      const cityFiltered = state.data.filter(g => g.group_caption === action.payload);

      state.filteredData = cityFiltered.length > 0
        ? cityFiltered
        : state.data
          .map(g => ({
            ...g,
            nodes: g.nodes.filter(n => n.node_caption.includes(`-${action.payload}-`))
          }))
          .filter(g => g.nodes.length > 0);
    },
    statusFilteredData(state) {
      if (state.filteredData.length == 0) {
        state.commonStatus = null;
        return;
      }

      state.commonStatus = state.filteredData.flatMap(g => g.nodes)
        .map(n => n.status.description)
        .reduce((worst, status) =>
          STATUS_PRIORITY[status] > STATUS_PRIORITY[worst] ? status : worst, 'UP');
    },
    activeNodeId(state, action) {
      if (action.payload) {
        state.selectedNodeId = action.payload.id;
        state.selectedNodeCaption = action.payload.caption;

        const mainGroup = state.data.find(group =>
          group.nodes.some(node => node.id === action.payload.id)
        )?.group_caption;

        const typeFromCaption = action.payload.caption?.match(/-([^-]+)-/)?.[1] || null;

        let formattedType = null;
        if (typeFromCaption) {
          const found = select.find(item => item.value === typeFromCaption);
          formattedType = found ? found.name : null;
        }

        state.selectedNodeGroups = [mainGroup, formattedType].filter(Boolean);

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      state.selectedNodeId = null;
      state.selectedNodeCaption = null;
      state.selectedNodeGroups = []
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMetrics.pending, (state) => {
        state.statusMetrics = 'loading';
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.filteredData = [];
      })
      .addCase(getMetrics.fulfilled, (state, action) => {
        state.statusMetrics = 'succeeded';
        state.metrics = action.payload;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getMetrics.rejected, (state, action) => {
        state.statusMetrics = 'failed';
        state.errorMetrics = action.payload;
      });
  },
});

export default groupSlice.reducer;
export const groupActions = groupSlice.actions;