export {
    getList,
    editTask,
    addTask,
    deleteTask
}

const baseURL = 'https://test.megapolis-it.ru';

const getList = (func) => {
    fetch(`${baseURL}/api/list`, { method: 'GET'})
      .then(response => response.json())
      .then(func)
      .catch(e => console.log(e));
}

const editTask = (data, func) => {
    
}

const addTask = (data, func) => {
    const url =  `${baseURL}/api/list`; 
    const body = {title: data.title, date: data.date};

    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body)
        })
        .then(response => response.json()).then(result => {
          func(result.id);
        })
        .catch(e => console.log(e));
}

const deleteTask = (id, func) => {
    const url =  `${baseURL}/api/list/${id}`; 

    fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        })
        .then(response => response.json()).then(result => {
            if(result.success) func();
        })
        .catch(e => console.log(e));
}