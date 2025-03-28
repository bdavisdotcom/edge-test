const postgres = require('postgres');

const sql = postgres();

// postgres nodejs driver seems to convert bigint (epoch timestamp) into strings...
// there is no "int64/bigint" in javascript, hmm...
const fixTaskPostgresDriverLongIssue = (tasks) => {
    return tasks.map(task => { return { ...task, due_date: Number(task.due_date), created_at: Number(task.created_at), updated_at: Number(task.updated_at) }; });
};

const fixUserPostgresDriverLongIssue = (users) => {
    return users.map(user => { return { ...user, created_at: Number(user.created_at), updated_at: Number(user.updated_at) }; });
};

module.exports = {
    createUser: async ({ name, email, password, password_hash_salt, profile_image, created_at, updated_at }) => {
        const newUser = await sql`
            insert into users
                (name, email, password, profile_image, password_hash_salt, created_at, updated_at)
            values
                (${ name }, ${ email }, ${ password }, ${ profile_image }, ${ password_hash_salt }, ${ created_at }, ${ updated_at })
            returning id, name, email, profile_image, created_at, updated_at
        `;

        return newUser;
    },

    updateUser: async (id, { name, email, profile_image, updated_at }) => {
        const updatedUser = await sql`
            update users
            set name = ${ name }, email = ${ email }, profile_image = ${ profile_image }, updated_at = ${ updated_at }
            where id = ${ id }
        `;
    },

    getUserByEmail: async (email) => {
        const user = await sql`
            SELECT id, name, email, profile_image, password, password_hash_salt, created_at, updated_at
            FROM users
            WHERE email = ${ email }
        `;

        return fixUserPostgresDriverLongIssue(user);
    },

    getUserById: async (id) => {
        const user = await sql`
            SELECT id, name, email, profile_image, password, password_hash_salt, created_at, updated_at
            FROM users
            WHERE id = ${ id }
        `;
        return fixUserPostgresDriverLongIssue(user);
    },

    getTasks: async(userId, orderBy, direction) => {
        const order_clause = ['created_at', 'updated_at', 'due_date', 'title', 'description', 'status', 'id'].indexOf(orderBy) == -1 ? 'created_at' : orderBy;

        console.log(order_clause);
        console.log(direction);
        
        const tasks = await sql`
            SELECT id, user_id, title, description, due_date, status, created_at, updated_at
            FROM tasks
            WHERE user_id = ${ userId }
            ORDER BY ${sql(order_clause)} ${ direction === "desc" ? sql`desc` : sql`asc` }
        `;

        console.dir(tasks);
        
        return fixTaskPostgresDriverLongIssue(tasks);
    },

    getTaskById: async(id, user_id) => {
        const tasks = await sql`
            SELECT id, user_id, title, description, due_date, status, created_at, updated_at
            FROM tasks
            WHERE user_id = ${ user_id } and id = ${ id }
        `;

        return fixTaskPostgresDriverLongIssue(tasks);
    },

    updateTask: async(id, user_id, { title, description, due_date, status, updated_at }) => {
        await sql`
            UPDATE tasks set
                title = ${ title }, description = ${ description }, due_date = ${ due_date }, status = ${ status }, updated_at = ${ updated_at }
            WHERE user_id = ${ user_id } and id = ${ id }
        `;
    },

    createTask: async({ user_id, title, description, due_date, status, created_at, updated_at }) => {
        const task = await sql`
            INSERT INTO tasks
                (user_id, title, description, due_date, status, created_at, updated_at)
            values
                (${ user_id }, ${ title }, ${ description }, ${ due_date }, ${ status }, ${ created_at }, ${ updated_at })
            returning id, user_id, title, description, due_date, status, created_at, updated_at
        `;

        return task;
    },

    deleteTask: async(id, user_id) => {
        await sql`
            DELETE FROM tasks where id = ${id} and user_id = ${user_id}
        `;
    }
    
};
