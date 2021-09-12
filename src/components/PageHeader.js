import React, {useState, useEffect}from 'react';
import {Paper,Card, Typography, makeStyles} from "@material-ui/core"

const useStyle = makeStyles (theme =>({
    root:{
        backgroundColor:'#fdfdff'
    },
    PageHeader:{
        padding: theme.spacing(4),
        display:'flex',
        marginBottom:theme.spacing(3)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(2),
        color:'#3c44b1'
    },
    pageTittle:{
        paddingLeft:theme.spacing(4),
        color:'#',
        '& .MuiTypography-root':{
            opacity: '0.6'
        }
    }
}))


export default function PageHeader(props){
    const classes = useStyle()
    const {tittle, subtittle, icon} = props;
    return(
        <Paper  elevation={0}  square className={classes.root}>
            <div className ={classes.PageHeader}>
                <Card className ={classes.pageIcon}>
                    {icon}
                </Card>
                <div className ={classes.pageTittle} > 
                    <Typography 
                    variant="h6"
                    component="div"
                    > {tittle} 
                    </Typography>
                    <Typography
                    variant="subtittle2"
                    component="div"
                    > {subtittle} 
                    </Typography>
                </div>

            </div>
        </Paper>
    )
}