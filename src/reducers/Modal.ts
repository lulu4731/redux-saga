import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".././store"
interface ModalState {
    loadModal: boolean,
    titleModal: string
}

const Modal = createSlice({
    name: 'modal',
    initialState: {
        loadModal: false,
        titleModal: 'ADD NEW'
    } as ModalState,
    reducers: {
        setModal(state, action: PayloadAction<boolean>) {
            state.loadModal = action.payload
        },
        setModalTitle(state, action: PayloadAction<string>) {
            state.titleModal = action.payload
        }
    }
})

const modalReducer = Modal.reducer

export const selectorModal = (state: RootState) => state.modalReducer
export const { setModal, setModalTitle } = Modal.actions

export default modalReducer