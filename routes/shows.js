const express = require('express');
const router = express.Router();
const { User, Show } = require('../models'); 


router.get('/shows', async (req, res) => {
    try {
        const shows = await Show.findAll();
        res.json(shows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/shows/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (show) {
            res.json(show);
        } else {
            res.status(404).send('Show not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/shows/:id/users', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id, {
            include: User
        });
        if (show) {
            res.json(show.Users);
        } else {
            res.status(404).send('Show not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/shows/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (show) {
            show.available = req.body.available;
            await show.save();
            res.status(200).send('Show availability updated');
        } else {
            res.status(404).send('Show not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/shows/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id);
        if (show) {
            await show.destroy();
            res.status(200).send('Show deleted');
        } else {
            res.status(404).send('Show not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/shows', async (req, res) => {
    try {
        const genre = req.query.genre;
        let shows;
        if (genre) {
            shows = await Show.findAll({ where: { genre } });
        } else {
            shows = await Show.findAll();
        }
        res.json(shows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;