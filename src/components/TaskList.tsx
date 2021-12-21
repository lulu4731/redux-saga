import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { CardContent, Card, CardActions, Typography, Box } from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { deleteTask, taskFetch, taskSelector } from '../reducers/Tasks'
import { useDispatch, useSelector } from 'react-redux'
import { setModal, setModalTitle } from '../reducers/Modal'
import { getDataUpdate } from '../reducers/TaskEditing'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cartAction: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        car: {
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #ffbc00, #ff0058)',
            borderRadius: 16
        },
        fab: {
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
        }
    })
)
interface statusState {
    value: number
    label: string
}

interface task {
    id: string,
    title: string,
    description: string,
    status: number
}

const TaskList = (status: statusState) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(taskFetch())
    }, [dispatch])

    const tasks = useSelector(taskSelector)

    const taskFilter = tasks.filter(task => task.status === status.value)

    const onUpdate = (task: task) => {
        dispatch(setModalTitle('UPDATE TASK'))
        dispatch(setModal(true))
        dispatch(getDataUpdate(task))
    }
    const onDelete = (id: string) => {
        dispatch(deleteTask(id))
    }

    return (
        <>
            <Grid item md={4} xs={12} key={status.value}>
                <Box mt={1} mb={1}>{status.label}</Box>
                <div>
                    {
                        taskFilter.map(task => (
                            <Box boxShadow={15} borderRadius={16} key={task.id}>
                                <Card key={task.id} className={classes.car}>
                                    <CardContent >
                                        <Grid container justify='space-between'>
                                            <Grid item md={8}>
                                                <Typography component='h2'>{task.title}</Typography>
                                            </Grid>
                                            <Grid item md={4}>
                                                {status.label}
                                            </Grid>
                                        </Grid>
                                        <p>{task.description}</p>
                                    </CardContent>
                                    <CardActions className={classes.cartAction}>
                                        <Fab color='primary' aria-label='Add' size='small' className={classes.fab} onClick={() => onUpdate(task)}>
                                            <Icon fontSize='small' color='action'>
                                                edit_icon
                                            </Icon>
                                        </Fab>
                                        <Fab color='primary' aria-label='Add' size='small' className={classes.fab} onClick={()=> onDelete(task.id)}>
                                            <Icon fontSize='small' color='action'>
                                                delete_icon
                                            </Icon>
                                        </Fab>
                                    </CardActions>
                                </Card>
                            </Box>
                        ))
                    }
                </div>
            </Grid>
        </ >
    )
}

export default TaskList
