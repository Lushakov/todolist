const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  id: {
    type: Number,
    index: { unique: true }
  },

  title: {
    type: String
  },

  date: {
    type: Date,
  }
})

TaskSchema.statics.newTask = function({title, date}, callback) {
  this.findOne({}).sort({$natural:-1}).exec((err, doc)=>{
    const id = doc ? doc.id + 1 : 1;
    this.create({id, title, date}, (err) => {
      callback(err, id);
    });
  })
}




module.exports = mongoose.model('Task', TaskSchema);