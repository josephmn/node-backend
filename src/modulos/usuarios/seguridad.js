const auth = require("../../auth");

module.exports = function chequearAuth(){

    function middleware(req, res, next){
        // const id = req.body.id;
        // auth.chequearToken.confirmarToken(req, id)
        auth.chequearToken.confirmarToken(req)
        next();
    }

    return middleware;
}