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

    get: async (req, res, next) => {
        const { id } = req.params;
        const user = res.locals.user;
        const task = await tasks.getTaskById(id, user.id);

        res.json({ status: "OK", task });   
    },

    create: (req, res, next) => {
        const user = res.locals.user;
        const { title, description, due_date, status } = req.body;

        tasks.createTask({ user_id: user.id, title, description, due_date, status }).then(newTask => {
            res.json({ status: "OK", task: newTask });            
        }, err => {
            next(err);
        });
    },

    update: (req, res, next) => {
        const { id } = req.params;
        const user = res.locals.user;
        const { title, description, due_date, status } = req.body;

        tasks.updateTask(id, user.id, { title, description, due_date, status }).then(updatedTask => {
            res.json({ status: "OK", task: updatedTask });
        }, err => {
            next(err);
        });
    },

    delete: (req, res, next) => {
        const { id } = req.params;
        const user = res.locals.user;

        tasks.deleteTask(id, user.id)
            .then(results => {
                res.json({ status: "OK" });
            }).catch(err => {
                next(err);
            });
    }
    
}