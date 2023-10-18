const postgres = require('postgres');

const sql = postgres();

module.exports = {
    sql,
    version: async () => {
        const results = await sql`select version()`;

        return results;
    },
    createUser: async ({ name, email, password, profile_image, created_on }) => {
        console.dir({ name, email, password, profile_image, created_on })
        const newUser = await sql`
            insert into users
                (name, email, password, profile_image, created_on)
            values
                (${name}, ${email}, ${password}, ${profile_image}, ${created_on})
            returning id, name, email, profile_image
        `;

        return newUser;
    }
};
