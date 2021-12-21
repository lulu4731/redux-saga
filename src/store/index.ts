import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import taskReducers from "../reducers/Tasks";
import createSagaMiddleware from "redux-saga";
import rootSaga from '.././sagas'
import isLoadingReducer from "../reducers/GloBalLoading";
import { reducer as formReducer } from 'redux-form'
import modalReducer from "../reducers/Modal";
import taskEditingReducer from '.././reducers/TaskEditing'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        isLoadingReducer,
        modalReducer,
        taskEditingReducer,
        taskReducers,
        form: formReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: true }).concat(sagaMiddleware)

})

sagaMiddleware.run(rootSaga)
export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;