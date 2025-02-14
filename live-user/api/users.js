const express = require('express');
const router = express.Router();
const { getUsers } = require('../database/db');

router.get('/users', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const users = await getUsers(page, limit);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUserById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;