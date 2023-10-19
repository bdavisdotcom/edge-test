const postgres = require('postgres');

const sql = postgres();

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

        return user;
    },

    getUserById: async (id) => {
        const user = await sql`
            SELECT id, name, email, profile_image, password, password_hash_salt, created_at, updated_at
            FROM users
            WHERE id = ${ id }
        `;
        return user;
    }
};
