import {call, put} from "redux-saga/effects";
import {expectSaga} from "redux-saga-test-plan";


const api = {
    getUsers: () => "",
};

function* fetchUsersSaga() {
    const users = yield call(api.getUsers);
    yield put({type: "FETCH_USERS_SUCCESS", payload: users })
}

test("fetch users", () => {
   const users = ["taka", "takuya"];

   return expectSaga(fetchUsersSaga)
       .provide([[call(api.getUsers), users]])
       .put({type: "FETCH_USERS_SUCCESS", payload: users })
       .run();
});
