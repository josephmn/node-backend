const express = require('express');
const router = express.Router();

const respuestas = require('../../red/respuestas');
const controlador = require('./index');

router.get('/', listar); // obtener lista de clientes
router.get('/:id', consultar); // obtener datos por id cliente
router.post('/', insertar); // crear un nuevo cliente
router.put('/', actualizar); // actualizar un cliente
router.delete('/', eliminar); // eliminar un cliente

async function listar(req, res) {
    try {
        const items = await controlador.listar();
        respuestas.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

async function consultar(req, res, next) {
    try {
        const items = await controlador.consultar(req.params.id);
        respuestas.success(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

// async function agregar(req, res, next) {
//     try {
//         const items = await controlador.agregar(req.body);
//         if (req.body.id == 0){
//             mensaje = "Cliente guardado con exito";
//         } else {
//             mensaje = "Cliente actualizado con exito";
//         }
//         respuestas.success(req, res, mensaje, 201);
//     } catch (err) {
//         next(err);
//     }
// };

async function insertar(req, res, next) {
    try {
        const items = await controlador.insertar(req.body);
        mensaje = "Cliente guardado con exito";
        respuestas.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
};

async function actualizar(req, res, next) {
    try {
        if (isObject(req.body) && req.body.hasOwnProperty('id')) {
            // El objeto req.body existe y contiene el campo 'id'
            const items = await controlador.actualizar(req.body);
            mensaje = "Cliente actualizado con exito";
            respuestas.success(req, res, mensaje, 201);
        } else {
            mensaje = "Objeto body no contiene el campo 'id'";
            respuestas.error(req, res, mensaje, 400);
        }
    } catch (err) {
        next(err);
    }
};

async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuestas.success(req, res, 'Item eliminado correctamente', 200);
    } catch (err) {
        next(err);
    }
};

// funciones adicionales
function isObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
}

module.exports = router;