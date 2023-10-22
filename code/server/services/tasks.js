const sql = require('../database/db.js');

module.exports = {
    createTask: async ({ user_id, title, description, due_date, priority, status }) => {
        const created_at = updated_at = (new Date()).getTime();

        const tasks = await sql.createTask({ user_id, title, description, due_date, priority, status, created_at, updated_at })

        return tasks[0];
    },

    getTasks: async (user_id, orderBy, direction) => {
        console.dir({ user_id, orderBy, direction});
        return await sql.getTasks(user_id, orderBy, direction);
    },

    getTaskById: async(id, user_id) => {
        const task = await sql.getTaskById(id, user_id);

        return task.length > 0 ? task[0] : null;
    },

    updateTask: async(id, user_id, { title, description, due_date, priority, status }) => {
        const updated_at = (new Date()).getTime();

        await sql.updateTask(id, user_id, { title, description, due_date, priority, status, updated_at });

        return await sql.getTaskById(id, user_id)[0];
    },

    deleteTask: async(id, user_id) => {
        return await sql.deleteTask(id, user_id);
    }
}