import {CreateStudent} from './../../models/student';
import {ResponseOrigin} from './../../models/common';
import {studentActions} from './studentSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {ListParams, Student, ListResponse} from 'models';
import {fork, put, call, all, takeEvery, takeLatest} from 'redux-saga/effects';
import studentApi from 'api/studentApi';

function* handleFetchData(action: PayloadAction<ListParams>) {
  try {
    const params: ListParams = action.payload;
    const response: ResponseOrigin<Student> = yield call(studentApi.getAll, params);

    yield put(studentActions.fetchDataSuccess(response.data as ListResponse<Student>));
  } catch (error) {
    yield put(studentActions.fetchDataFalse('Có lỗi xãy ra'));
  }
}

function* handleCreateStudent(action: PayloadAction<CreateStudent>) {
  try {
    const params: CreateStudent = action.payload;
    const response: ResponseOrigin<Student> = yield call(studentApi.add, params);
    yield put(studentActions.createStudentSuccess(response.data as Student));
  } catch (error) {
    yield put(studentActions.createStudentFalsed('Có lỗi xãy ra'));
  }
}

function* handleRemoveStudent(action: PayloadAction<Student>) {
  try {
    const params: Student = action.payload;
    yield call(studentApi.remove, params.id);

    yield put(studentActions.removeStudentSuccess());
  } catch (error) {
    console.error(error);
  }
}

function* studentFlow() {
  yield all([
    takeLatest(studentActions.fetchData.type, handleFetchData),
    takeEvery(studentActions.createStudent.type, handleCreateStudent),
    takeEvery(studentActions.removeStudent.type, handleRemoveStudent),
  ]);

}

export function* studentSaga() {
  yield fork(studentFlow);
}
