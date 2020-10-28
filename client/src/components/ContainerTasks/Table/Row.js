import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
       marginLeft: 15,
       minWidth: 10,
    },
 });

export default function Row(props) {
    const classes = useStyles();

    return (
        <TableRow key={props.row.id}>
            <TableCell component="th" scope="row">
                {props.row.id}
            </TableCell>
            <TableCell className={classes.cellMax200}>{props.row.title}</TableCell>
            <TableCell>{format(props.row.date, 'yyyy.MM.dd (HH:mm)')}</TableCell>

            <TableCell align="right">
            <Button
                index={props.index}
                variant="outlined"
                color="primary"
                size="small"
                className={classes.button}
                onClick={props.editTask}
            >
                <EditIcon />
            </Button>
            <Button
                index={props.index}
                variant="outlined"
                color="secondary"
                size="small"
                className={classes.button}
                onClick={props.deleteTask}
            >
                <DeleteIcon />
            </Button>
            </TableCell>

        </TableRow>
    )
}