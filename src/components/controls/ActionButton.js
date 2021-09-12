import {Button, makeStyles } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close'

const useStyles=makeStyles(theme =>({
    root:{
        minWidth:0,
        margin: theme.spacing(0.5)
    },
    secondary:{
        backgroundColor: theme.palette.secondary.light,
        '& .MuiButton-label':{
            color: theme.palette.primary.main
        }
    },
    primary:{
        backgroundColor: theme.palette.primary.light,
        '& .MuiButton-label':{
            color: theme.palette.primary.main
        }
    },
}))

export default function ActionButton(props){
    
    const {children, color, onClick} = props
    const classes = useStyles()

    return(
        <Button
        color={color}
        className={`${classes.root}`}
        onClick={onClick}
        >
        {children}
        </Button>
            
    )
}