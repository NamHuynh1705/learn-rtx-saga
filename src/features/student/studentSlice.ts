import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateStudent, ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentState {
  loading: boolean;
  reloadList: boolean;
  loadingCreate: boolean;
  listStudent: Student[];
  dataCreateStudent: CreateStudent;
  pagination?: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  listStudent: [],
  dataCreateStudent: {
    name: '',
    age: 0,
    mark: 0,
    city: '',
    gender: 'male',
  },
  pagination: undefined,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchData(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchDataSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      state.listStudent = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchDataFalse(state, action: PayloadAction<string>) {
      state.loading = false;
      console.error(action.payload);
    },

    createStudent(state, action: PayloadAction<CreateStudent>) {
      state.loadingCreate = true;
    },
    createStudentSuccess(state, action: PayloadAction<Student>) {
      state.loadingCreate = false;
      const newListStudent = [...state.listStudent];
      newListStudent.unshift(action.payload);
      state.listStudent = newListStudent;
    },
    createStudentFalsed(state, action: PayloadAction<string>) {
      state.loadingCreate = false;
    },

    updateStudent(state, action: PayloadAction<Student>) {
      const newListStudent = [...state.listStudent];
      const index = newListStudent.findIndex((item) => item.id === action.payload.id);
      newListStudent[index] = action.payload;
      state.listStudent = newListStudent;
    },
    removeStudent(state, action: PayloadAction<Student>) {
    },
    removeStudentSuccess(state) {
      state.reloadList = !state.reloadList;
    },
  },
});

// Actions
export const studentActions = studentSlice.actions;

// Selectors
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentCreateLoading = (state: RootState) => state.student.loadingCreate;
export const selectStudentList = (state: RootState) => state.student.listStudent;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

// Reduces
const studentReducer = studentSlice.reducer;
export default studentReducer;
