const tasks = require('../services/tasks.js');

// These are all protected routes -- user jwt required
// logged in user will show up on res.locals.user

module.exports = {

    getAll: (req, res, next) => {
        const user = res.locals.user;
        const orderBy = req.query.sort;
        const direction = req.query.direction;

        tasks.getTasks(user.id, orderBy, direction).then(tasks => {
            res.json({ status: "OK", tasks });
        }, err => {
            next(err);
        });     
    },

    get: (req, res, next) => {
        const { id } = req.params;

        res.json({ status: "OK" });   
    },

    create: (req, res, next) => {
        const user = res.locals.user;
        const { title, description, due_date, priority, status } = req.body;

        tasks.createTask({ user_id: user.id, title, description, due_date, priority, status }).then(newTask => {
            res.json({ status: "OK", task: newTask });            
        }, err => {
            next(err);
        });
    },

    update: (req, res, next) => {
        const { id } = req.params;
        const user = res.locals.user;
        const { title, description, due_date, priority, status } = req.body;

        tasks.updateTask(id, user.id, { title, description, due_date, priority, status }).then(updatedTask => {
            res.json({ status: "OK", task: updatedTask });
        }, err => {
            next(err);
        });
    }
    
}