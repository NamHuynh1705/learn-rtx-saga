import {Student, ListResponse} from 'models';
import {PayloadAction} from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import {ListParams} from 'models';
import {call, fork, put, take} from 'redux-saga/effects';
import {dashboardActions, RankingByCity} from './dashboardSlice';

function* handleFetchData(payload: ListParams) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, payload);
    if (response?.data) {
      const statistics = {
        maleCount: 0,
        femaleCount: 0,
        highMarkCount: 0,
        lowMartCount: 0,
      };
      const rankingByCityList: RankingByCity = {
        listHCM: [],
        listHN: [],
        listDN: [],
      };

      response?.data?.forEach((item, index) => {
        if (item.gender === 'male') ++statistics.maleCount;
        if (item.gender === 'female') ++statistics.femaleCount;
        if (item.mark > 8) ++statistics.highMarkCount;
        if (item.mark < 5) ++statistics.lowMartCount;
        if (item.city === 'hcm' && rankingByCityList.listHCM.length < 5)
          rankingByCityList.listHCM.push(item);
        if (item.city === 'hn' && rankingByCityList.listHN.length < 5)
          rankingByCityList.listHN.push(item);
        if (item.city === 'dn' && rankingByCityList.listDN.length < 5)
          rankingByCityList.listDN.push(item);
      });

      // statistics
      yield put(dashboardActions.fetchDataSuccess(statistics));

      // highest student
      const highestStudentList = [...response?.data].splice(0, 5);
      yield put(dashboardActions.setHighestStudentList(highestStudentList));

      // lowest student
      const lowestStudentList = [...response?.data].splice(-5).reverse();
      yield put(dashboardActions.setLowestStudentList(lowestStudentList));

      //city
      yield put(dashboardActions.setRankingByCityList(rankingByCityList));

      // stop loading
      yield put(dashboardActions.setIsLoading());
    }
  } catch (error) {
    yield put(dashboardActions.fetchDataFailed('Có lỗi xảy ra!'));
  }
}

function* dashboardFlow() {
  while (true) {
    const action: PayloadAction<ListParams> = yield take(dashboardActions.fetchData.type);
    yield call(handleFetchData, action.payload);
  }
}

export function* dashboardSaga() {
  yield fork(dashboardFlow);
}
