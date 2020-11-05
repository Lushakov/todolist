# ToDoList

This is typical "To Do List" on React with MATERIAL-UI library. 
A project feature is task filters.
[Demo](https://devreed.ru/todolist/)
# Filters
You can find code here: [client/src/lib/filterts.js](https://github.com/Lushakov/todolist/blob/master/client/src/lib/filters.js)
The library provides 2 methods: **apply(); onCRUD();**  

##### apply()
Method take:
  - array of task list
  - name of filter
  - filter data

and return a filtered array of task list.
It must be used after any changes to input value of filter parameters
##### onCRUD()
Method take:
 - array of task list 

and return a filtered one. 
It must be used after any changes to the task list (after any CRUD operations). This method applies all filters to the updated task list using previously filter data or default filter data.

##### Add new filter
If you want to add new filter you should write new method for **filters** object which take:
- row (element of array)
- filter data

It must return boolean value.
For example:
```
filters.dateFrom = (row, date) => date ? row.date > date : true
```