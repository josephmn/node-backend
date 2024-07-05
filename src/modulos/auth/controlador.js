const bycrypt = require('bcrypt');

const auth = require('../../auth');

const TABLA = 'auth';

module.exports = function (dbinyectada) {

    let db = dbinyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    async function login(usuario, password){
        const data = await db.query(TABLA, {usuario: usuario});

        return bycrypt.compare(password, data.password)
        .then(resultado => {
            if(resultado){
                // generamos un token
                return auth.asignarToken({...data}) // TODO: [...data] desestructurar el objeto data 
            } else {
                throw new Error("Información Inválida");
            }
        })
    }

    async function insertar(data){

        const authData = {
            id: data.id
        }

        if(data.usuario){
            authData.usuario = data.usuario
        }

        if(data.password){
            authData.password = await bycrypt.hash(data.password.toString(), 5);
        }

        return db.insertarAuth(TABLA, authData);
    }

    return {
        login,
        insertar
    }

}