import React, { ChangeEventHandler} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { TextField } from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        textField: {
            width: '30%'
        }
    })
)
interface filter{
    handleChange: ChangeEventHandler<HTMLInputElement>
}

const SearchBox = ({ handleChange }: filter) => {
    const classes = useStyles()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-basic"
                label="Enter keywords"
                className={classes.textField}
                autoComplete='off'
                onChange={handleChange}
            />
        </form>
    )
}

export default SearchBox
