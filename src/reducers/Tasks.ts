import { createSlice, createAsyncThunk, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { RootState } from '.././store'
import axios from 'axios'
import { call, put, take, delay, select } from "redux-saga/effects";
import { STATUS_CODE } from '.././constants'
import { showLoading, hideLoading } from '.././reducers/GloBalLoading'
import { toastError, ToastSuccess } from "../Toast/toastHelper";


interface task {
    id: string,
    title: string,
    description: string,
    status: number
}
interface taskState {
    tasks: task[]
}
export const taskFetch = createAsyncThunk('tasks/fetch', async () => {
    const response = await axios.get('http://localhost:3000/tasks')
    return response.data
})
export const postTask = createAsyncThunk('tasks/post', async (task: task) => {
    const newTask = {
        id: nanoid(),
        title: task.title,
        description: task.description,
        status: 0
    }
    await axios.post('http://localhost:3000/tasks', newTask)
    return newTask
})
export const putTask = createAsyncThunk('tasks/put', async (task: task) => {
    await axios.put(`http://localhost:3000/tasks/${task.id}`, task)
    return task
})
export const deleteTask = createAsyncThunk('tasks/delete', async (id: string) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`)
    return id
})


export const getList = () => {
    return axios.get('http://localhost:3000/tasks')
}
export const search = () => {

}
export const addTaskData = (data: task) => {
    return axios.post('http://localhost:3000/tasks', data)
}
export const updateTaskData = (data: task) => {
    return axios.put(`http://localhost:3000/tasks/${data.id}`, data)
}
export function* watchFetchListAction() {
    yield take('tasks/fetch')
    yield put(showLoading())
    //Block
    const response: Promise<any> = yield call(getList)
    //Block
    const { status }: any = response
    if (status === STATUS_CODE.SUCCESS) {
        // yield put(getAll(data)) 
        // console.log(data)
    } else {
        console.log('dispatch action fetchListTaskFail')
    }
    yield delay(1000)
    yield put(hideLoading())
}


export function* filterTaskSaga({ payload }: any) {
    yield delay(500)
    const keyword = payload
    const list: task[] = yield select((state) => state.taskReducers.tasks)
    const filterTask = list.filter(task => task.title.toLowerCase().includes(keyword.trim().toLowerCase()))
    if (filterTask.length !== 0 && keyword !== '') {
        yield put(filterTaskSuccess(filterTask))
    } else {
        yield put(filterTaskSuccess(list))

    }
}

export function* addTaskSaga({ payload }: any) {
    yield put(showLoading())
    const task = {
        id: nanoid(),
        title: payload.title,
        description: payload.description,
        status: 0
    }
    const response: Promise<task> = yield call(addTaskData, task)
    const { data, status }: any = response
    if (status === 201) {
        yield put(addTaskSuccess(data))
    } else {
        yield put(addTaskFail(data))
    }
    yield delay(1000)
    yield put(hideLoading())
}

export function* updateTaskSaga({ payload }: any) {
    yield put(showLoading())
    // const taskEditing: task = yield select((state) => state.taskEditingReducer.taskEditing)
    const response: Promise<task> = yield call(updateTaskData, payload)
    const { data, status }: any = response
    if (status === STATUS_CODE.SUCCESS) {
        yield put(updateTaskSuccess(data))
    } else {
        yield put(updateTaskFail(data))
    }
    yield delay(1000)
    yield put(hideLoading())
}
const Tasks = createSlice({
    name: 'tasks',
    initialState: {
        tasks: []
    } as taskState,
    reducers: {
        getAll: (state, action) => {
            state.tasks.unshift(action.payload)
        },
        filterTask(state, action) {
            // const keyword = action.payload
            // state.tasks = state.tasks.filter(task => task.title === keyword)
        },
        filterTaskSuccess(state, action) {
            state.tasks = action.payload
        },
        addTask(state, action) {
            return { ...state }
        },
        // addTaskSuccess: {
        //     reducer(state, action: PayloadAction<task>) {
        //         state.tasks.unshift(action.payload)
        //         ToastSuccess('Them thanh cong')
        //     },
        //     prepare(title: string, description: string) {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 description,
        //                 status: 0
        //             }
        //         }
        //     }
        // },
        addTaskSuccess(state, action) {
            state.tasks.unshift(action.payload)
            ToastSuccess('Them thanh cong')
        },
        addTaskFail(state, action) {
            const error = action.payload
            toastError(error)
            return { ...state }
        },
        updateTask(state, action) {
            return { ...state }
        },
        updateTaskSuccess(state, action) {
            state.tasks.map((task) => task.id === action.payload.id ? task = action.payload : task)
            ToastSuccess('Update Successfully')
            console.log(state.tasks)
        },
        updateTaskFail(state, action) {
            const error = action.payload
            toastError(error)
            return { ...state }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(taskFetch.fulfilled, (state, action) => {
                console.log(action.payload)
                state.tasks = action.payload
            })
            .addCase(postTask.fulfilled, (state, action) => {
                state.tasks.unshift(action.payload)
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload)
                ToastSuccess('Xoa thanh cong')
            })
            .addCase(putTask.fulfilled, (state, action: PayloadAction<task>) => {
                state.tasks = state.tasks.map((task) => task.id === action.payload.id ? task = action.payload : task)
            })
    }
})

const taskReducers = Tasks.reducer

export const taskSelector = (state: RootState) => state.taskReducers.tasks

export const { getAll, filterTask, filterTaskSuccess, addTaskSuccess, addTask, addTaskFail,
    updateTask, updateTaskSuccess, updateTaskFail } = Tasks.actions

export default taskReducers