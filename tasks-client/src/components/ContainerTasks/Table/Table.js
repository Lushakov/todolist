import React, { useState, useEffect } from 'react';
import ModalEditor from './ModalEditor.js';
import Row from './Row.js';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
//======== lib ========
import * as request from '../../../lib/serverRequests.js'
import * as filters from '../../../lib/filters.js'

const useStyles = makeStyles({
    container: {
        width: 900,
        margin: 'auto',
        marginBottom: 20
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
    cellWeight: {
        fontWeight: 600,
        fontSize: 14
    },
    headRow: {
        zIndex: 1100
    }
});


export default function TasksTable(props) {
    const classes = useStyles();

    //structure: {shown, type, title, date, index}          
    const [openModalData, setOpenModalData] = useState({shown: false}); 
    

    //============================================================//
    //================= This component's handlers ================//
    //============================================================//

    const addTask = () => {
        setOpenModalData({
            shown: true,
            type: 'Добавить',
            title: '',
            date: null
        });
    }

    const editTask = (e) => {
        const index = e.currentTarget.getAttribute("index"); // index of "tasksData" Array 

        setOpenModalData({
            shown: true,
            type: 'Редактировать',
            title: props.tasksData[index].title,
            date: props.tasksData[index].date,
            index
        });
    }

    const deleteTask = (e) => { 
        const index = e.currentTarget.getAttribute("index"); // index of "tasksData" Array 
        const id = props.tasksData[index].id  // id - numder of task for DB

        request.deleteTask(id, (e) => {
            if (e.success) {
                const arr = props.tasksData.slice()
                arr.splice(index, 1);
                
                props.setTasksData(filters.onCRUD(arr));
                filters.debag('deleteTask (CRUD operation)');
            }
            else alert("Ошибка сервера. Повторите позже.");
        });
    }
    
    //============================================================//
    //================ <EditorModal />  handlers =================//
    //============================================================//

    const closeModal = () => setOpenModalData({ shown: false });

    const pushAddOk = ({ title, date }) => {
        request.addTask({ title, date }, (e) => {
            if (e.success) {
                const shown = true;
                const id = e.id;
                const arr = [...props.tasksData, ...[{ shown, id, title, date }]]

                props.setTasksData(filters.onCRUD(arr));
                filters.debag('pushAddOk (CRUD operation)');
            }
            else alert("Ошибка сервера. Повторите позже.");
        })
    }

    const pushEditOk = ({ index, title, date }) => { 
        const shown = true;
        const id = props.tasksData[index].id;  // id - numder of task for DB

        request.editTask({ id, title, date }, (e) => {
            if (e.success) {
                let arr = props.tasksData.slice()
                arr[index] = {shown, id, title, date}
                
                props.setTasksData(filters.onCRUD(arr));
                filters.debag('pushEditOk (CRUD operation)');
            }
            else alert("Ошибка сервера. Повторите позже.");
        })
    }

    //============================================================//

    return (
        <>
            <ModalEditor
                openModalData={openModalData}
                closeModal={closeModal}
                pushAddOk={pushAddOk}
                pushEditOk={pushEditOk}
            />
            <TableContainer className={classes.container} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.headRow}>
                            <TableCell className={classes.cellWeight}>ID</TableCell>
                            <TableCell className={classes.cellWeight}>Задача</TableCell>
                            <TableCell className={classes.cellWeight}>Дедлайн</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={addTask}
                                >
                                    Добавить
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tasksData.map((row, index) => (
                            row.shown
                            ? <Row row={row} key={index} index={index} editTask={editTask} deleteTask={deleteTask} />
                            : null
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}