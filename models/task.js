var mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema({
    task_name: String,
    priority: String,
    deadline: Date,
    created_at: { type: Date, default: Date.now },
    hidden: Boolean
});

TaskSchema.path('task_name').required(true,'Task Name cannot be blank');
TaskSchema.path('deadline').required(true,'Deadline cannot be blank');
mongoose.model('Task', TaskSchema);