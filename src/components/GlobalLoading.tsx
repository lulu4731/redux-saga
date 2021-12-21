import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import LoadingIcon from '.././assets/image/123.gif'
import { useSelector } from 'react-redux'
import { isLoadingSelector } from '../reducers/GloBalLoading'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        globalLoading: {
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 99,
            background: 'rgba(0,0,0,0.4)'
        },
        icon: {
            position: 'fixed',
            left: 0,
            right: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
            top: '30%',
            width: 200
        }
    })
)
const GlobalLoading = () => {
    const classes = useStyles()

    const isLoading = useSelector(isLoadingSelector)

    let xhtml = null
    if (isLoading) {
        xhtml = (
            <div className={classes.globalLoading}>
                <img src={LoadingIcon} alt='IconLoading' className={classes.icon} />
            </div>
        )
    }
    return (
        <>
            {xhtml}
        </>
    )
}

export default GlobalLoading
