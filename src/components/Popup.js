import React, {useState} from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Controls from '../components/controls/Controls';
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme =>({
    dialogWrapper:{
        padding: theme.spacing(2),
        Position: 'absolute',
        top: theme.spacing(5)
    },
    DialogTitle:{
        paddingRight:'0px'
    }
}))
 export default function Popup(props){
    const {tittle, children, openPopup, setOpenPopup } = props;
    const classes = useStyles()
 
         return(
            <Dialog open={openPopup} maxWidth="md" classes={{paper:classes.dialogWrapper}}>
                <DialogTitle className={classes.DialogTitle}>
                    <div style={{display: 'flex'}}>
                        <Typography 
                        variant="h6" 
                        component="div"
                        style={{flexGrow:1}}
                        >                            
                        {tittle}
                        </Typography>
                        <Controls.ActionButton 
                        color="secondary"
                        onClick={() =>{setOpenPopup(false)}}
                        >
                            <CloseIcon />

                        </Controls.ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {children}
                </DialogContent>
            </Dialog>
         )
     
 }