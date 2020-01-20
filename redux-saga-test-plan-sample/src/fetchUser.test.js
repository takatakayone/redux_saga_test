import { call, put, take } from 'redux-saga/effects';
import {expectSaga} from "redux-saga-test-plan";

// パラメータ有りのGETリクエストによるAPIをcallするSagaタスクのテスト
function* usersSaga(api) {
    const action = yield take('REQUEST_USER');
    const user = yield call(api.fetchUser, action.payload);

    yield put({ type: 'RECEIVE_USER', payload: user});
}

test("fetch user", () => {
   const api = {
     fetchUser: id => ({id, name: "Taka"})
   };

   expectSaga(usersSaga, api)
       // 期待する結果
       .put({
           type: "RECEIVE_USER",
           payload: {id: 42, name: "Taka"},
       })
       // userSagaタスクがtakeするactionをdispatch
       .dispatch({type: "REQUEST_USER", payload: 42})
       .run();
});




