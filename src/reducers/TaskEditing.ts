import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface task {
    id: string,
    title: string,
    description: string,
    status: number
}
interface state {
    taskEditing: task
}
const TaskEditing = createSlice({
    name: 'taskEditing',
    initialState: {
        taskEditing: {}
    } as state,
    reducers: {
        getDataUpdate(state, action) {
            state.taskEditing = action.payload
        },
    }
})

const taskEditingReducer = TaskEditing.reducer

export const taskEditingSelector = (state: RootState) => state.taskEditingReducer.taskEditing
export const { getDataUpdate } = TaskEditing.actions
export default taskEditingReducer