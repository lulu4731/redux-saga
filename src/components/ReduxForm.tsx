import React from 'react'
import { reduxForm, InjectedFormProps, Field } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, Select } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core'
import validate from '.././validate'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        text: {
            width: 200,
            height: '100%'
        },
        content: {
            padding: theme.spacing(2)
        }
    })
)

interface FormValueType {
    id: string
    title: string
    description: string
    status: number
}
interface Close {
    handleClose: React.Dispatch<React.SetStateAction<boolean>>
}
const renderTextField: React.FC = (
    field: any
) => (
    <TextField
        {...field.input}
        style={field.style}
        label={field.label}
        placeholder={field.label}
        error={field.meta.touched && field.meta.invalid}
        helperText={field.meta.touched && field.meta.error}
        // value={field.value} //khong can them vao khong chay duoc
        {...field.custom}

    />
)
const renderFromHelper = (field: any) => {
    if (!(field.meta.touched && field.meta.error)) {
        return
    } else {
        return <FormHelperText>{field.meta.touched && field.meta.error}</FormHelperText>
    }
}

const renderSelectField: React.FC = (
    field: any
) => (
    <FormControl error={field.meta.touched && field.meta.error}>
        <InputLabel htmlFor="age-native-simple">Status</InputLabel>
        <Select
            native
            {...field.input}
            {...field.custom}
            // inputProps={{
            //     name: 'Status',
            //     id: 'age-native-simple'
            // }}
        >
            {field.children}
        </Select>
        {renderFromHelper(field)}
    </FormControl>
)
const ReduxForm: React.FC<InjectedFormProps<FormValueType, Close> & Close> = ({ handleSubmit, error, handleClose, invalid, submitting, initialValues }) => {
    const classes = useStyles()

    // const require = (value: string) => {
    //     let error: string = 'Vui long nhap tieu de'
    //     if (value !== null && typeof value !== 'undefined' && value.trim() !== '') {
    //         error = ''
    //     }
    //     return error
    // }
    // const minLength = (value: string) => {
    //     let error = null
    //     if (value.trim().length < 5) {
    //         error = 'Tieu de it nhat 5 ki tu'
    //     }
    //     return error
    // }
    // const taskEditing = useSelector(taskEditingSelector)

    let renderStatusSelection = null
    renderStatusSelection = (
        initialValues && initialValues.id ? <Field
            id="status"
            label="Status"
            name="status"
            value={initialValues.title}
            style={{ width: '100%' }}
            component={renderSelectField}
        >
            <option value={0}>READY</option>
            <option value={1}>IN PROGRESS</option>
            <option value={2}>COMPLETED</option>
        </Field >
            : <></>
    )

    return (
        <div className={classes.content}>
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item md={12}>
                        <Field
                            id="title"
                            label="Title"
                            name="title"
                            value={initialValues.title}
                            // className={classes.text}
                            style={{ width: '100%' }}
                            component={renderTextField}

                        // validate={[require, minLength]}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Field
                            id="description"
                            label="Description"
                            name='description'
                            // className={classes.text}
                            style={{ width: '100%' }}
                            component={renderTextField}
                            value={initialValues.description}
                        />
                    </Grid>
                    {renderStatusSelection}
                    <Grid item md={12}>
                        <Box flexDirection='row-reverse' display='flex' mt={2}>
                            <Button disabled={invalid || submitting} variant='contained' color='primary' type='submit'>SAVE</Button>
                            &nbsp;&nbsp;
                            <Button variant='contained' color='primary' onClick={handleClose.bind(this, false)}>Cancel</Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

const FORM_NAME = 'TASK_MANAGEMENT'
const WithReduxForm = reduxForm<FormValueType, Close>({
    form: FORM_NAME,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    touchOnChange: true,
    enableReinitialize: true, //update hien du lieu man hinh
    validate
})(ReduxForm)
export default WithReduxForm
