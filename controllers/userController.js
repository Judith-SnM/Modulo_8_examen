const jwt = require('jsonwebtoken');
const pool = require('../config/database');
require('dotenv').config();

const getUserData = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const query = 'SELECT * FROM skaters WHERE id = $1';
    const result = await pool.query(query, [decoded.id]);
    res.json(result.rows[0]);
};

const updateUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { nombre, anos_experiencia, especialidad } = req.body;
    const query = 'UPDATE skaters SET nombre = $1, anos_experiencia = $2, especialidad = $3 WHERE id = $4 RETURNING *';
    const values = [nombre, anos_experiencia, especialidad, decoded.id];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
};

module.exports = {
    getUserData,
    updateUser,
};
