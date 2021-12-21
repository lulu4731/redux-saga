import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".././store";

interface loadingState {
    isLoading: boolean
}
const GlobalLoading = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    } as loadingState,
    reducers: {
        showLoading(state) {
            state.isLoading = true
        },
        hideLoading(state) {
            state.isLoading = false
        }
    }
})

const isLoadingReducer = GlobalLoading.reducer

export const isLoadingSelector = (state: RootState) => state.isLoadingReducer.isLoading

export const { showLoading, hideLoading } = GlobalLoading.actions
export default isLoadingReducer