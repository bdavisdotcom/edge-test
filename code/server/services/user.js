const uuid = require('uuid');
const HMACSHA256 = require('crypto-js/hmac-sha256');
const sql = require('../database/db.js')

// Utility Functions
const createPasswordHashString = (password, salt) => {
    return `${ password }-${ salt }`;
}

const hashIt = (password, salt) => {
    const { PASSWORD_HASH_SECRET } = process.env;

    return HMACSHA256(createPasswordHashString(password, salt), PASSWORD_HASH_SECRET).toString();
}

const isSuppliedPasswordValid = (password, salt, encryptedPassword) => {
    const encryptedUserSuppliedPassword = hashIt(password, salt);

    return encryptedUserSuppliedPassword === encryptedPassword;
}

const encryptPassword = (password) => {
    const salt = uuid.v4();
    const encryptedPassword = hashIt(password, salt);

    return { salt, encryptedPassword };
};

const getPublicUserFromData = (user) => {
    const { password, password_hash_salt, ...publicUser } = user;

    return publicUser;
}
// End Utility Functions

module.exports = {
    getUserById: async (id) => {
        const users = await sql.getUserById(id);
        if (users.length === 0) {
            return null;
        } else {
            return getPublicUserFromData(users[0]);
        }
    },

    getUserByEmail: async ({ email }) => {
        const users = await sql.getUserByEmail(email);
        if (users.length === 0) {
            return null;
        } else {
            return getPublicUserFromData(users[0]);
        }
    },

    registerNewUser: async ({ name, email, password, profile_image }) => {
        // check if user already exists
        const users = await sql.getUserByEmail(email);
        if (users.length !== 0) {
            return null;
        }

        const created_at = (new Date()).getTime();
        
        // encrypt password for storage
        const { salt, encryptedPassword } = encryptPassword(password);

        const newUser = await sql.createUser({
            name,
            email,
            password: encryptedPassword,
            password_hash_salt: salt,
            profile_image,
            created_at,
            updated_at: created_at
        });

        return getPublicUserFromData(newUser[0]);
    },

    updateUser: async(id, updatedUser) => {
        const users = await sql.getUserByEmail(id);
        if (users.length === 0) {
            return null;
        }
        const user = getPublicUserFromData(users[0]);

        await sql.updateUser(user.id, { ...user, ...updatedUser, updated_at: (new Date()).getTime() });
    },

    login: async({ email, password }) => {
        const user = await sql.getUserByEmail(email);
        if (user.length === 0) {
            return null;
        }

        const { name, password_hash_salt, password: encryptedPassword } = user[0];

        return isSuppliedPasswordValid(password, password_hash_salt, encryptedPassword) ? getPublicUserFromData(user[0]) : null;
    }
}