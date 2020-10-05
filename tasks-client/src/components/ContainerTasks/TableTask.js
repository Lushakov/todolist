import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



const useStyles = makeStyles({
   container: {
      width: 900,
      margin: 'auto'
   },
   table: {
      maxWidth: 900,
   },
   cellMax200: {
      maxWidth: 200
   },
   button: {
      marginLeft: 15,
      minWidth: 10,
   },
});

export default function TableTask(props) {
   const classes = useStyles();

   return (
      <TableContainer className={classes.container} component={Paper}>
         <Table className={classes.table} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Задача</TableCell>
                  <TableCell>Дедлайн</TableCell>
                  <TableCell align="right">
                     <Button
                        variant="contained"
                        color="primary"
                        onClick={props.addTask}
                     >
                        Добавить
                     </Button>
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {props.tasksData.map((row, index) => (
                  <TableRow key={row.id}>
                     <TableCell component="th" scope="row">
                        {row.id}
                     </TableCell>
                     <TableCell className={classes.cellMax200}>{row.title}</TableCell>
                     <TableCell>00/00/00</TableCell>

                     <TableCell align="right">
                        <Button
                           index={index}
                           variant="outlined"
                           color="primary"
                           size="small"
                           className={classes.button}
                           onClick={props.editTask}
                        >
                           <EditIcon />
                        </Button>
                        <Button
                           index={index}
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
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}