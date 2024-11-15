const express = require('express');
const userRouter = express.Router();
const { User, Show } = require('../models/index'); 

userRouter.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

userRouter.get('/:id/shows', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: Show
        });
        if (user) {
            res.json(user.Shows);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

userRouter.put('/:id/shows/:showId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        const show = await Show.findByPk(req.params.showId);
        if (user && show) {
            await user.addShow(show);
            res.status(200).send('Show associated with user');
        } else {
            res.status(404).send('User or Show not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = userRouter;