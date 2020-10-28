const TaskModel = require('../models/task.js');

module.exports = (app) => {


   app.get('/tasks', async (req, res) => {
         TaskModel.find({}, (err, arr) => {
            err ?
            res.status(500).json({success: false, err}).end()
            : res.status(200).json({success: true, data: arr}).end()
         })

         console.log('GET /api/tasks');
   });


   app.post('/tasks', async (req, res) => {
      const title = req.body.title;
      const date = new Date();

      TaskModel.newTask({title, date}, (err, id) => {
         err ? 
         res.status(500).json({success: false, err}).end()
         : res.status(200).json({success: true, id}).end()
      });

      console.log('POST /api/tasks');
   });


   app.put('/tasks', async (req, res) => {
      const id = req.body.id
      const title = req.body.title;
      const date = new Date();

      TaskModel.updateOne({id}, {title, date}, (err, rawResponse) => {
         const changed = rawResponse.nModified;
         err ? 
         res.status(500).json({success: false, err}).end()
         : res.status(200).json({success: true, changed}).end()
      });

      console.log('PUT /api/tasks id=', id);
   });


   app.delete('/tasks', async (req, res) => {
      const id = req.body.id;

      TaskModel.deleteOne({id}, (err) => {
         err ? 
         res.status(500).json({success: false, err}).end()
         : res.status(200).json({success: true}).end()
      });

      console.log('DELETE /api/tasks id=', id);
   });
};