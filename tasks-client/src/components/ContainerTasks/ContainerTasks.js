import React, { useState, useEffect } from 'react';
import * as request from '../../lib/serverRequests.js'  //all server requests are here
import Filter from './Filter.js';
import TableTask from './TableTask.js';
import EditorModal from './EditorModal.js';


export default function ContainerTasks() {
   const [tasksData, setTasksData] = useState([]);  
   const [openData, setOpenData] = useState({});    //for managing <EditorModal />

   useEffect(() => {
      console.log('start useEffect');
      request.getList(result => {
         console.log(result);
         result.data ? setTasksData(result.data) : setTasksData([]);
      });
   }, []);


   //for handling events from <TableTask /> and <EditorModal />
   
   const addTask = (e) => { //callback from <TableTask />
      console.log('add');
      setOpenData({
         flag: true,  // open modal window
         title: 'Добавить',
         text: '',
         date: ''
      });
   }
   const pushAddOk = ({title, date}) => {  //callback from <EditorModal />
      console.log('push add ok');
      request.addTask({title, date}, id => {
         if(id){
            const newData = [{id, title, date}];
            setTasksData([...tasksData, ...newData]);
         }
      })
   }


   const editTask = (e) => {  //callback from <TableTask />
      const index = e.currentTarget.getAttribute("index"); 
      console.log('edit', index);
      setOpenData({
         flag: true, 
         title: 'Редактировать', 
         index: index,
         text: tasksData[index].title,
         date: '00/00/00'
      });
   }
   const pushEditOk  = () => { //callback from <EditorModal />
      console.log('push ok edit')
   }


   const deleteTask = (e) => {  //callback from <TableTask />
      const index = e.currentTarget.getAttribute("index");
      const id = tasksData[index].id
      console.log('delete', index, id);

      request.deleteTask(id, () => {
         let arr = tasksData.slice()
         arr.splice(index, 1);
         setTasksData(arr);
      });
   }


   const closeModal = () => setOpenData({flag: false});

  //for handling events from <Filter />
   

   return (
      <div className="container-tasks">
         <Filter />
         <TableTask
            tasksData={tasksData}
            deleteTask={deleteTask}
            editTask={editTask}
            addTask={addTask}
         />
         <EditorModal
            openData={openData}
            closeModal={closeModal}
            pushAddOk={pushAddOk}
            pushEditOk={pushEditOk}
         />
      </div>
   );
}