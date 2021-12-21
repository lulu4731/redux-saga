import React from 'react'
// import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
import { Modal } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
// import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// import { postTask } from '../reducers/Tasks';
import { Close } from '@material-ui/icons';
// import { InjectedFormProps, reduxForm, Field } from 'redux-form';
// import { reduxForm, Field } from 'redux-form';
import WithReduxForm from './ReduxForm';
import { addTask, postTask, putTask, updateTask } from '../reducers/Tasks';
import { setModal } from '../reducers/Modal';
import { selectorModal } from '../reducers/Modal';
import { taskEditingSelector } from '../reducers/TaskEditing';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            // border: '2px solid #000',
            boxShadow: theme.shadows[5],
            // padding: theme.spacing(1, 1, 1),
            outline: 'none'
        },
        textField: {
            width: '100%'
        },
        header: {
            backgroundColor: theme.palette.success.dark,
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        title: {
            fontWeight: 600,
        },
        content: {
            padding: theme.spacing(1)
        }

    })
)
interface FormValueType {
    id: string,
    title: string,
    description: string,
    status: number
}
// interface Message {
//     message: string
// }
const TaskForm = () => {
    const classes = useStyles()

    // const [task, setTask] = useState({
    //     id: '',
    //     title: '',
    //     description: '',
    //     status: 0
    // })

  
    const dispatch = useDispatch()
    const modal = useSelector(selectorModal)
    const taskEditing = useSelector(taskEditingSelector)

    // const onchangeTask = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTask({ ...task, [event.target.name]: event.target.value })
    // }
    // useEffect(() => {
    //     dispatch(taskFetch())
    // }, [dispatch])
    const handleSubmit = (data: FormValueType) => {
        if (data.id) {
            const task = {
                id: data.id,
                title: data.title,
                description: data.description,
                status: +(data.status)
            }
            dispatch(putTask(task))
            // dispatch(updateTask(task))
        } else {
            dispatch(postTask(data))
        }
        dispatch(setModal(false))
    }
    return (
        <Modal open={modal.loadModal} onClose={() => dispatch(setModal(false))} >
            <div className={classes.modal}>
                <div className={classes.header}>
                    <span className={classes.title}>
                        {modal.titleModal}
                    </span>
                    <span onClick={() => dispatch(setModal(false))}>
                        <Close />
                    </span>
                </div>
                <WithReduxForm onSubmit={handleSubmit} handleClose={() => dispatch(setModal(false))} initialValues={taskEditing} />
            </div>
        </Modal>
    )
}
// const FORM_NAME = 'TASK_MANAGEMENT'
// const FormTask: React.FC<InjectedFormProps<FormValueType>> = ({ handleSubmit, error }) => {
//     return (
//         <form onSubmit={handleSubmit}>
//             <Grid item md={12}>
//                 <Field
//                     name='title'
//                     component='input'
//                 />
//                 <Button type='submit'>Load</Button>
//             </Grid>
//         </form>
//     )
// }
// const WithReduxForm = reduxForm<FormValueType>({
//     form: FORM_NAME,
// })(FormTask)

export default TaskForm
