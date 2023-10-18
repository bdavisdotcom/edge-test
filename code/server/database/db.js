const postgres = require('postgres');

const sql = postgres();

module.exports = {
    sql,
    version: async () => {
        const results = await sql`select version()`;

        return results;
    }
};
