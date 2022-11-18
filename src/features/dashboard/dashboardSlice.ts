import { ListParams } from 'models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';
import { RootState } from './../../app/store';

export interface DashBoardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMartCount: number;
}

export interface RankingByCity {
  listHCM: Student[];
  listHN: Student[];
  listDN: Student[];
}

export interface DashBoardState {
  loading: boolean;
  statistics: DashBoardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity;
}

const initialState: DashBoardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMartCount: 0,
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: {
    listHCM: [],
    listHN: [],
    listDN: [],
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<DashBoardStatistics>) {
      state.statistics = action.payload;
    },
    fetchDataFailed(state, action: PayloadAction<string>) {
      state.loading = false;
    },

    setStatistics(state, action: PayloadAction<DashBoardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity>) {
      state.rankingByCityList = action.payload;
    },
    setIsLoading(state) {
      state.loading = false;
    }
  },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Selectors
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

// Reduces
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
