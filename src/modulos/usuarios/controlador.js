const db = require('../../DB/mysql');

const TABLA = 'usuarios';
const auth = require('../auth');

module.exports = function (dbinyectada) {

    let db = dbinyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    function listar(){
        return db.listar(TABLA);
    }
    
    function consultar(id){
        return db.consultar(TABLA, id);
    }
    
    async function insertar(body){
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            estado: body.estado
        }

        const respuesta = await db.insertar(TABLA, usuario);
        var insertId = 0;
        if(body.id == 0){
            insertId = respuesta.insertId;
        } else {
            insertId = body.id;
        }

        const authen = {
            id: insertId,
            usuario: body.usuario,
            password: body.password
        }
        var respuesta2 = '';
        if(body.usuario || body.password){
            respuesta2 = await auth.insertar(authen);
        }

        return respuesta2;
    }
    
    async function actualizar(body){
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            estado: body.estado
        }

        const respuesta = await db.actualizar(TABLA, usuario);
        var insertId = body.id;

        const authen = {
            id: insertId,
            usuario: body.usuario,
            password: body.password
        }
        var respuesta2 = '';
        if(body.usuario || body.password){
            respuesta2 = await auth.insertar(authen);
        }

        return respuesta2;
    }

    function eliminar(body){
        return db.eliminar(TABLA, body);
    }

    return {
        listar,
        consultar,
        insertar,
        actualizar,
        eliminar,
    }

}