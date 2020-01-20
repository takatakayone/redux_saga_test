import {call, put} from "redux-saga/effects"
import {expectSaga} from "redux-saga-test-plan";


// パラメーター無しのGETリクエストによるAPIをcallするSagaタスクテスト
function* fetchUsersSaga(api) {
    const users = yield call(api.getUsers);
    yield put({type: "FETCH_USERS_SUCCESS", payload: users})
}

test("fetch users", () => {
   const users = ["takuya", "taka"];

   const api = {
     getUsers: () => users
   };

   return expectSaga(fetchUsersSaga, api)
       // 最終的に期待する結果
       .put({type: "FETCH_USERS_SUCCESS", payload: users })
       .run();
});
