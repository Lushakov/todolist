import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
   KeyboardDateTimePicker,
   MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paper: {
      display: 'block',
      width: 530,
      height: 'auto',
      padding: 15,
   },
   h6: {
      paddingBottom: 15
   },
   inputBlock: {
      float: 'right',
      marginBottom: 30
   },
   buttonBlock: {
      float: 'right',
   },
   marginLeft: {
      marginLeft: 15
   },
}));

export default function EditorModal(props) {
   const classes = useStyles();

   const [title, setTitle] = useState();
   const [date, setDate] = useState(null);


   const pushOk = () => {
      if(props.openData.title == 'Добавить') {
         props.pushAddOk({title, date});
         props.closeModal();
      }
      else if(props.openData.title == 'Редактировать') {
         const index = props.openData.index;
         props.pushEditOk({index, title, date});
         props.closeModal();
      }
      else {
         console.log('not found title');
      }
   }

   const chengeTextTask = (e) => setTitle(e.target.value);
   const chengeTextDate = (e) => setDate(e);


   return (
      <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         className={classes.modal}
         open={props.openData.flag}
         onClose={props.closeModal}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{ timeout: 500 }}>
         <Fade in={props.openData.flag}>
            <Card className={classes.paper}>
               <Typography variant="h6" className={classes.h6}>
                  {props.openData.title}
               </Typography>
               <div className={classes.inputBlock}>
                  <TextField 
                     id="outlined-basic"
                     label="Задача"
                     variant="outlined"
                     value={title}
                     onChange={chengeTextTask} />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <KeyboardDateTimePicker
                        className={classes.marginLeft}
                        label="Дедлайн"
                        inputVariant="outlined"
                        value={date}
                        onChange={chengeTextDate}
                        format="yyyy/MM/dd HH:mm" />
                  </MuiPickersUtilsProvider>
               </div>
               <div className={classes.buttonBlock}>
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={props.closeModal}>Отмена</Button>
                  <Button
                     className={classes.marginLeft}
                     variant="contained"
                     color="primary"
                     onClick={pushOk}>Ок</Button>
               </div>
            </Card>
         </Fade>
      </Modal>
   )
}