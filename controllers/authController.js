const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
    const { email, nombre, password, anos_experiencia, especialidad } = req.body;
    const foto = req.files ? req.files.foto.name : 'default.jpg';
    const user = { email, nombre, password, anos_experiencia, especialidad, foto };
    const newUser = await createUser(user);
    res.json(newUser);
};


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = {
    register,
    login,
};
