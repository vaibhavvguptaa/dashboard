import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { AnalyticsState } from '../../types';

const initialState: AnalyticsState = {
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0,
  registrationTrend: [],
  usersByStatus: [],
  usersByRegion: [],
  loading: false,
  error: null,
  dateRange: {
    start: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
  selectedRegion: null,
};

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async ({ startDate, endDate, region }: { startDate: string; endDate: string; region: string | null }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalUsers: 20,  // Based on 20 users in the mock data
          activeUsers: 15, // Assuming 15 are active
          deletedUsers: 3, // Assuming 3 users have been deleted
          registrationTrend: [
            { date: '2024-01', count: 5 },
            { date: '2024-02', count: 6 },
            { date: '2024-03', count: 7 },
          ],
          usersByStatus: [
            { status: 'active', count: 15 },
            { status: 'inactive', count: 5 },
          ],
          usersByRegion: [
            { region: 'North India', count: 5 },
            { region: 'South India', count: 5 },
            { region: 'East India', count: 5 },
            { region: 'West India', count: 5 },
          ],
        });
      }, 1000);
    });
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action: any) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      });
  },
});

export const { setDateRange, setSelectedRegion } = analyticsSlice.actions;
export default analyticsSlice.reducer;
