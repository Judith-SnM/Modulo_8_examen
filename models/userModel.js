const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const createUser = async (user) => {
    const { email, nombre, password, anos_experiencia, especialidad, foto } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [email, nombre, hashedPassword, anos_experiencia, especialidad, foto, false];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM skaters WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
};

module.exports = {
    createUser,
    getUserByEmail,
};
