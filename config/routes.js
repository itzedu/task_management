var mongoose = require('mongoose'),
    Task = mongoose.model('Task');

var error_messages = [];

module.exports = function Routes(app) {
    app.get('/', function(req,res){

        Task.find(function(err,data){
            var all_tasks = data;
            res.render('index', {title: 'Task Management',
                                 tasks: all_tasks,
                                 errors: error_messages});
        });

    });
    app.post('/tasks', function(req,res){
        var task = new Task(req.body);
        task.save(function(err,task){
            if(err){
                console.log(err.errors);
                error_messages = [];
                for(i in err.errors) {
                    error_messages.push(err.errors[i].message);
                }
                res.redirect('/');
            } else {
                error_messages = [];
                Task.find(function(err,data){
                    var all_tasks = data;
                    res.redirect('/');
                });
            }
        });
    });

    app.post('/tasks/:id', function(req,res){
        if(req.body.action == 'delete') {
            Task.remove({_id: req.params.id}, function(err,data){
                res.redirect('/');
            });
        }
    });
};
