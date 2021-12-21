import { fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { updateTask, watchFetchListAction } from '.././reducers/Tasks'
import { filterTaskSaga } from '.././reducers/Tasks'
import { filterTask } from '.././reducers/Tasks'
import { addTask, addTaskSaga } from '.././reducers/Tasks'
import { updateTaskSaga } from '.././reducers/Tasks'
//     yield take(taskFetch())
//     console.log('watching fetch list task action')
// }
function* watchCreateTaskAction() {
    yield true
    console.log('watching create task action')
}

function* rootSaga() {
    yield fork(watchFetchListAction)
    yield fork(watchCreateTaskAction)
    // yield takeLatest(filterTask, filterTaskSaga)
    yield takeEvery(addTask, addTaskSaga)
    yield takeLatest(updateTask, updateTaskSaga)
}

export default rootSaga