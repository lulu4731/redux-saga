import React, { ChangeEvent, ChangeEventHandler } from 'react'
import { Button, createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { STATUSES } from '../constants'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import { taskFetch, filterTask } from '.././reducers/Tasks'
import { useDispatch } from 'react-redux'
import SearchBox from './SearchBox'
import { setModal, setModalTitle } from '../reducers/Modal'
import { getDataUpdate } from '../reducers/TaskEditing'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginTop: '20px',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
        },
        board: {
            marginLeft: '20px'
        }
    })
)
const TaskBoard = () => {
    const classes = useStyles()

    // const [openForm, setOpenForm] = useState<boolean>(false)
    

    let xhtml = null
    xhtml = (
        <Grid container spacing={2}>
            {STATUSES.map(status => {
                return (
                    <TaskList key={status.value} {...status} />
                )
            }
            )}
        </Grid >
    )

    const handleClose = () => {
        dispatch(setModalTitle('ADD NEW TASK'))
        dispatch(setModal(true))
        dispatch(getDataUpdate({}))
    }
    let form = null;
    form = (
        <TaskForm />
    )

    const dispatch = useDispatch()
    const handleLoadData = () => {
        dispatch(taskFetch())
    }
    const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterTask(event.target.value))
    }
    return (
        <div className={classes.board}>
            <Button variant='contained' color='primary' className={classes.button} onClick={handleClose}>
                <AddIcon />  ADD NEW JOB
            </Button>
            &nbsp;&nbsp;
            <Button variant='contained' color='primary' className={classes.button} onClick={handleLoadData}>
                LOAD DATA
            </Button>
            <SearchBox handleChange={handleFilter as ChangeEventHandler<HTMLInputElement>} />
            {xhtml}
            {form}
        </div >
    )
}

export default TaskBoard
