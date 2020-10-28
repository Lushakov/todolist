import React, { useState, useEffect } from 'react';
import Filter from './Filter.js';
import Table from './Table';
//======== lib ========
import * as request from '../../lib/serverRequests.js'


export default function ContainerTasks() {
   const [tasksData, setTasksData] = useState([]);                   //structure: [{id, title, date},]
   //const [filteredTasksData, setFilteredTasksData] = useState([]);   //structure: [{id, title, date},]

   useEffect(() => {
      request.getList(e => {
         if (e.success) {
            if (e.data) {
               const data = e.data.map(({ id, title, date }) => {
                  return {
                     id,
                     title,
                     date: new Date(date),
                     shown: true
                  }
               })
               setTasksData(data);
            }
         }
         else alert("Ошибка сервера. Повторите позже.");
      });
   }, []);

   //============================================================//
   return (
      <div className="container-tasks">
         <Filter
            tasksData={tasksData}
            setTasksData={setTasksData}
         />
         <Table
            tasksData={tasksData}
            setTasksData={setTasksData}
         />
      </div>
   );
}