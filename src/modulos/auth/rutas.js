const express = require('express');
const router = express.Router();

const respuestas = require('../../red/respuestas');
const controlador = require('./index');

router.get('/login', login);

async function login(req, res, next) {
    try {
        const token = await controlador.login(req.body.usuario, req.body.password);
        respuestas.success(req, res, token, 200);
    } catch (err) {
        next(err);
    }
};

module.exports = router;