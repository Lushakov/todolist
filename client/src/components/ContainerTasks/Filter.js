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
//======== lib ========
import * as filters from '../../lib/filters.js'

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
 

export default function ContainerTasks(props) {
    const classes = useStyles();

    const [searchText, setSearchText] = useState('')
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    
    //============================================================//
    //================= This component's handlers ================//
    //============================================================//

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value)
        props.setTasksData(filters.apply('search', props.tasksData, e.target.value))
        filters.debag('onChangeSearchText');
    }
    const onChangeDateFrom = (e) => {
        setDateFrom(e)
        props.setTasksData(filters.apply('dateFrom', props.tasksData, e))
        filters.debag('onChangeDateFrom');
    }
    const onChangeDateTo = (e) => {
        setDateTo(e)
        props.setTasksData(filters.apply('dateTo', props.tasksData, e))
        filters.debag('onChangeDateTo');
    }

    return (
        <Card className={classes.root}>
            <Typography variant="h6" className={classes.h6}>Фильтр</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <TextField
                        id="input-with-icon-textfield"
                        label="Поиск"
                        variant="outlined"
                        value={searchText}
                        onChange={onChangeSearchText}
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
                        value={dateFrom}
                        defaultValue=" "
                        onChange={onChangeDateFrom}
                        format="yyyy.MM.dd HH:mm"
                    />
                    <KeyboardDateTimePicker
                        label="Дедлайн до"
                        inputVariant="outlined"
                        value={dateTo}
                        onChange={onChangeDateTo}
                        format="yyyy.MM.dd HH:mm"
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        </Card>
    );
}