import { toast } from "react-toastify"

export const toastError = (message: string) => {
    if (message !== null && typeof message !== 'undefined' && message !== '') {
        toast.error(message)
    }
}

export const ToastSuccess = (message: string) => {
    if (message !== null && typeof message !== 'undefined' && message !== '') {
        toast.success(message, {
            autoClose: 500
        })
    }
}