const express = require('express');
const showRouter = express.Router();
const{ User, Show } = require('../models/index'); 
const { body, validationResult } = require('express-validator');


showRouter.get('/', async (req, res) => {
    try {
        const shows = await Show.findAll();
        res.json(shows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

showRouter.get('/:id', async (req, res) => {
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

showRouter.get('/:id/users', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id, {
            include: User
        });
        if (show) {
            res.json(show.users);
        } else {
            res.status(404).send('Show not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// showRouter.post(
//     '/',
//     body('title').isLength({ max: 25 }).withMessage('Title must be a maximum of 25 characters'),
//     body('username').isEmail().withMessage('Username must be a valid email address'),
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try {
//             const newShow = await Show.create(req.body);
//             res.status(201).json(newShow);
//         } catch (error) {
//             res.status(500).send(error.message);
//         }
//     }
// );
showRouter.put('/:id/available', async (req, res) => {
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

showRouter.delete('/:id', async (req, res) => {
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

showRouter.get('/genre/:genre', async (req, res) => {
    try {
        const genre = req.params.genre;
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

module.exports = showRouter;