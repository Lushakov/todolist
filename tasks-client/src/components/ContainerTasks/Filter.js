import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';

import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { InputAdornment } from "@material-ui/core";

import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
    root: {
        width: 900,
        margin: '20px auto',
        padding: 15,
        boxSizing: 'border-box'
    },
    h6: {
        paddingLeft: 5,
        paddingBottom: 15
    }
});


export default function ContainerTasks() {
    const classes = useStyles();

    const [selectedDate, handleDateChange] = useState(null);

    return (
        //<div className="wrapper-filter">
        <Card className={classes.root}>
            <Typography variant="h6" className={classes.h6}>Фильтр</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <TextField
                        id="input-with-icon-textfield"
                        label="Поиск"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <KeyboardDateTimePicker
                        label="Дедлайн от"
                        inputVariant="outlined"
                        value={selectedDate}
                        defaultValue=" "
                        onChange={handleDateChange}
                        format="yyyy/MM/dd HH:mm"
                    />
                    <KeyboardDateTimePicker
                        label="Дедлайн до"
                        inputVariant="outlined"
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="yyyy/MM/dd HH:mm"
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </Card>
        //</div>
    );
}