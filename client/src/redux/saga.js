// @ts-nocheck
import {
  put,
  spawn,
  takeEvery,
  takeLatest,
  debounce,
  retry,
} from "redux-saga/effects";
import API from "../api";
import {
  itemsRequest,
  itemsFailure,
  itemsSuccess,
  itemsSuccessAdd,
  setCurrentCategory,
  changeSearchField,
} from "./itemsSlice";

// watcher
function* watchItems() {
  yield takeLatest(itemsRequest, workerGetItemsSaga);
}
function* watchCategories() {
  yield takeEvery(setCurrentCategory, workerGetItemsSaga);
}

function* watchChangeSearch() {
  yield debounce(1000, changeSearchField, handleChangeSearch);
}

function* handleChangeSearch(action) {
  yield put(itemsRequest(action.payload));
}

// worker
function* workerGetItemsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1 * 1000;
    const payload = yield retry(
      retryCount,
      retryDelay,
      API.getItems,
      action.payload
    );
    //  const payload = yield API.getItems(action.payload);
    if (action?.payload?.from) {
      yield put(itemsSuccessAdd(payload));
    } else {
      yield put(itemsSuccess(payload));
    }
  } catch (e) {
    yield put(itemsFailure(e.message));
  }
}
export default function* saga() {
  yield spawn(watchItems);
  yield spawn(watchCategories);
  yield spawn(watchChangeSearch);
}
