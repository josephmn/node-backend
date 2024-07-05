const db = require('../../DB/mysql');

const TABLA = 'clientes';

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
    
    function insertar(body){
        return db.insertar(TABLA, body);
    }
    
    function actualizar(body){
        return db.actualizar(TABLA, body);
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