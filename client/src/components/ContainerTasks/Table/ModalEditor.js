import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
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
   msg: {
      color: 'red',
      paddingBottom: 10,
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

export default function ModalEditor(props) {
   const classes = useStyles();

   const [title, setTitle] = useState('');
   const [date, setDate] = useState(null);
   const [validatorMsg, setMsg] = useState('');

   useEffect(() => {
      setTitle(props.openModalData.title);
      setDate(props.openModalData.date);
      setMsg('');
   }, [props.openModalData.shown]);


   //============================================================//
   //================= This component's handlers ================//
   //============================================================//
   const onTaskChange = e => setTitle(e.target.value);
   const onDateChange = date => setDate(date);
   const onPushOk = () => validation() && callBackController();

   const validation = () => {
      let msg = ''
      if(title == '') msg = 'Заполните "задачу"'
      if(date == null) {
         msg += (msg == '') ? 'Заполните: ' : ' и '
         msg += '"дедлайн"'
      }
      if(msg != '') {
         setMsg(msg);
         return false
      }
      if(date.toString() == 'Invalid Date') {
         return false
      }
      setMsg('');
      return true
   }

   //============================================================//
   //====================== Callbacks ===========================//
   //============================================================//
   const callBackController = () => {
      if(props.openModalData.type == 'Добавить') {
         props.pushAddOk({title, date});
         props.closeModal();
      }

      else if(props.openModalData.type == 'Редактировать') {
         const index = props.openModalData.index;
         props.pushEditOk({index, title, date});
         props.closeModal();
      }

      else console.log('type not found');
   }
   //============================================================//

   return (
      <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         className={classes.modal}
         open={props.openModalData.shown}
         onClose={props.closeModal}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{ timeout: 0 }}>
         <Fade in={props.openModalData.shown}>
            <Card className={classes.paper}>

               <Typography variant="h6" className={classes.h6}>{props.openModalData.type}</Typography>

               {validatorMsg != '' 
               ? <Typography variant="body2" className={classes.msg}>{validatorMsg}</Typography>
               : null}


               <div className={classes.inputBlock}>
                  <TextField 
                     id="outlined-basic"
                     label="Задача"
                     variant="outlined"
                     value={title}
                     onChange={onTaskChange}
                  />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <KeyboardDateTimePicker
                        className={classes.marginLeft}
                        label="Дедлайн"
                        inputVariant="outlined"
                        value={date}
                        format="yyyy-MM-dd HH:mm"
                        onChange={onDateChange}
                     />
                  </MuiPickersUtilsProvider>
               </div>

               <div className={classes.buttonBlock}>
                  <Button
                     variant="contained"
                     color="primary"
                     onClick={props.closeModal}>
                        Отмена
                  </Button>

                  <Button
                     className={classes.marginLeft}
                     variant="contained"
                     color="primary"
                     onClick={onPushOk}>
                        Ок
                  </Button>
               </div>

            </Card>
         </Fade>
      </Modal>
   )
}