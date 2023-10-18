const sql = require('../database/db.js')

module.exports = {
    registerNewUser: async (userParams) => {
        console.dir(userParams);

        const created_on = (new Date()).getTime();

        // TODO: salt and crypto hash the password before storing
        const { name, email, password, profile_image } = userParams;
        const newUser = await sql.createUser({ name, email, password, profile_image, created_on });

        return newUser;
    }
}