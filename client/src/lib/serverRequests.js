export {
   getList,
   editTask,
   addTask,
   deleteTask
}

const baseURL = 'https://devreed.ru/todolist';
const urlApiList = `${baseURL}/api/tasks`
const contentTypeAppJSON = { 'Content-Type': 'application/json;charset=utf-8' };


const getList = (callback) => {
   fetch(urlApiList, 
      {
         method: 'GET'
      })
      .then(res => res.json())
      .then(e => callback(e))
      .catch(e => console.log(e));
}

const editTask = ({id, title, date}, callback) => {
   const body = JSON.stringify({id, title, date});

   fetch(urlApiList, 
      {
         method: 'PUT',
         headers: contentTypeAppJSON, 
         body 
      })
      .then(res => res.json())
      .then(e => callback(e))
      .catch(e => console.log(e));
}

const addTask = ({title, date}, callback) => {
   const body = JSON.stringify({title, date});

   fetch(urlApiList, 
      { 
         method: 'POST',
         headers: contentTypeAppJSON, 
         body 
      })
      .then(res => res.json())
      .then(e => callback(e))
      .catch(e => console.log(e))
}

const deleteTask = (id, callback) => {
   const url = urlApiList;
   const body = JSON.stringify({id});

   fetch(url,
      {
         method: 'DELETE',
         headers: contentTypeAppJSON,
         body
      })
      .then(res => res.json())
      .then(e => callback(e))
      .catch(e => console.log(e));
}